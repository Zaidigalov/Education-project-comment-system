class ReplyInputModule {
  name: string;
  maxLength: number;
  replyTyping:string;

  contentReply: string | null | undefined;

  constructor() {
    this.name = "Аноним";
    document.querySelector(".main__name")!.textContent = this.name;
    this.maxLength = 1000;

    this.replyTyping = `
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

  placeCaretAtEnd(el: HTMLElement) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      let range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      let sel = window.getSelection();
      sel!.removeAllRanges();
      sel!.addRange(range);
    } else if (typeof document.body.createRange != "undefined") {
      let textRange = document.body.createRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  makeButtonEnabled(button: HTMLButtonElement) {
    button.classList.remove("button_disabled");
    button.classList.add("button_enabled");
    button.disabled = false;
  }

  makeButtonDisabled(button: HTMLButtonElement) {
    button.classList.add("button_disabled");
    button.classList.remove("button_enabled");
    button.disabled = true;
  }


  cleanTextArea = () => {
    this.inputReply.innerText = "";
    this.contentReply = "";

    this.placeholderReply.style.display = "inline";
    document.querySelector(".main__symbols_empty")!.classList.remove("invisible");
    document.querySelector(".main__symbols_typing")!.classList.add("invisible");

  };
}

let replyInputModule: any = new ReplyInputModule();

export default ReplyInputModule;
