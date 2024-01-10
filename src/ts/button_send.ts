class ButtonSendModule {
  buttonSend: HTMLButtonElement | null;

  constructor() {
    this.buttonSend = document.querySelector(".typing__button");
  }

  makeEnabled() {
    this.buttonSend!.classList.remove("button_disabled");
    this.buttonSend!.classList.add("button_enabled");
    this.buttonSend!.disabled = false;
  }

  makeDisabled() {
    this.buttonSend!.classList.add("button_disabled");
    this.buttonSend!.classList.remove("button_enabled");
    this.buttonSend!.disabled = true;
  }
}

export default ButtonSendModule;
