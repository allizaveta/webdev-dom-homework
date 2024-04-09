import { renderComments } from './renderComments.js';

export function initLikeButtonListeners(comments) {
    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', () => {
            const index = parseInt(likeButtonElement.dataset.index);
            const currentComment = comments[index];
            currentComment.isLiked = !currentComment.isLiked;
            
            if (currentComment.isLiked) {
                currentComment.likes++;
                likeButtonElement.classList.add('active-like');
            } else {
                currentComment.likes--;
                likeButtonElement.classList.remove('active-like');
            }

            renderComments(comments);
        });
    }
};

