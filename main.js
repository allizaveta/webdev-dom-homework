const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("send-button");
const listElement = document.getElementById("list");
let comments = [];
//Форматирование даты
// Функция для форматирования даты
const formatDate = (date) => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = ('' + date.getFullYear()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${hours}:${minutes} ${day}.${month}.${year}`;
};

// Функция для получения комментариев
const getComments = () => {
  fetch('https://wedev-api.sky.pro/api/v1/:elizaveta-aleksandrova/comments', {
    method: "GET",
  })
  .then((response) =>{
    if (response.status === 200) {
      return response.json();
    } 
    else{
      throw new Error('упси,сервер упал.');
    }
  })
  .then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
      };
    });
    //сделать ЛовИтель ошИбок тут
    comments = appComments;
    renderComments();
    //Добавляем функцию прелоадера
    addForm.classList.remove("hidden");
    preloader.classList.add('preloader-hidden');
  })
  .catch((error) => {
    console.warn(error);
  });
};

// Функция для рендеринга комментариев
const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    // Добавляем класс active-like, если isLiked равно true
    const likeButtonClass = comment.isLiked ? 'like-button active-like' : 'like-button';
    //Форматируем дату
    const formattedDate = formatDate(comment.date);
    return `<li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
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
  initLikeButtonListeners();
};

// Инициализация обработчика событий на клик по кнопке лайка
const initLikeButtonListeners = () => {
  const likeButtonElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener('click', () => {
      const index = likeButtonElement.dataset.index;

      // Изменяем значение isLiked и число лайков в соответствии с текущим состоянием кнопки 
      comments[index].isLiked = !comments[index].isLiked;
      if (comments[index].isLiked) {
        comments[index].likes++;
      } else {
        comments[index].likes--;
      }
      // Обновляем отображение кнопки "лайк"
      renderComments();
    });
  }
};
// Обработчик событий на кнопку отправить
buttonElement.addEventListener('click', () =>{
  nameInputElement.classList.remove('error');
  textInputElement.classList.remove('error');
  //Проверка длины введеного текста
  if (textInputElement.value.trim().length < 3) {
  alert("Вы ввели слишком короткое сообщение");
  return;
}
  // Валидация инпута на пустые строки
  if(nameInputElement.value.trim() === '' && textInputElement.value.trim() === ''){
    nameInputElement.classList.add('error');
    textInputElement.classList.add('error');
    return;
  }
  else if(textInputElement.value.trim() === ''){
    textInputElement.classList.add('error');
    return;
  }
  else if(nameInputElement.value.trim() === ''){
    nameInputElement.classList.add('error');
    return;
  };
  //лоадер на кнопку отправить
  addForm.classList.add('hidden')
  loader.classList.remove('hidden')


  // Выполнение POST запроса для добавления нового комментария
  const fetchPromise = fetch(
    'https://wedev-api.sky.pro/api/v1/:elizaveta-aleksandrova/comments',
    {
      method:"POST",
      body:JSON.stringify({
        name:nameInputElement.value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
        text:textInputElement.value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      }),
    });

  fetchPromise
  .then((response) =>{
    if (response.status === 200) {
      return response.json();
    }
    else if(response.status === 400){
      alert('Все плохо')
      throw new Error('Все очень плохо');
    }
    else{
      throw new Error('упси,сервер упал.');
    }
  })
    .then((responseData) => {
    buttonElement.disabled = false;
    buttonElement.textContent= 'Отправить';
    // Очистка инпутов
    textInputElement.value = '';
    nameInputElement.value = '';
    addForm.classList.remove('hidden')
    loader.classList.add('hidden')
    // После успешного выполнения POST запроса вызываем функцию для получения комментариев
    getComments();
  })
    .catch((error) => {
    //возвращаем addForm
    addForm.classList.remove('hidden')
    loader.classList.add('hidden')
    alert('кажется что-то пошло не так');
    //отправить в систему сбора ошибок
    console.warn(error);
  });
});
// Вызов функции получения комментариев при загрузке страницы
getComments();