"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplyModule {
    constructor() {
        this.name = document.querySelector(".main__name").textContent;
        this.rank = 0;
        this.absRank = Math.abs(this.rank);
        this.rankStatus = "none";
        this.freePoints = 1;
        this.isFavorite = false;
        this.month = new Date().getMonth() + 1;
        if (this.month < 10) {
            this.month = "0" + this.month;
        }
        this.day = new Date().getDate();
        if (this.day < 10) {
            this.day = "0" + this.day;
        }
        this.hours = new Date().getHours();
        if (this.hours < 10) {
            this.hours = "0" + this.hours;
        }
        this.minutes = new Date().getMinutes();
        if (this.minutes < 10) {
            this.minutes = "0" + this.minutes;
        }
        this.date = `${this.day}.${this.month} ${this.hours}:${this.minutes}`;
        this.replyText = document.querySelector(".reply-textarea").textContent;
    }
}
exports.default = ReplyModule;
