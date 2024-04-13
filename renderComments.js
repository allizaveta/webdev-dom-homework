import {formatDate} from "./formatDate.js"
import {initLikeButtonListeners} from "./likeButton.js"
import { catchErrorGet, catchErrorPost } from "./errorHandler.js";
import { renderLogin } from "./loginPage.js";
export function renderComments(comments) {
    const appElement = document.getElementById("app")
    const listElement = document.getElementById("list");

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

    const appHtml = ` <p id="preloader">Пожалуйста подождите, загружаю комментарии</p>
    <div class="container">
      <ul class="comments" id="list">
        ${commentsHtml}
      </ul>
      <div class="add-form" id="addForm">
        <input
          type="text"
          class="add-form-name"
          placeholder=${name}
          id="name-input"
          readonly
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш комментарий"
          rows="4"
          id="text-input"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="send-button">Написать</button>
        </div>
      </div>
      <p id="autorization-button">Чтобы оставлять комментарии - авторизуйтесь</p>
      <p id="loader" class="hidden">Коментарий добавляется...</p>
    </div>`;

    appElement.innerHTML = appHtml;
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.getElementById("text-input");
    const buttonElement = document.getElementById("send-button");
    const preloader = document.getElementById("preloader");

        buttonElement.addEventListener('click', () => {
            nameInputElement.classList.remove('error');
            textInputElement.classList.remove('error');
    
            if (nameInputElement.value.trim() === '' || textInputElement.value.trim() === '') {
                nameInputElement.classList.add('error');
                textInputElement.classList.add('error');
                return;
            }
            
            catchErrorPost(nameInputElement, textInputElement, comments);
            catchErrorGet(comments);
        });

    initLikeButtonListeners(comments);

    const autorizeButton = document.getElementById("autorization-button");
      autorizeButton.addEventListener("click", () => {
      renderLogin();
    });
}
