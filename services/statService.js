import { executeQuery } from "../database/database.js";

const addAnswer = async (user_id, question_id,option_id, is_correct) => {
    await executeQuery("INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1,$2,$3,$4);", user_id, question_id, option_id, is_correct);
};

const getNumberofQuestionsAnswered = async (user_id) => {
    const res = await executeQuery("SELECT count(id) FROM question_answers WHERE user_id=$1;", user_id);
    return res.rows[0].count;
};
const getNumberofCorrectAnswers = async (user_id) => {
    const res = await executeQuery("SELECT count(id) FROM question_answers WHERE user_id=$1 AND correct=True;", user_id);
    return res.rows[0].count;
};

const getNumberofAnswersGiven = async (user_id) => {
    const res = await executeQuery("SELECT count(question_answers.id) FROM question_answers JOIN questions ON questions.id=question_answers.question_id WHERE questions.user_id=$1;", user_id);
    return res.rows[0].count;
};

const getTopList = async () => {
    const res = await executeQuery("SELECT count(question_answers.id),email FROM question_answers JOIN users ON question_answers.user_id=users.id GROUP BY email ORDER BY count(question_answers.id) desc LIMIT 5;");
    return res.rows;
};

export {
    addAnswer,
    getNumberofQuestionsAnswered,
    getNumberofCorrectAnswers,
    getTopList,
    getNumberofAnswersGiven
}