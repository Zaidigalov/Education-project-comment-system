class MainInputModule {
  name: string;
  maxLength: number;
  input: HTMLElement | null;
  placeholder: HTMLElement | null;
  buttonSend: HTMLButtonElement | null;
  content: string | null | undefined;

  constructor() {
    this.name = "Аноним";
    this.maxLength = 1000;
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



export default MainInputModule;
