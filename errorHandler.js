import { postComments, fetchGetComments } from "./api.js";
import { renderComments } from "./renderComments.js";

export function catchErrorPost(nameInputElement, textInputElement, comments) {
    postComments(nameInputElement.value, textInputElement.value)
        .then((response) => {
            if (response.ok) {
                return fetchGetComments(); // Вызываем функцию для получения комментариев сразу после успешного добавления
            } else if (response.status === 400) {
                throw new Error('Ошибка: Короткий комментарий');
            } else if (response.status === 500) {
                throw new Error('Ошибка сервера: 500');
            } else {
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
            renderComments(comments);
            preloader.classList.add('preloader-hidden'); // Скрываем прелоадер после загрузки комментариев
        })
        .catch((error) => {
            alert('Произошла ошибка: ' + error.message);
            console.error(error);
            preloader.classList.add('preloader-hidden'); // Скрываем прелоадер при ошибке
        });
}


export function catchErrorGet(comments) {
    fetchGetComments()
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 500) {
                throw new Error('Ошибка сервера: 500');
            } else {
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
            renderComments(comments);
            preloader.classList.add('preloader-hidden');
        })
        .catch((error) => {
            alert('Произошла ошибка: ' + error.message);
            console.error(error);
            preloader.classList.add('preloader-hidden'); 
        });
}
