import { token } from "./api.js";
//функционал лайков
export function initLikeButtonListeners(comments) {
    const likeButtonElements = document.querySelectorAll(".like-button");

    likeButtonElements.forEach((likeButtonElement, index) => {
        likeButtonElement.addEventListener('click', () => {
            const token = localStorage.getItem("token");
            comments[index].isLiked = !comments[index].isLiked;
            if (comments[index].isLiked) {
                comments[index].likes++;
                likeButtonElement.classList.add('active-like');
            } else {
                comments[index].likes--;
                likeButtonElement.classList.remove('active-like');
            }
            const likesCounterElement = likeButtonElement.parentNode.querySelector(".likes-counter");
            likesCounterElement.textContent = comments[index].likes;
        });
    });
}


//Цитирование
export const initAnswerListeners = (comments, textInputElement) => {
    const headElements = document.querySelectorAll(".comment-header");
    headElements.forEach((headElement, index) => {
        headElement.addEventListener('click', () => {
            const commentText = comments[index].text;
            const commentAuthor = comments[index].name;
            textInputElement.value = `>${commentText}\n${commentAuthor}`;
        });
    });
};
//форматирование даты
import { format } from "date-fns";
export function formatDate(dateString) {
    if (!dateString) {
        return "Invalid date";
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    return format(date, 'dd/MM/yyyy HH:mm');
}