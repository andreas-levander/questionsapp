import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";
import * as optionService from "../../services/optionService.js";
import * as quizService from "../../services/quizService.js";

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const showSpecificQuestion = async ({ render, params, user, response }) => {
    const question = await questionService.showQuestion(params.id);

    if(user.id && question[0].user_id === user.id) {
      render("specific_question.eta", { 
        question: question[0], option_text: "", 
        options: await optionService.listOptions(params.id),
        user: user.id, 
      });
    } else {
      response.status = 401;
    }
};

const getOptionData = async (request, params) => {
    const body = request.body({ type: "form" });
    const formparams = await body.value;
    return {
      option_text: formparams.get("option_text"),
      is_correct: (formparams.get("is_correct") != null),
      question_id: params.id,
    };
};


const addOption = async ({ request, response, params, render, user }) => {
    const question = await questionService.showQuestion(params.id);
    if(user.id && question[0].user_id === user.id) {

    const optionData = await getOptionData(request, params);
  
    const [passes, errors] = await validasaur.validate(
      optionData,
      optionValidationRules,
    );

    if (!passes) {
      console.log(errors);
      optionData.validationErrors = errors;
      optionData.question = (await questionService.showQuestion(params.id))[0];
      optionData.options = await optionService.listOptions(params.id);
      optionData.user = user.id;
      render("specific_question.eta", optionData);
    } else {
      if((await quizService.getCorrectQuestionOption(optionData.question_id)).length === 0 || optionData.is_correct === false) {
        await optionService.addOptiontoDB(
            optionData.question_id,
            optionData.option_text,
            optionData.is_correct,
            );
      }
      response.redirect(`/questions/${optionData.question_id}`);
      
    }
  } else {
    response.status = 401;
  }
};

const removeOption = async ({ response, params }) => {
    await optionService.deleteOption(params.optionid);

    response.redirect(`/questions/${params.id}`);
};

export {
    showSpecificQuestion,
    addOption,
    removeOption,
}