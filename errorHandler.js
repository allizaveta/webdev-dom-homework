import { postComments, fetchGetComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { login } from "./api.js";
import { nonAutorizeRender } from "./nonAutrizeRender.js";

export function catchErrorPost(nameInputElement, textInputElement, comments) {
    postComments(nameInputElement.value, textInputElement.value)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 400) {
                throw new Error('Ошибка: Короткий комментарий');
            } else if (response.status === 500) {
                throw new Error('Ошибка сервера: 500');
            } else if(response.status === 401) {
                throw new Error('Отсутствует авторизация')
            }
            else {
                throw new Error('Ошибка: ' + response.status);
            }
        })
        .then((responseData) => {
            return fetchGetComments();
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка: ' + response.status);
            }
        })
        .then(responseData => {
            comments = responseData.comments.map(comment => ({
                name: comment.author.name,
                date: new Date(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLiked,
            }));
            return responseData;
        })
        .then((responseData) => {
            textInputElement.value = '';
            nameInputElement.value = '';
            addForm.classList.add('hidden');
            loader.classList.add('hidden');
            renderComments(comments);
            
        })
        .catch((error) => {
            addForm.classList.remove('hidden');
            loader.classList.add('hidden');
            alert('Произошла ошибка: ' + error.message);
            console.error(error);
        });
}

export function catchErrorGet(comments) {
    fetchGetComments()
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 500) {
                throw new Error('Ошибка сервера: 500');
            } else if(response.status === 401) {
                throw new Error('Отсутствует авторизация')}
            else {
                throw new Error('Ошибка: ' + response.status);
            }
        })
        .then((responseData) => {
            comments = responseData.comments.map(comment => ({
                name: comment.author.name,
                date: new Date(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLiked,
            }));
                const token = localStorage.getItem("token");
                if (token) {
                    renderComments(comments);
                } else {
                    nonAutorizeRender(comments);
                }
            })
        .catch((error) => {
            alert('Произошла ошибка: ' + error.message);
            console.error(error);
        });       
}

export function catchErrorLogin() {
    login().then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 400) {
            alert('Неправильный логин или пароль');
            throw new Error('Неверные данные');
        }
    }
)};