import { login, setToken, token } from "./api.js";
import { renderComments } from "./renderComments.js";


export const renderLogin = (comments) => {
    const appElement = document.getElementById("app");
    const loginHtml = `<div class="form container">
    <div class="form--row login-form">
    <h3>Форма входа</h3>
            <input type="text" id="login-input" class="input add-form-text" placeholder="Логин">
            <input type="password" id="password-input" class="input add-form-text" placeholder="Пароль">
        <button class="button add-form-button" id="login-button">Войти</button>
        </div>
        
    </div>`;
    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    buttonElement.addEventListener("click", () => {
        if (loginInputElement.value.trim() === '' || passwordInputElement.value.trim() === '') {
            alert('Пожалуйста, заполните все поля.');
            return;
        }
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log('Ответ от сервера:', responseData);
            if (responseData.user && responseData.user.token) {
                const token = responseData.user.token;
                setToken(token);
                const loggedInUserName = responseData.user.name;
                renderComments(comments, loggedInUserName, token);
            } else {
                alert('Ошибка: Неверный формат ответа сервера');
                console.error('Ошибка: Неверный формат ответа сервера', responseData);
            }
        })
    });
};

