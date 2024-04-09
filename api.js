import {catchErrorGet} from "./errorHandler.js";

export function fetchGetComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/:elizaveta-aleksandrova/comments', {
        method: "GET",
    })
    .then(catchErrorGet());
};

export function postComments(name, text) {
    return fetch('https://wedev-api.sky.pro/api/v1/:elizaveta-aleksandrova/comments', {
        method: "POST",
        body: JSON.stringify({
            name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        }),
    });
}

