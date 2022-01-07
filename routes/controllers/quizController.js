import * as quizService from "../../services/quizService.js";
import * as statService from "../../services/statService.js";

const showRandomQuiz = async ({ response }) => {
    const random = await quizService.getRandomQuizId();
    response.redirect(`/quiz/${random}`);
};

const showQuiz = async ({ render, params, user }) => {
    render("quiz.eta", {
        question: (await quizService.getQuestion(params.id))[0], 
        options: (await quizService.getQuestionOptions(params.id)),
        user: user.id,
    });
};

const quizAnswer = async ({ params, response, user }) => {
    const question = params.id;
    const optionid = params.optionid;
    const option = await quizService.getQuestionOption(question, optionid);
    const iscorrect = option[0].is_correct;
    await statService.addAnswer(user.id,question,optionid,iscorrect);
    if(iscorrect) {
        response.redirect(`/quiz/${question}/correct`)
    } else {
        response.redirect(`/quiz/${question}/incorrect`)
    }
};

const correctAnswer = async ({ render, user }) => {
    render("correctanswer.eta", {user: user.id});
};

const incorrectAnswer = async ({ render, params, user }) => {
    render("incorrectanswer.eta",{
        option: (await quizService.getCorrectQuestionOption(params.id))[0],
        user: user.id,
    });
};

export {
    showRandomQuiz,
    showQuiz,
    quizAnswer,
    correctAnswer,
    incorrectAnswer
}