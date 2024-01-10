"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplyButtonModule {
    constructor() {
        this.buttonReply = document.querySelector(".reply-button");
    }
    makeEnabled() {
        this.buttonReply.classList.remove("button_disabled");
        this.buttonReply.classList.add("button_enabled");
        this.buttonReply.disabled = false;
    }
    makeDisabled() {
        this.buttonReply.classList.add("button_disabled");
        this.buttonReply.classList.remove("button_enabled");
        this.buttonReply.disabled = true;
    }
}
exports.default = ReplyButtonModule;
