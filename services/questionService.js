import { executeQuery } from "../database/database.js";

const addQuestiontoDB = async (user_id, title, text) => {
    await executeQuery("INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3)", user_id, title, text);
};

const listQuestions = async (user_id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE user_id = $1", user_id);

    return res.rows;
};

const showQuestion = async (id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id = $1", id);

    return res.rows;
};

const deleteQuestion = async (question_id) => {
    await executeQuery("DELETE FROM questions WHERE id = $1", question_id);

};

const getRandomQuestion = async () => {
    const res = await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;");
    return res.rows[0];
    
};

const getQuestionOptions = async (question_id) => {
    const res = await executeQuery("SELECT id,option_text FROM question_answer_options WHERE question_id=$1;", question_id);

    return res.rows;
};

const correctOptionCheck = async (question_id,option_id) => {
    const res = await executeQuery("SELECT is_correct FROM question_answer_options WHERE question_id=$1 AND id=$2;", question_id, option_id);

    return res.rows[0];
};


export {
    addQuestiontoDB, 
    listQuestions, 
    showQuestion,
    deleteQuestion,
    getRandomQuestion,
    getQuestionOptions,
    correctOptionCheck 
};