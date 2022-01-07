import * as questionService from "../../services/questionService.js";


const getRandomQuestion = async ({response}) => {
    const question = await questionService.getRandomQuestion();
    let data = {};

    if (question) {
        let optionsArray = [];
        const options = await questionService.getQuestionOptions(question.id);
        options.forEach(option => {
            const optobj = {
                optionId: option.id,
                optionText: option.option_text,
            }
            optionsArray.push(optobj);
        });


        data = {
            questionId: question.id,
            questionTitle: question.title,
            questionText: question.question_text,
            answerOptions: optionsArray,
        }
    }
    response.body = data; 
};

const correctCheck = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    //console.log(document);
    if (document.questionId && document.optionId) {
        const result = await questionService.correctOptionCheck(document.questionId, document.optionId);
        if (result) {
            response.body = {correct: result.is_correct};
          } else {
            response.status = 404;
          }
        
    } else {
        response.status = 404;
    }
    
  };

export {
    getRandomQuestion,
    correctCheck
}