"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = __importDefault(require("./comment"));
class MainInputModule {
    constructor() {
        this.cleanTextArea = () => {
            this.input.innerText = "";
            this.content = "";
            this.placeholder.style.display = "inline";
            document.querySelector(".main__symbols_empty").classList.remove("unvisible");
            document.querySelector(".main__symbols_typing").classList.add("unvisible");
            this.makeButtonDisabled();
        };
        this.name = "Аноним";
        document.querySelector(".main__name").textContent = this.name;
        this.maxLength = 10;
        this.input = document.querySelector(".textarea__input");
        this.content = this.input.textContent;
        this.placeholder = document.querySelector(".textarea__placeholder");
        this.buttonSend = document.querySelector(".typing__button");
        if (!this.input) {
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
        this.buttonSend.classList.remove("button_disabled");
        this.buttonSend.classList.add("button_enabled");
        this.buttonSend.disabled = false;
    }
    makeButtonDisabled() {
        this.buttonSend.classList.add("button_disabled");
        this.buttonSend.classList.remove("button_enabled");
        this.buttonSend.disabled = true;
    }
    createComment() {
        var _a;
        let comment = new comment_1.default();
        if (((_a = this.content) === null || _a === void 0 ? void 0 : _a.length) == 0)
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
                  <p class="comment-main__info__name">${comment.name}</p>
                  <p class="comment-main__info__time">${comment.date}</p>
                </div>
                <div class="main__text">${comment.commentText}
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
let inputModule = new MainInputModule();
inputModule.input.onfocus = () => {
    inputModule.placeholder.style.display = "none";
};
inputModule.input.onblur = () => {
    if (inputModule.content.length == 0) {
        inputModule.makeButtonDisabled();
        inputModule.placeholder.style.display = "inline";
        document.querySelector(".main__symbols_empty").classList.remove("unvisible");
        document.querySelector(".main__symbols_typing").classList.add("unvisible");
    }
    if (inputModule.content.length > inputModule.maxLength) {
        inputModule.makeButtonDisabled();
    }
};
inputModule.input.addEventListener("input", (e) => {
    document.querySelector(".main__symbols_empty").classList.add("unvisible");
    document.querySelector(".main__symbols_typing").classList.remove("unvisible");
    if (inputModule.content.length + 1 > inputModule.maxLength && e.inputType == "insertText") {
        inputModule.input.textContent = inputModule.content.substring(0, inputModule.maxLength);
        inputModule.input.focus();
        inputModule.placeCaretAtEnd(document.querySelector(".textarea__input"));
    }
    inputModule.content = inputModule.input.textContent;
    document.querySelector(".symbols__quantity").innerHTML = inputModule.content.length;
    if (inputModule.content.length > 0 && inputModule.content.length < inputModule.maxLength) {
        inputModule.makeButtonEnabled();
    }
});
inputModule.input.addEventListener("paste", (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    if (clipboardData) {
        if (clipboardData.types && clipboardData.types.includes("Files")) {
            event.preventDefault();
        }
    }
});
inputModule.input.addEventListener("paste", (e) => {
    e.preventDefault();
    let text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
});
inputModule.input.addEventListener("keydown", () => {
    setTimeout(checkIsInputEmpty, 1);
});
function checkIsInputEmpty() {
    if (inputModule.content.length == 0) {
        inputModule.makeButtonDisabled();
    }
    if (inputModule.content.length > inputModule.maxLength) {
        inputModule.makeButtonDisabled();
    }
}
inputModule.buttonSend.addEventListener("click", inputModule.createComment);
inputModule.buttonSend.addEventListener("click", inputModule.cleanTextArea);
exports.default = MainInputModule;
/* ДОБАВИТЬ ПРОВЕРКУ ПРОБЕЛОВ И ПЕРЕНОСОВ. ОНИ НЕ СЧИТАЮТСЯ ПУСТОЙ СТРОКОЙ */
