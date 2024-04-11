import { catchErrorPost, catchErrorGet } from "./errorHandler.js";

const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("send-button");
const preloader = document.getElementById("preloader");
export const comments = [];

catchErrorGet(comments);

buttonElement.addEventListener('click', () => {
    nameInputElement.classList.remove('error');
    textInputElement.classList.remove('error');

    if (nameInputElement.value.trim() === '' || textInputElement.value.trim() === '') {
        nameInputElement.classList.add('error');
        textInputElement.classList.add('error');
        return;
    }

    preloader.classList.remove('preloader-hidden');
    catchErrorPost(nameInputElement, textInputElement, comments);
    catchErrorGet(comments);
});