import { catchErrorPost, catchErrorGet } from "./errorHandler.js";

export function send(buttonElement, textInputElement, nameInputElement, comments, preloader) {
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
}
