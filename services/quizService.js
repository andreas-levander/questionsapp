import { executeQuery } from "../database/database.js";

const getRandomQuizId = async () => {
    const randomid = (await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;")).rows[0].id;
    return randomid;
    
};

const getQuestion = async (id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id=$1;", id);

    return res.rows;
};

const getQuestionOptions = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$1;", question_id);

    return res.rows;
};

const getQuestionOption = async (question_id, option_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$1 AND id=$2 ;", question_id, option_id);

    return res.rows;
};

const getCorrectQuestionOption = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$1 AND is_correct=True", question_id);

    return res.rows;
};

export {
    getRandomQuizId,
    getQuestion,
    getQuestionOptions,
    getQuestionOption,
    getCorrectQuestionOption
}