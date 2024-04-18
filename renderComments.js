import {formatDate, initLikeButtonListeners, initAnswerListeners} from "./utilits.js"
import { catchErrorGet, catchErrorPost } from "./errorHandler.js";
import { renderLogin } from "./loginPage.js";

function escapeHTML(html) {
  return html.replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");
}


export function renderComments(comments, loggedInUserName, token) {
  const appElement = document.getElementById("app")
  const listElement = document.getElementById("list");

  const commentsHtml = comments.map((comment, index) => {
      const likeButtonClass = comment.isLiked ? 'like-button active-like' : 'like-button';
      const formattedDate = formatDate(comment.date);
      const escapedName = escapeHTML(comment.name);
      const escapedText = escapeHTML(comment.text);
      return `<li class="comment">
          <div class="comment-header">
              <div>${escapedName}</div>
              <div>${formattedDate}</div>
          </div>
          <div class="comment-body">
              <div class="comment-text">
                  ${escapedText}
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
    <div class="add-form" id="addForm">
      <input
        type="text"
        class="add-form-name"
        value="${loggedInUserName}"
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
  </div>`;
  appElement.innerHTML = appHtml;
  const nameInputElement = document.querySelector(".add-form-name");
  const textInputElement = document.querySelector(".add-form-text");    
  const buttonElement = document.getElementById("send-button");

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

  initLikeButtonListeners(comments, token);
  initAnswerListeners(comments, textInputElement);
}


export function nonAutorizeRender(comments) {
  const appElement = document.getElementById("app")

  const commentsHtml = comments.map((comment, index) => {
      const likeButtonClass = comment.isLiked ? 'like-button active-like' : 'like-button';
      const formattedDate = formatDate(comment.date);
      const escapedName = escapeHTML(comment.name);
      const escapedText = escapeHTML(comment.text);
      return `<li class="comment">
          <div class="comment-header">
              <div>${escapedName}</div>
              <div>${formattedDate}</div>
          </div>
          <div class="comment-body">
              <div class="comment-text">
                  ${escapedText}
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
    <p id="autorization-button">Чтобы оставлять комментарии - авторизуйтесь</p>ы
  </div>`;
  appElement.innerHTML = appHtml;
  const nameInputElement = document.querySelector(".add-form-name");
  const textInputElement = document.querySelector(".add-form-text");    
  const buttonElement = document.getElementById("send-button");

  initAnswerListeners(comments, textInputElement);

  const autorizeButton = document.getElementById("autorization-button");
    autorizeButton.addEventListener("click", () => {
    renderLogin(comments);
  });

  const likeButtonElements = document.querySelectorAll(".like-button");

  likeButtonElements.forEach((likeButtonElement, index) => {
      likeButtonElement.addEventListener('click', () => {
        alert('авторизуйтесь')
      });
  });

}