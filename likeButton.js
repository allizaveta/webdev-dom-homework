import { renderComments } from './renderComments.js';

export function initLikeButtonListeners(comments) {
    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', () => {
            const index = likeButtonElement.dataset.index;
            comments[index].isLiked = !comments[index].isLiked;
            if (comments[index].isLiked) {
                comments[index].likes++;
            } else {
                comments[index].likes--;
            }
            renderComments(comments);
        });
    }
};