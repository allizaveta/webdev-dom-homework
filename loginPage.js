import { login, token, setToken } from "./api.js";

const buttonElement = document.getElementById("login-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("login-input");



export const renderLogin = () =>{
    const appElement = document.getElementById("app")
    const loginHtml = `<div class="form">
    <h3>Форма входа</h3>
    <div class="form--row">
    <input type="text"
    id="login-input"
    class="input"
    placeholder="Логин">
    <input type="text"
    id="password-input"
    class="input"
    placeholder="Пароль">
    </div>
    <br>
    <button class="button" id="login-button">Войти</button>
    <a href="./index.html">Перейти на страницу комментариев</a>
    </div>`;
    appElement.innerHTML = loginHtml;
};

buttonElement.addEventListener("click", () => {
    login({login:loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData)=>{
        console.log(token);
         setToken(responseData.user.token);
        console.log(token);
    });
});