import { executeQuery } from "../database/database.js";

const addOptiontoDB = async (id, option_text, is_correct) => {
    await executeQuery("INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3)", id, option_text, is_correct);
};

const listOptions = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $1", question_id);

    return res.rows;
};

const deleteOption = async (option_id) => {
    await executeQuery("DELETE FROM question_answers WHERE question_answer_option_id = $1", option_id);
    await executeQuery("DELETE FROM question_answer_options WHERE id = $1", option_id);
    

};

export {
    addOptiontoDB,
    listOptions,
    deleteOption,
}