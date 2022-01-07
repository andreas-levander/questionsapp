import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    question_text: [validasaur.required, validasaur.minLength(1)],
  };

const showQuestionsForm = async ({ render, user }) => {
    render("questions.eta", { questions: await questionService.listQuestions(user.id), title: "", question_text: "", user: user.id });
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
      title: params.get("title"),
      question_text: params.get("question_text"),
    };
  };
  
const addQuestion = async ({ request, response, render, user }) => {
    const questionData = await getQuestionData(request);
  
    const [passes, errors] = await validasaur.validate(
      questionData,
      questionValidationRules,
    );
        

    if (!passes) {
      console.log(errors);
      questionData.validationErrors = errors;
      questionData.questions = await questionService.listQuestions(user.id);
      questionData.user = user.id;
      render("questions.eta", questionData);
    } else {
      await questionService.addQuestiontoDB(
          user.id,
          questionData.title,
          questionData.question_text,
          );
  
      response.redirect("/questions");
    }
};

const removeQuestion = async ({ response, params }) => {
    await questionService.deleteQuestion(params.id);

    response.redirect(`/questions`);
  
};


export {
    showQuestionsForm,
    addQuestion,
    removeQuestion, 
};