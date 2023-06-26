import { commentsElement } from "./script.js";
import { getLikeButton, replyToComment, editorComment } from "./script.js";



const renderComments = (comments, listComments) => {

  const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join(""); //решила пока эту часть не делать отдельной функцией.Я пока не вижу смысла делать так. Через импорты экспорты понятнее

  commentsElement.innerHTML = commentsHtml;
  getLikeButton();
  replyToComment();
  editorComment();

};

export default renderComments;