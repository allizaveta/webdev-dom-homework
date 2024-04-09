export function renderComments(comments) {
    const listElement = document.getElementById("list");

    const commentsHtml = comments.map((comment, index) => {
        const likeButtonClass = comment.isLiked ? 'like-button active-like' : 'like-button';
        const formattedDate = formatDate(comment.date);
        return `<li class="comment">
            <div class="comment-header">
                <div>${comment.author.name}</div>
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

    listElement.innerHTML = commentsHtml;
}
