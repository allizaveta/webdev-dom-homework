import { postComments, fetchGetComments,login,token } from "./api.js";
import { renderComments,nonAutorizeRender } from "./renderComments.js";

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
            renderComments(comments);
        })
        .catch((error) => {
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
                    renderComments(comments, token);
                } else {
                    nonAutorizeRender(comments, token);
                }
            })
        .catch((error) => {
            alert('Произошла ошибка: ' + error.message);
            console.error(error);
        });       
}