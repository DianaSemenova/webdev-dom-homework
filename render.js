import { fetchPost, fetchDelete } from "./api.js";
import { getAPI } from "./script.js";
//import { getListCommentsNoEdit } from "./listComments.js";



const renderApp = (comments, listComments, token) => {


  const appEl = document.getElementById('app');

  //const commentsNoEditHtml = comments.map((comment, index) => getListCommentsNoEdit(comment, index)).join("");


  if (!token) {
    const appHTML = comments.map((comment, index) => {
  
      return ` <div class="container">
      <ul class="comments">
      <li class="comment" data-index="${index}">
        <div class="comment-header" data-index="${index}">
          <div>${comment.name}
          </div>
          <div>${comment.dateСreation}</div>
        </div>
        <div class="comment-body">
          <div data-index="${index}" class="comment-text" >
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="editor">
          </div>
          <div class="likes">
            <span class="likes-counter"> ${comment.likesNumber}</span>
            <button data-index="${index}" class='${comment.propertyColorLike}'></button>
          </div>
        </div>
      </li>
     </ul>
    <div>Чтобы добавить комментарий, <a  id="login-link" class="form-link" href="#">авторизуйтесь</a></div>
    </div>`;
    }).join("");

    appEl.innerHTML = appHTML;

    const authorization = document.getElementById('login-link');
    authorization.addEventListener('click', () => {

        const appHTML = 
      `<div class="container">
         <div class="form-add-login">
     <h3 class="form-title">Форма входа</h3>
     <div class="form-row">
        <input type="text" id="name-input" class="input" placeholder="Введите ваше имя" />
         <input type="text" id="login-input" class="input" placeholder="Введите логин"/>        
         <input type="text" id="password-input" class="input" placeholder="Введите пароль"/>
     </div>
     
     <button class="button" id="login-button">Войти</button>
     <a  class="register-link" href="#">Зарегистрироваться</a>  
     </div>
       </div>`;
  
       appEl.innerHTML = appHTML;
  
      });  

  } else { 

  const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join("");


  const appHTML = `<div class="container">


  <ul class="comments">
   ${commentsHtml}
  </ul>

  <div class="data-loading">Пожалуйста подождите, комментарии загружаются...</div>
  <div>Чтобы добавить комментарий, <a id="login-link" class="authorization-link" href="#">авторизуйтесь</a></div>
  <div class="add-form">
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
      <button class="delete-form-button">Удалить последний комментарий</button>
    </div>
  </div>
  <div class="comment-loading">Комментарий добавляется...</div>
</div>`;





  appEl.innerHTML = appHTML;

  const commentsLoading = document.querySelector('.data-loading');
  const formCommentElement = document.querySelector('.add-form');
  const inputNameElement = document.querySelector('.add-form-name');
  const inputTextElement = document.querySelector('.add-form-text');
  const buttonElement = document.querySelector('.add-form-button'); const commentsElement = document.querySelector('.comments');
  const buttonElementDel = document.querySelector('.delete-form-button');
  const commentLoadingElement = document.querySelector('.comment-loading');
  const currentDate = new Date().toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
    " " + new Date().toLocaleTimeString().slice(0, -3);


  //редактирование текста уже написанного комментария 
  function editorComment() {
    const editorButtonElements = document.querySelectorAll('.editor-button');
    const commentsBodyElements = document.querySelectorAll('.comment-body');//+ 



    for (const editorButtonElement of editorButtonElements) {

      editorButtonElement.addEventListener("click", (event) => {
        event.stopPropagation();

        const editorButtonIndex = editorButtonElement.dataset.index;
        console.log(editorButtonIndex);

        if (editorButtonElement.textContent === 'Редактировать') {

          editorButtonElement.textContent = 'Сохранить';

          commentsBodyElements[editorButtonIndex].innerHTML = `<textarea class="comment-text">${comments[editorButtonIndex].text}</textarea>`;

        } else {

          comments[editorButtonIndex].text = editorButtonElement.closest('.comment').querySelector('textarea').value;
          comments[editorButtonIndex].dateСreation = `${currentDate} (изменено)`;
          renderApp(comments, getListComments, token)
        }
      }


      )
    }
  }
  editorComment();


  // Функция для имитации запросов в API
  // Не смотрите особо на внутренности, мы разберемся с этим позже
  function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  };

  //счетчик лайков у каждого комментария
  function getLikeButton() {
    const likesButton = document.querySelectorAll('.like-button');
    for (const like of likesButton) {
      like.addEventListener("click", (event) => {

        event.stopPropagation();

        const likeIndex = like.dataset.index;
        const commentsElementLikeIndex = comments[likeIndex];
        like.classList.add('-loading-like');

        if (commentsElementLikeIndex.likeComment) {
          commentsElementLikeIndex.likesNumber -= 1;
          commentsElementLikeIndex.likeComment = false;
          commentsElementLikeIndex.propertyColorLike = 'like-button -no-active-like';
        } else {
          commentsElementLikeIndex.likesNumber += 1;
          commentsElementLikeIndex.likeComment = true;
          commentsElementLikeIndex.propertyColorLike = 'like-button -active-like';
        }

        delay(2000).then(() => {
          renderApp(comments, getListComments, token)
        })

      })
    }
  };
  getLikeButton();


  //Ответы на комментарии
  function replyToComment() {
    let commentElements = document.querySelectorAll('.comment');

    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {

        const indexComment = commentElement.dataset.index;
        let QUOTE_BEGIN = 'QUOTE_BEGIN';
        let QUOTE_END = 'QUOTE_END';
        inputTextElement.value =
          `${QUOTE_BEGIN}${comments[indexComment].name}:\n${comments[indexComment].text}${QUOTE_END}\n\n`;
      }
      )
    }
  };

  replyToComment();


  const deleteComment = () => {

    const deleteButtons = document.querySelectorAll(".delete-button");
    console.log(deleteButtons);

    for (const deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = deleteButton.dataset.id;
        console.log(id);
        // подписываемся на успешное завершение запроса с помощью then 
        fetchDelete(token, id)
          .then((responseData) => {
            comments = responseData.appComments;
            return getAPI();
          });

        // renderApp(comments, getListComments, token)
      });
    }
  };

  deleteComment();


  //доп.задание1  кнопка «Написать» не кликабельна, если имя или текст в форме незаполненные.
  buttonElement.setAttribute('disabled', true);

  inputNameElement.addEventListener("input", () => {

    buttonElement.setAttribute('disabled', true);

    if ((inputNameElement.value.length > 0) && (inputTextElement.value.length > 0)) {

      buttonElement.removeAttribute('disabled');
    }
  });

  inputTextElement.addEventListener("input", () => {

    buttonElement.setAttribute('disabled', true);

    if ((inputNameElement.value.length > 0) && (inputTextElement.value.length > 0)) {

      buttonElement.removeAttribute('disabled');
    }
  });


  //отпраляем новые данные   
  const postData = () => {

    return fetchPost(token, inputTextElement, inputNameElement)
      .then((response) => {
        return getAPI();
      })
      .then((data) => {
        commentLoadingElement.classList.add('comment-loading');
        formCommentElement.classList.remove('comment-loading');

        inputNameElement.value = "";
        inputTextElement.value = "";

      })
      .catch((error) => {

        // В объекте error есть ключ message, в котором лежит сообщение об ошибке
        // Если сервер сломался, то просим попробовать позже
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже");
          postData();
        } else
          // Если пользователь накосячил с запросом, просим поправить
          if (error.message === "Плохой запрос") {
            alert("Имя и комментарий должны быть не короче 3 символов");
          } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.log(error);
          }

        buttonElement.removeAttribute('disabled');
        commentLoadingElement.classList.add('comment-loading');
        formCommentElement.classList.remove('comment-loading');

        console.log(error);
      });
  };



  buttonElement.addEventListener("click", () => {

    commentLoadingElement.classList.remove('comment-loading');
    formCommentElement.classList.add('comment-loading');
    buttonElement.setAttribute('disabled', true);

    //отпраляем новые данные 
    postData(fetchPost);
  });


  ///Доп.задание2 нажатие клавиши Enter должно вызывать ту же логику, которая срабатывает при клике на кнопку «Добавить».
  document.addEventListener("keyup", function (event) {
    if (event.shiftKey && (event.keyCode === 13)) {
      //переносит на другую строку
    } else if (event.keyCode === 13) {
      buttonElement.click();
    }
  });

  //удаление последнего комментари
  buttonElementDel.addEventListener("click", () => {

    comments.pop();
    renderApp(comments, getListComments, token)
    // const lastElement = commentsElement.lastElementChild;
    // lastElement.remove();
    });
  }

};

export default renderApp;