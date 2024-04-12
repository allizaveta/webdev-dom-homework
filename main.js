import {catchErrorGet } from "./errorHandler.js";

const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("send-button");
const preloader = document.getElementById("preloader");
const comments = [];

catchErrorGet(comments);