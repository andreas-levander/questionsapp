import { assertEquals, assertExists, assertObjectMatch } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as quizService from "../../services/quizService.js";

Deno.test({
    name: "question should have options (assuming you have added atleast one question to db)",
    async fn() {
        assertExists(await quizService.getQuestionOptions(await quizService.getRandomQuizId()));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "getCorrectQuestionOption returns the correct question option (assuming you have added atleast one question to db)",
    async fn() {
        assertObjectMatch((await quizService.getCorrectQuestionOption(await quizService.getRandomQuizId()))[0], {is_correct: true});
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
