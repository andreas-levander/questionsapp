import * as statService from "../../services/statService.js";

const showstats = async ({user, render}) => {
    const data = {
        questions_answered: await statService.getNumberofQuestionsAnswered(user.id),
        questions_correct: await statService.getNumberofCorrectAnswers(user.id),
        answers: await statService.getNumberofAnswersGiven(user.id),
        toplist: await statService.getTopList(),
        user: user.id,
    }
    render("statistics.eta", data);
};

export {
    showstats
}