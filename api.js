let host = "https://wedev-api.sky.pro/api/v2/:elizaveta-aleksandrova/comments";
let userUrl ="https://wedev-api.sky.pro/api/user/login";

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'

export function fetchGetComments() {
    return fetch("https://wedev-api.sky.pro/api/v2/:elizaveta-aleksandrova/comments", {
        method: "GET",
        headers:{
            Authorization: token,
        },
    })
};

export function postComments(name, text) {
    return fetch(host, {
        method: "POST",
        headers:{
            Authorization: token,
        },
        body: JSON.stringify({
            name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        }),
    });
}

export function login ({login,password}) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json();
    });
}