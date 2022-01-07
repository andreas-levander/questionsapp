import { assertObjectMatch, assertExists } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as questionService from "../../services/questionService.js";
import * as quizService from "../../services/quizService.js";




Deno.test({
    name: "getRandomQuestion should exist if u have added question to the db",
    async fn() {
        assertExists(await questionService.getRandomQuestion());
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "getCorrectQuestionOption returns the correct question option (assuming you have added atleast one question to db)",
    async fn() {
        const id = await quizService.getRandomQuizId();
        assertObjectMatch((await questionService.showQuestion(id))[0], {id: id});
    },
    sanitizeResources: false,
    sanitizeOps: false,
});