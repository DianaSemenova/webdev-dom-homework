"use strict";

import { getCurrentDate } from "./date.js";
// // Т. к. renderStudents экспортировалась по умолчанию default,
// // то имя функции мы не берем в фигурные скобки
import renderApp from "./render.js";
import { fetchGet } from "./api.js";
import { getListComments } from "./listComments.js";
//import { commentsLoading } from "./render.js";

// const commentsLoading = document.querySelector('.data-loading');
// const formCommentElement = document.querySelector('.add-form');
// export const inputNameElement = document.querySelector('.add-form-name');
// export const inputTextElement = document.querySelector('.add-form-text');
// const buttonElement = document.querySelector('.add-form-button');
// export const commentsElement = document.querySelector('.comments');
// const buttonElementDel = document.querySelector('.delete-form-button');
// const commentLoadingElement = document.querySelector('.comment-loading');
// const currentDate = new Date().toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
//   " " + new Date().toLocaleTimeString().slice(0, -3);




let comments = [];
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;


export function getAPI() {
  return fetchGet(token)
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          id: comment.id,
          name: comment.author.name,
          dateСreation: getCurrentDate(new Date(comment.date)),
          text: comment.text,
          likeComment: comment.isLiked,
          likesNumber: comment.likes,
          propertyColorLike: 'like-button no-active-like',
        }
      });
      comments = appComments;
      return  renderApp(comments, getListComments, token);
    })
    // .then((response) => {
    //   commentsLoading.style.display = 'none';
    // })
    .catch((error) => {

      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуйте позже");
        getAPI();
      } else if (error.message === "Нет авторизации") {          
          console.log(error);
        } else {
          alert('Кажется, у вас сломался интернет, попробуйте позже');
          console.log(error);
        }
    });
};

getAPI();

// //редактирование текста уже написанного комментария 
// export function editorComment() {
//   const editorButtonElements = document.querySelectorAll('.editor-button');
//   const commentsBodyElements = document.querySelectorAll('.comment-body');//+ 



//   for (const editorButtonElement of editorButtonElements) {

//     editorButtonElement.addEventListener("click", (event) => {
//       event.stopPropagation();

//       const editorButtonIndex = editorButtonElement.dataset.index;
//       console.log(editorButtonIndex);

//       if (editorButtonElement.textContent === 'Редактировать') {

//         editorButtonElement.textContent = 'Сохранить';

//         commentsBodyElements[editorButtonIndex].innerHTML = `<textarea class="comment-text">${comments[editorButtonIndex].text}</textarea>`;

//       } else {

//         comments[editorButtonIndex].text = editorButtonElement.closest('.comment').querySelector('textarea').value;
//         comments[editorButtonIndex].dateСreation = `${currentDate} (изменено)`;
//         renderComments(comments, getListComments,token)
//       }
//     }


//     )
//   }
// }
// editorComment();

// // Функция для имитации запросов в API
// // Не смотрите особо на внутренности, мы разберемся с этим позже
// function delay(interval = 300) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, interval);
//   });
// };

// //счетчик лайков у каждого комментария
// export function getLikeButton() {
//   const likesButton = document.querySelectorAll('.like-button');
//   for (const like of likesButton) {
//     like.addEventListener("click", (event) => {

//       event.stopPropagation();

//       const likeIndex = like.dataset.index;
//       const commentsElementLikeIndex = comments[likeIndex];
//       like.classList.add('-loading-like');

//       if (commentsElementLikeIndex.likeComment) {
//         commentsElementLikeIndex.likesNumber -= 1;
//         commentsElementLikeIndex.likeComment = false;
//         commentsElementLikeIndex.propertyColorLike = 'like-button -no-active-like';
//       } else {
//         commentsElementLikeIndex.likesNumber += 1;
//         commentsElementLikeIndex.likeComment = true;
//         commentsElementLikeIndex.propertyColorLike = 'like-button -active-like';
//       }

//       delay(2000).then(() => {
//         renderComments(comments, getListComments,token)
//       })

//     })
//   }
// };
// getLikeButton();


// //Ответы на комментарии
// export function replyToComment() {
//   let commentElements = document.querySelectorAll('.comment');

//   for (const commentElement of commentElements) {
//     commentElement.addEventListener("click", () => {

//       const indexComment = commentElement.dataset.index;
//       let QUOTE_BEGIN = 'QUOTE_BEGIN';
//       let QUOTE_END = 'QUOTE_END';
//       inputTextElement.value =
//         `${QUOTE_BEGIN}${comments[indexComment].name}:\n${comments[indexComment].text}${QUOTE_END}\n\n`;
//     }
//     )
//   }
// };

// replyToComment();
renderApp(comments, getListComments, token);

// //доп.задание1  кнопка «Написать» не кликабельна, если имя или текст в форме незаполненные.
// buttonElement.setAttribute('disabled', true);

// inputNameElement.addEventListener("input", () => {

//   buttonElement.setAttribute('disabled', true);

//   if ((inputNameElement.value.length > 0) && (inputTextElement.value.length > 0)) {

//     buttonElement.removeAttribute('disabled');
//   }
// });

// inputTextElement.addEventListener("input", () => {

//   buttonElement.setAttribute('disabled', true);

//   if ((inputNameElement.value.length > 0) && (inputTextElement.value.length > 0)) {

//     buttonElement.removeAttribute('disabled');
//   }
// });
       

// //отпраляем новые данные   
// const postData = () => {

//   return fetchPost(token)
//     .then((response) => {
//       return getAPI();
//     })
//     .then((data) => {
//       commentLoadingElement.classList.add('comment-loading');
//       formCommentElement.classList.remove('comment-loading');

//       inputNameElement.value = "";
//       inputTextElement.value = "";

//     })
//     .catch((error) => {

//       // В объекте error есть ключ message, в котором лежит сообщение об ошибке
//       // Если сервер сломался, то просим попробовать позже
//       if (error.message === "Сервер сломался") {
//         alert("Сервер сломался, попробуйте позже");
//         postData();
//       } else
//         // Если пользователь накосячил с запросом, просим поправить
//         if (error.message === "Плохой запрос") {
//           alert("Имя и комментарий должны быть не короче 3 символов");
//         } else {
//           alert('Кажется, у вас сломался интернет, попробуйте позже');
//           console.log(error);
//         }

//       buttonElement.removeAttribute('disabled');
//       commentLoadingElement.classList.add('comment-loading');
//       formCommentElement.classList.remove('comment-loading');

//       console.log(error);
//     });
// };



// buttonElement.addEventListener("click", () => {

//   commentLoadingElement.classList.remove('comment-loading');
//   formCommentElement.classList.add('comment-loading');
//   buttonElement.setAttribute('disabled', true);

//   //отпраляем новые данные 
//   postData(fetchPost);
// });


// ///Доп.задание2 нажатие клавиши Enter должно вызывать ту же логику, которая срабатывает при клике на кнопку «Добавить».
// document.addEventListener("keyup", function (event) {
//   if (event.shiftKey && (event.keyCode === 13)) {
//     //переносит на другую строку
//   } else if (event.keyCode === 13) {
//     buttonElement.click();
//   }
// });

// //удаление последнего комментари
// buttonElementDel.addEventListener("click", () => {

//   comments.pop();
//   renderComments(comments, getListComments,token)
//   // const lastElement = commentsElement.lastElementChild;
//   // lastElement.remove();
// });