//функционал лайков
export function initLikeButtonListeners(comments) {
    const likeButtonElements = document.querySelectorAll(".like-button");

    likeButtonElements.forEach((likeButtonElement, index) => {
        likeButtonElement.addEventListener('click', () => {
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
export function formatDate(date){
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = ('' + date.getFullYear()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes} ${day}.${month}.${year}`;
};