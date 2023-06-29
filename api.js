import { getCurrentDate } from "./date.js";
import { inputTextElement, inputNameElement } from "./renderComments.js";

const host = "https://wedev-api.sky.pro/api/v2/diana-semenova/comments/";

export const fetchGet = (token) => {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
  }
  })
  .then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    } else  if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else {
      return response.json();
    }    
  })
}



//отпраляем новые данные   
export const fetchPost = (token) => {
  return fetch(host, {
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
      headers: {
        Authorization: token,
    }
    })
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      } else if (response.status === 400) {
        throw new Error("Плохой запрос");
      } else {
        return response.json();
      }
    })

}

//удаляем
export function fetchDelete(token,id) {
  return fetch(host + id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
}
