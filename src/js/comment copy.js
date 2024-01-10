"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentSendModule {
    constructor() {
        this.comment = document.createElement("section");
        this.commentText = document.querySelector(".textarea__input").innerHTML;
        this.day = new Date().getDate();
        this.month = new Date().getMonth();
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.date = `${this.day}.${this.month + 1} ${this.hours}:${this.minutes}`;
        this.name = document.querySelector(".main__name").textContent;
        this.create();
    }
    create() {
        if (this.commentText == "")
            return;
        this.comment.className = "tred";
        this.comment.innerHTML = `
    <article class="tred__comment comment">
              <div class="comment__avatar avatar">
                <img class="avatar__image" src="https://loremflickr.com/61/61" alt="avatar" />
              </div>
              <div class="comment__main">
                <div class="comment-main__info">
                  <p class="comment-main__info__name">${this.name}</p>
                  <p class="comment-main__info__time">${this.date}</p>
                </div>
                <div class="main__text">${this.commentText}
                </div>
                <div class="main__actions actions">
                  <span class="actions__button__reply">Ответить</span>
                  <span class="actions__button__favorite actions__button__favorite_pressed">В избранное</span>
                  <div class="actions__rating rating">
                    <button class="rating__button rating__button_decrease">-</button>
                    <span class="rating__number">0</span>
                    <button class="rating__button rating__button_increase"></button>
                  </div>
                </div>
              </div>
    </article>`;
        document.querySelector(".comments").append(this.comment);
        this.comment.scrollIntoView();
    }
    reply(button) {
        var _a, _b;
        let check = (_b = (_a = button.parentNode.parentNode.parentNode.parentNode) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.className;
        if (check !== "tred__typing") {
            const typingArea = document.createElement("article");
            typingArea.classList.add("tred__typing");
            typingArea.innerHTML = `
      <div class="tred-typing__avatar avatar">
        <img class="avatar__image" src="https://loremflickr.com/61/61" alt="avatar" />
      </div>
      <div class="tred-typing__main">
        <div class="main__name-and-symbols">
          <p class="main__name">Максим Авдеенко</p>
          <p class="main__symbols main__symbols_empty reply-symbols_empty">Макс. 1000 символов</p>
          <p class="main__symbols main__symbols_typing reply-symbols_typing unvisible"><span class="symbols__quantity reply-symbols__quantity">1</span>/1000</p>
        </div>
        <div class="main__textarea">
          <span class="textarea__placeholder reply-placeholder">Введите текст сообщения...</span>
          <div class="textarea__input reply-textarea" contenteditable="true" ondrop="return false;"></div>
        </div>
      </div>
      <button class="typing__button reply-button button_disabled" disabled>Ответить</button>
      
      `;
            button.parentNode.parentNode.parentNode.parentNode.append(typingArea);
            typingArea.scrollIntoView();
        }
        else {
            button.parentNode.parentNode.parentNode.parentNode.lastChild.remove();
        }
    }
}
exports.default = CommentSendModule;
