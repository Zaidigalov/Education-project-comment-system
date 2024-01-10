"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reply_1 = __importDefault(require("./reply"));
class ReplyInputModule {
    constructor() {
        this.cleanTextArea = () => {
            this.inputReply.innerText = "";
            this.contentReply = "";
            this.placeholderReply.style.display = "inline";
            document.querySelector(".main__symbols_empty").classList.remove("invisible");
            document.querySelector(".main__symbols_typing").classList.add("invisible");
            this.makeButtonDisabled();
        };
        this.name = "Аноним";
        document.querySelector(".main__name").textContent = this.name;
        this.maxLength = 10;
        this.replyBlock = document.createElement("div");
        this.replyBlock.className = "tred__reply";
        this.replyBlock.innerHTML = `
    <div class="reply__typing">
                <div class="reply-typing__avatar avatar">
                  <img class="avatar__image" src="https://loremflickr.com/61/61" alt="avatar" />
                </div>
                <div class="reply-typing__main">
                  <div class="main__name-and-symbols">
                    <p class="main__name">${this.name}</p>
                    <p class="main__symbols main__symbols_empty reply-symbols_empty">Макс. 1000 символов</p>
                    <p class="main__symbols main__symbols_typing reply-symbols_typing invisible">
                      <span class="symbols__quantity reply-symbols__quantity">1</span>/1000
                    </p>
                  </div>
                  <div class="main__textarea">
                    <span class="textarea__placeholder reply-placeholder">Введите текст сообщения...</span>
                    <div class="textarea__input reply-textarea" contenteditable="true" ondrop="return false;"></div>
                  </div>
                </div>
                <button class="typing__button reply-button button_disabled" disabled>Ответить</button>
              </div>`;
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
    makeButtonEnabled(button) {
        button.classList.remove("button_disabled");
        button.classList.add("button_enabled");
        button.disabled = false;
    }
    makeButtonDisabled(button) {
        button.classList.add("button_disabled");
        button.classList.remove("button_enabled");
        button.disabled = true;
    }
    createReply(button) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let replyModule = new reply_1.default();
        if (((_a = replyModule.replyText) === null || _a === void 0 ? void 0 : _a.length) == 0)
            return;
        let reply = document.createElement("div");
        reply.className = "reply__answer comment";
        reply.setAttribute("favorite", "false");
        reply.setAttribute("rank", `${replyModule.rank}`);
        reply.setAttribute("freePoints", "1");
        reply.setAttribute("rankStatus", "none");
        this.replyBlock.append(reply);
        let parentName = (_h = (_g = (_f = (_e = (_d = (_c = (_b = reply.parentNode) === null || _b === void 0 ? void 0 : _b.previousSibling.previousSibling) === null || _c === void 0 ? void 0 : _c.lastChild) === null || _d === void 0 ? void 0 : _d.previousSibling) === null || _e === void 0 ? void 0 : _e.firstChild) === null || _f === void 0 ? void 0 : _f.nextSibling.firstChild) === null || _g === void 0 ? void 0 : _g.nextSibling) === null || _h === void 0 ? void 0 : _h.textContent;
        if (parentName == undefined) {
            parentName = (_j = reply.parentNode.previousSibling.lastChild.previousSibling.firstChild) === null || _j === void 0 ? void 0 : _j.nextSibling.firstChild.nextSibling.textContent;
        }
        reply.innerHTML = `
    <div class="comment__avatar avatar">
                  <img class="avatar__image" src="https://loremflickr.com/61/61" alt="avatar" />
                </div>
                <div class="comment__main">
                  <div class="comment-main__info">
                    <p class="comment-main__info__name">${replyModule.name}</p>
                    <p class="comment-main__info__parent-name">${parentName}</p>
                    <p class="comment-main__info__time">${replyModule.date}</p>
                  </div>
                  <div class="main__text">
                  ${replyModule.replyText}
                  </div>
                  <div class="main__actions actions">
                    <span class="actions__button__favorite reply__actions__button__favorite">В избранное</span>
                    <div class="actions__rating rating">
                      <button class="rating__button rating__button_decrease">-</button>
                      <span class="rating__number">${replyModule.rank}</span>
                      <button class="rating__button rating__button_increase"></button>
                    </div>
                  </div>
                </div>`;
        reply.scrollIntoView();
    }
}
let replyInputModule = new ReplyInputModule();
exports.default = ReplyInputModule;
