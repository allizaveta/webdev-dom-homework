import { renderLogin } from "./loginPage.js";
import {formatDate, initLikeButtonListeners, initAnswerListeners} from "./utilits.js"
import { catchErrorGet, catchErrorPost } from "./errorHandler.js";

export function nonAutorizeRender(comments) {
    const appElement = document.getElementById("app")

    const commentsHtml = comments.map((comment, index) => {
        const likeButtonClass = comment.isLiked ? 'like-button active-like' : 'like-button';
        const formattedDate = formatDate(comment.date);
        return `<li class="comment">
            <div class="comment-header">
                <div>${comment.name}</div>
                <div>${formattedDate}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${comment.text}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button data-index="${index}" class="${likeButtonClass}"></button>
                </div>
            </div>
        </li>`;
    }).join("");

    const appHtml = `
    <div class="container">
      <ul class="comments" id="list">
        ${commentsHtml}
      </ul>
      <p id="autorization-button">Чтобы оставлять комментарии - авторизуйтесь</p>
      <p id="loader" class="hidden">Коментарий добавляется...</p>
    </div>`;
    appElement.innerHTML = appHtml;
    const nameInputElement = document.querySelector(".add-form-name");
    const textInputElement = document.querySelector(".add-form-text");    
    const buttonElement = document.getElementById("send-button");

    initLikeButtonListeners(comments);
    initAnswerListeners(comments, textInputElement);

    const autorizeButton = document.getElementById("autorization-button");
      autorizeButton.addEventListener("click", () => {
      renderLogin(comments);
    });
}
