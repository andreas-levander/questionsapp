import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as specific_questionController from "./controllers/specific_questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statController from "./controllers/statsController.js";
import * as questionApi from "./apis/questionApi.js";


const router = new Router();

router.get("/", mainController.showMain);

router.get("/questions", questionController.showQuestionsForm);
router.post("/questions", questionController.addQuestion);

router.get("/questions/:id", specific_questionController.showSpecificQuestion);
router.post("/questions/:id/delete", questionController.removeQuestion);

router.post("/questions/:id/options", specific_questionController.addOption);
router.post("/questions/:id/options/:optionid/delete", specific_questionController.removeOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.showRandomQuiz);
router.get("/quiz/:id", quizController.showQuiz);
router.get("/quiz/:id/correct", quizController.correctAnswer);
router.get("/quiz/:id/incorrect", quizController.incorrectAnswer);
router.post("/quiz/:id/options/:optionid", quizController.quizAnswer);

router.get("/statistics", statController.showstats);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.correctCheck);




export { router };
