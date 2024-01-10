"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const answer_1 = __importDefault(require("./answer"));
class AnswerInputModule {
    constructor() {
        this.cleanTextArea = () => {
            this.inputReply.innerText = "";
            this.contentReply = "";
            this.placeholderReply.style.display = "inline";
            document.querySelector(".main__symbols_empty").classList.remove("unvisible");
            document.querySelector(".main__symbols_typing").classList.add("unvisible");
            this.makeButtonDisabled();
        };
        this.name = "Аноним";
        document.querySelector(".main__name").textContent = this.name;
        this.maxLength = 10;
        this.inputReply = document.querySelector(".textarea__input");
        this.contentReply = this.inputReply.textContent;
        this.placeholderReply = document.querySelector(".textarea__placeholder");
        this.buttonReplySend = document.querySelector(".reply-button");
        if (!this.inputReply) {
            return;
        }
    }
    placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            let range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        else if (typeof document.body.createRange != "undefined") {
            let textRange = document.body.createRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }
    makeButtonEnabled() {
        this.buttonReplySend.classList.remove("button_disabled");
        this.buttonReplySend.classList.add("button_enabled");
        this.buttonReplySend.disabled = false;
    }
    makeButtonDisabled() {
        this.buttonReplySend.classList.add("button_disabled");
        this.buttonReplySend.classList.remove("button_enabled");
        this.buttonReplySend.disabled = true;
    }
    createAnswer() {
        var _a;
        let answer = new answer_1.default();
        if (((_a = this.contentReply) === null || _a === void 0 ? void 0 : _a.length) == 0)
            return;
        let tred = document.createElement("section");
        tred.className = "tred";
        tred.innerHTML = `
    <article class="tred__comment comment">
              <div class="comment__avatar avatar">
                <img class="avatar__image" src="https://loremflickr.com/61/61" alt="avatar" />
              </div>
              <div class="comment__main">
                <div class="comment-main__info">
                  <p class="comment-main__info__name">${answer.name}</p>
                  <p class="comment-main__info__time">${answer.date}</p>
                </div>
                <div class="main__text">${answer.commentText}
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
        document.querySelector(".comments").append(tred);
        tred.scrollIntoView();
    }
}
let answerInputModule = new AnswerInputModule();
answerInputModule.inputReply.onfocus = () => {
    answerInputModule.placeholderReply.style.display = "none";
};
answerInputModule.inputReply.onblur = () => {
    if (answerInputModule.contentReply.length == 0) {
        answerInputModule.makeButtonDisabled();
        answerInputModule.placeholderReply.style.display = "inline";
        document.querySelector(".main__symbols_empty").classList.remove("unvisible");
        document.querySelector(".main__symbols_typing").classList.add("unvisible");
    }
    if (answerInputModule.contentReply.length > answerInputModule.maxLength) {
        answerInputModule.makeButtonDisabled();
    }
};
answerInputModule.inputReply.addEventListener("inputReply", (e) => {
    document.querySelector(".main__symbols_empty").classList.add("unvisible");
    document.querySelector(".main__symbols_typing").classList.remove("unvisible");
    if (answerInputModule.contentReply.length + 1 > answerInputModule.maxLength && e.inputType == "insertText") {
        answerInputModule.inputReply.textContent = answerInputModule.contentReply.substring(0, answerInputModule.maxLength);
        answerInputModule.inputReply.focus();
        answerInputModule.placeCaretAtEnd(document.querySelector(".textarea__input"));
    }
    answerInputModule.contentReply = answerInputModule.inputReply.textContent;
    document.querySelector(".symbols__quantity").innerHTML = answerInputModule.contentReply.length;
    if (answerInputModule.contentReply.length > 0 && answerInputModule.contentReply.length < answerInputModule.maxLength) {
        answerInputModule.makeButtonEnabled();
    }
});
answerInputModule.inputReply.addEventListener("paste", (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    if (clipboardData) {
        if (clipboardData.types && clipboardData.types.includes("Files")) {
            event.preventDefault();
        }
    }
});
answerInputModule.inputReply.addEventListener("paste", (e) => {
    e.preventDefault();
    let text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
});
answerInputModule.inputReply.addEventListener("keydown", () => {
    setTimeout(checkIsInputEmpty, 1);
});
function checkIsInputEmpty() {
    if (answerInputModule.contentReply.length == 0) {
        answerInputModule.makeButtonDisabled();
    }
    if (answerInputModule.contentReply.length > answerInputModule.maxLength) {
        answerInputModule.makeButtonDisabled();
    }
}
answerInputModule.buttonReplySend.addEventListener("click", answerInputModule.createComment);
answerInputModule.buttonReplySend.addEventListener("click", answerInputModule.cleanTextArea);
exports.default = AnswerInputModule;
/* ДОБАВИТЬ ПРОВЕРКУ ПРОБЕЛОВ И ПЕРЕНОСОВ. ОНИ НЕ СЧИТАЮТСЯ ПУСТОЙ СТРОКОЙ */
