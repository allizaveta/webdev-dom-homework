import { catchErrorPost, catchErrorGet } from "./errorHandler.js";
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("send-button");
let comments = [];

getComments();

function getComments() {
    catchErrorGet();
}

buttonElement.addEventListener('click', () => {
    nameInputElement.classList.remove('error');
    textInputElement.classList.remove('error');

    if (nameInputElement.value.trim() === '' || textInputElement.value.trim() === '') {
        nameInputElement.classList.add('error');
        textInputElement.classList.add('error');
        return;
    }

    catchErrorPost(nameInputElement, textInputElement, comments);
});

