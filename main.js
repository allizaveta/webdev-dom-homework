import { catchErrorPost, catchErrorGet } from "./errorHandler.js";

const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("send-button");
const loader = document.getElementById("loader"); // Добавляем получение элемента прелоадера

let comments = [];

catchErrorGet(comments); 

buttonElement.addEventListener('click', () => {
    nameInputElement.classList.remove('error');
    textInputElement.classList.remove('error');

    if (nameInputElement.value.trim() === '' || textInputElement.value.trim() === '') {
        nameInputElement.classList.add('error');
        textInputElement.classList.add('error');
        return;
    }

    loader.classList.remove('hidden');
    catchErrorPost(nameInputElement, textInputElement, comments);
    
});
