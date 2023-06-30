export const rederLoginComponent = ({comments,appEl, setToken, getAPI}) => {
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
    
         document.getElementById('login-button').addEventListener('click', () => {
        
          setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
          getAPI();
         //renderApp(comments, listComments, token);
         });
    
        }); 
}

