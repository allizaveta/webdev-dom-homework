import { catchErrorGet } from "./errorHandler.js";
import { initAnswerListeners } from "./answer.js";

const comments = [];

catchErrorGet(comments);
// renderLogin();