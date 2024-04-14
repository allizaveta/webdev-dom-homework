import { login, setToken } from "./api.js";
import { fetchGetComments } from "./api.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `<div class="form">
        <h3>Форма входа</h3>
        <div class="form--row">
            <input type="text" id="login-input" class="input" placeholder="Логин">
            <input type="password" id="password-input" class="input" placeholder="Пароль">
        </div>
        <br>
        <button class="button" id="login-button">Войти</button>
    </div>`;
    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    buttonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setToken(responseData.user.token);
            // Обновляем элемент с классом .add-form-name только после успешной авторизации
            const loggedInUserName = responseData.user.name;
            const nameInputElement = document.querySelector(".add-form-name");
            
            fetchGetComments();
        });
    });
};