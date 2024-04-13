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
