let host = "https://wedev-api.sky.pro/api/v2/:elizaveta-aleksandrova/comments";
let userUrl ="https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) =>{
    token = newToken;
};

export function fetchGetComments() {
    return fetch("https://wedev-api.sky.pro/api/v2/:elizaveta-aleksandrova/comments", {
        method: "GET",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    })
};

export function postComments(name, text) {
    return fetch(host, {
        method: "POST",
        headers:{
            Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        }),
    });
}

export function login ({login,password}) {
    return fetch(userUrl, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json();
    });
}