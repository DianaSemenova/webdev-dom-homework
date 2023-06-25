import {getCurrentDate} from "./date.js";

//const adresAPI = "https://wedev-api.sky.pro/api/v1/diana-semenova/comments";

function fetchPromiceArr() {
    return fetch("https://wedev-api.sky.pro/api/v1/diana-semenova/comments", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            dateСreation: getCurrentDate(new Date(comment.date)),
            text: comment.text,
            likeComment: comment.isLiked,
            likesNumber: comment.likes,
            propertyColorLike: 'like-button no-active-like',
          }
        });
        comments = appComments;
        return renderComments();
      })
      .then((response) => {
        commentsLoading.style.display = 'none';
      });

    //});
  };


  //отпраляем новые данные   
  const postData = ("https://wedev-api.sky.pro/api/v1/diana-semenova/comments") => {

    return fetch("https://wedev-api.sky.pro/api/v1/diana-semenova/comments", {
      method: "POST",
      body: JSON.stringify({
        name: inputNameElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        date: getCurrentDate(new Date()),
        text: inputTextElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll('QUOTE_BEGIN', "<div class='comment-quote'><b>")
          .replaceAll('QUOTE_END', "</b></div>"),
        isLiked: false,
        likes: 0,
        propertyColorLike: 'like-button no-active-like',
       forceError: true,
      })
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер сломался");
        } else if (response.status === 400) {
          throw new Error("Плохой запрос");
        } else {
          return fetchPromiceArr();
        }
      })
      .then((data) => {
        commentLoadingElement.classList.add ('comment-loading');      
        formCommentElement.classList.remove ('comment-loading');

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

    // Во всех остальных случаях просто логируем в консоль ошибку,
    // т. к. не знаем точно, что случилось и как помочь юзеру
       

        buttonElement.removeAttribute('disabled');
        commentLoadingElement.classList.add ('comment-loading');      
        formCommentElement.classList.remove ('comment-loading');

        console.log(error);
      });
  };
