import { postComments, fetchGetComments } from "./api.js";
import { renderComments } from "./renderComments.js";

export function catchErrorPost(nameInputElement, textInputElement, comments) {
    postComments(nameInputElement.value, textInputElement.value)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 400) {
                throw new Error('Ошибка: Короткий комментарий');
            } else if (response.status === 500) {
                throw new Error('Ошибка сервера: 500');
            } else {
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
            // Очистка инпутов
            textInputElement.value = '';
            nameInputElement.value = '';
            renderComments(comments);

            // Убираем лоадер
            addForm.classList.remove('hidden');
            loader.classList.add('hidden');
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