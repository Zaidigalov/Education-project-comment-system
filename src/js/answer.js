"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnswerModule {
    constructor() {
        this.name = document.querySelector(".main__name").textContent;
        this.month = new Date().getMonth();
        this.day = new Date().getDate();
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.date = `${this.day}.${this.month + 1} ${this.hours}:${this.minutes}`;
        this.isFavorite = false;
        this.comment = document.createElement("section");
        this.comment.className = "tred__answer comment";
        this.commentText = document.querySelector(".textarea__input").textContent;
    }
    reply(buttonReply) {
        //let buttonReply: HTMLButtonElement = document.querySelector(".actions__button__reply")!;
        var _a, _b;
        let check = (_b = (_a = buttonReply.parentNode.parentNode.parentNode.parentNode) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.className;
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
            buttonReply.parentNode.parentNode.parentNode.parentNode.append(typingArea);
            typingArea.scrollIntoView();
        }
        else {
            buttonReply.parentNode.parentNode.parentNode.parentNode.lastChild.remove();
        }
    }
}
exports.default = AnswerModule;
