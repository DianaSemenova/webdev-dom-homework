import { commentsElement } from "./script.js";
import { getLikeButton, replyToComment, editorComment } from "./script.js";

const renderComments = (comments) => {

  const commentsHtml = comments.map((comment, index) => {

    return `<li class="comment" data-index="${index}">
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
              <button data-index="${index}" class='editor-button'>Редактировать</button>
              <button data-id="${comment.id}" class='delete-button'>Удалить</button>
              </div>
              <div class="likes">
                <span class="likes-counter"> ${comment.likesNumber}</span>
                <button data-index="${index}" class='${comment.propertyColorLike}'></button>
              </div>
            </div>
          </li>`;
  }).join(""); //решила пока эту часть не делать отдельной функцией.Я пока не вижу смысла делать так. Через импорты экспорты понятнее

  commentsElement.innerHTML = commentsHtml;
  getLikeButton();
  replyToComment();
  editorComment();

};

export default renderComments;