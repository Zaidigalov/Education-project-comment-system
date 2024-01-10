import CommentModule from "./comment";

class MainInputModule {
  name: string;
  maxLength: number;
  input: HTMLElement | null;
  placeholder: HTMLElement | null;
  buttonSend: HTMLButtonElement | null;
  content: string | null | undefined;

  constructor() {
    this.name = "Аноним";
    document.querySelector(".main__name")!.textContent = this.name;
    this.maxLength = 10;
    this.input = document.querySelector(".textarea__input");
    this.content = this.input!.textContent;
    this.placeholder = document.querySelector(".textarea__placeholder");
    this.buttonSend = document.querySelector(".typing__button");

    if (!this.input) {
      return;
    }
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

  makeButtonEnabled() {
    this.buttonSend!.classList.remove("button_disabled");
    this.buttonSend!.classList.add("button_enabled");
    this.buttonSend!.disabled = false;
  }

  makeButtonDisabled() {
    this.buttonSend!.classList.add("button_disabled");
    this.buttonSend!.classList.remove("button_enabled");
    this.buttonSend!.disabled = true;
  }

  createComment() {
    let comment: any = new CommentModule();

    if (this.content?.length == 0) return;
    let tred = document.createElement("article");
    tred.className = "tred";
    tred.innerHTML = `
    <div class="tred__comment comment" replied = "false" favorite = "false" rank = "${comment.rank}" freePoints ="1" rankStatus="none">
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
                  <span class="actions__button__favorite">В избранное</span>
                  <div class="actions__rating rating">
                    <button class="rating__button rating__button_decrease">-</button>
                    <span class="rating__number">${comment.rank}</span>
                    <button class="rating__button rating__button_increase"></button>
                  </div>
                </div>
              </div>
    </div>`;

    document.querySelector(".comments")!.append(tred);

    tred.scrollIntoView();
    allComm.push(comment);
    console.log(allComm);
  }

  cleanTextArea = () => {
    this.input!.innerText = "";
    this.content = "";

    this.placeholder!.style.display = "inline";
    document.querySelector(".main__symbols_empty")!.classList.remove("invisible");
    document.querySelector(".main__symbols_typing")!.classList.add("invisible");

    this.makeButtonDisabled();
  };
}

let inputModule: any = new MainInputModule();
let allComm = [];

inputModule.input.onfocus = () => {
  inputModule.placeholder!.style.display = "none";
};

inputModule.input.onblur = () => {
  if (inputModule.content.length == 0) {
    inputModule.makeButtonDisabled();
    inputModule.placeholder!.style.display = "inline";
    document.querySelector(".main__symbols_empty")!.classList.remove("invisible");
    document.querySelector(".main__symbols_typing")!.classList.add("invisible");
  }
  if (inputModule.content.length > inputModule.maxLength) {
    inputModule.makeButtonDisabled();
  }
};

inputModule.input.addEventListener("input", (e: any) => {
  document.querySelector(".main__symbols_empty")!.classList.add("invisible");
  document.querySelector(".main__symbols_typing")!.classList.remove("invisible");

  if (inputModule.content.length + 1 > inputModule.maxLength && e.inputType == "insertText") {
    inputModule.input.textContent = inputModule.content.substring(0, inputModule.maxLength);

    inputModule.input.focus();
    inputModule.placeCaretAtEnd(document.querySelector(".textarea__input"));
  }

  inputModule.content = inputModule.input.textContent;
  document.querySelector(".symbols__quantity")!.innerHTML = inputModule.content.length;

  if (inputModule.content.length > 0 && inputModule.content.length < inputModule.maxLength) {
    inputModule.makeButtonEnabled();
  }
});

inputModule.input.addEventListener("paste", (event: any) => {
  const clipboardData = event.clipboardData || window.clipboardData;

  if (clipboardData) {
    if (clipboardData.types && clipboardData.types.includes("Files")) {
      event.preventDefault();
    }
  }
});

inputModule.input.addEventListener("paste", (e: any) => {
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

export default MainInputModule;
