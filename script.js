"use strict";

import { getCurrentDate } from "./date.js";
// // Т. к. renderStudents экспортировалась по умолчанию default,
// // то имя функции мы не берем в фигурные скобки
import renderApp from "./render.js";
import { fetchGet } from "./api.js";
import { getListComments } from "./listComments.js";
//import { commentsLoading } from "./render.js";


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