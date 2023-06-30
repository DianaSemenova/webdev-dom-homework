import { loginUser } from "../api.js"

export const rederLoginComponent = ({comments,appEl, setToken, getAPI}) => {

let isLoginMode = true;

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
    
     
    const renderForm = () => {
      document.getElementById('login-link').addEventListener('click', () => {
    
        const appHTML = 
      `<div class="container">
         <div class="form-add-login">
     <h3 class="form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
     <div class="form-row">

     ${isLoginMode ? "" : `<input type="text" id="name-input" class="input" placeholder="Введите ваше имя" />`}
         <input type="text" id="login-input" class="input" placeholder="Введите логин"/>        
         <input type="password" id="password-input" class="input" placeholder="Введите пароль"/>
     </div>
     
     <button class="button" id="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
     <a  class="register-link" href="#">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>  
     </div>
       </div>`;
  
       appEl.innerHTML = appHTML;         
       
       document.querySelector('.register-link').addEventListener('click', ()=> {
          isLoginMode = !isLoginMode;
          renderForm();
       });

       document.getElementById('login-button').addEventListener('click', () => {

         if (!isLoginMode) {
          const login = document.getElementById('login-input').value;
          const password = document.getElementById('password-input').value;

          if (!login) {
              alert('Введите логин');
              return;
          }
          if (!password) {
              alert('Введите пароль');
              return;
          }
      
       
        loginUser({
          login: login,
          password: password,
        })
        .then ((user) => {
          console.log(user);
          setToken(`Bearer ${user.user.token}`);
          getAPI();
        })
        .catch((error) => {

          if (error.message === "Сервер сломался") {
            alert("Сервер сломался, попробуйте позже");
            getAPI();
          } else if (error.message === "Нет авторизации") {          
              alert(error.message);
            } else {
              alert('Кажется, у вас сломался интернет, попробуйте позже');
              console.log(error);
            }
        });
         } else {
          alert ("Заглушка регистрации");
         }
        
       //renderApp(comments, listComments, token);
       });
  
      });
    }
   renderForm();
}

