import {getCurrentDate} from "./date.js";

//const adresAPI = "https://wedev-api.sky.pro/api/v1/diana-semenova/comments";

export const fetchGet = 
     fetch("https://wedev-api.sky.pro/api/v1/diana-semenova/comments", {
      method: "GET",
    }).
    then((response) => {
        return response.json();
    })
     
      
//   //отпраляем новые данные   
//   const fetchPost =  fetch("https://wedev-api.sky.pro/api/v1/diana-semenova/comments", {
//       method: "POST",
//       body: JSON.stringify({
//         name: inputNameElement.value
//           .replaceAll("&", "&amp;")
//           .replaceAll("<", "&lt;")
//           .replaceAll(">", "&gt;")
//           .replaceAll('"', "&quot;"),
//         date: getCurrentDate(new Date()),
//         text: inputTextElement.value
//           .replaceAll("&", "&amp;")
//           .replaceAll("<", "&lt;")
//           .replaceAll(">", "&gt;")
//           .replaceAll('"', "&quot;")
//           .replaceAll('QUOTE_BEGIN', "<div class='comment-quote'><b>")
//           .replaceAll('QUOTE_END', "</b></div>"),
//         isLiked: false,
//         likes: 0,
//         propertyColorLike: 'like-button no-active-like',
//        forceError: true,
//       })
//     })
//       .then((response) => {
//         if (response.status === 500) {
//           throw new Error("Сервер сломался");
//         } else if (response.status === 400) {
//           throw new Error("Плохой запрос");
//         } else {
//           return response.json();
//         }
//       })
