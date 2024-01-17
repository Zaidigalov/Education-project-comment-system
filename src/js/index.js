"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const comment_1 = __importDefault(require("./comment"));
const reply_input_1 = __importDefault(require("./reply_input"));
const reply_1 = __importDefault(require("./reply"));
class Main {
    constructor() {
        this.updateElements = () => {
            this.allComments = Array.from(document.querySelectorAll(".comment"));
            this.quantityOfComments = this.allComments.length;
            document.querySelector(".info__quantity").innerText = this.quantityOfComments;
        };
        this.showFavorite = () => {
            this.buttonShowFavorite.classList.toggle("show-favorites");
            let answers = Array.from(document.querySelectorAll(".reply__answer"));
            if (this.buttonShowFavorite.classList.contains("show-favorites")) {
                answers.forEach((item) => {
                    item.style.marginLeft = "0";
                });
            }
            else {
                answers.forEach((item) => {
                    item.style.marginLeft = "91px";
                });
            }
            this.allComments = Array.from(document.querySelectorAll(".comment"));
            this.allComments.forEach((item) => {
                if (item.getAttribute("favorite") == "false") {
                    if (this.buttonShowFavorite.classList.contains("show-favorites")) {
                        item.style.display = "none";
                    }
                    else {
                        item.style.display = "flex";
                    }
                }
            });
        };
        this.changeRank = (rankButton) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            let parent = rankButton.parentNode.parentNode.parentNode.parentNode;
            let id = Number(parent["id"].split("-")[0]);
            let parentObj = this.allCommentsObj.get(id);
            if (rankButton.classList[1] == "rating__button_decrease") {
                if (parentObj.rankStatus == "none") {
                    parentObj.rank -= parentObj.freePoints;
                    parentObj.rankStatus = "decreased";
                }
                if (parentObj.rankStatus == "increased") {
                    parentObj.rank -= parentObj.freePoints;
                    parentObj.rankStatus = "none";
                }
                (_b = (_a = rankButton.nextSibling) === null || _a === void 0 ? void 0 : _a.nextSibling) === null || _b === void 0 ? void 0 : _b.textContent = parentObj.rank;
            }
            if (rankButton.classList[1] == "rating__button_increase") {
                if (parentObj.rankStatus == "none") {
                    parentObj.rank += parentObj.freePoints;
                    parentObj.rankStatus = "increased";
                }
                if (parentObj.rankStatus == "decreased") {
                    parentObj.rank += parentObj.freePoints;
                    parentObj.rankStatus = "none";
                }
                (_d = (_c = rankButton.previousSibling) === null || _c === void 0 ? void 0 : _c.previousSibling) === null || _d === void 0 ? void 0 : _d.textContent = parentObj.rank;
            }
            if (parentObj.rank < 0) {
                (_e = rankButton.nextSibling) === null || _e === void 0 ? void 0 : _e.nextSibling.style.color = "#fa0000ff";
            }
            if (parentObj.rank == 0) {
                if ((_f = rankButton.previousSibling) === null || _f === void 0 ? void 0 : _f.previousSibling) {
                    (_g = rankButton.previousSibling) === null || _g === void 0 ? void 0 : _g.previousSibling.style.color = "#999999ff";
                }
                else {
                    (_h = rankButton.nextSibling) === null || _h === void 0 ? void 0 : _h.nextSibling.style.color = "#999999ff";
                }
            }
            if (parentObj.rank > 0) {
                (_j = rankButton.previousSibling) === null || _j === void 0 ? void 0 : _j.previousSibling.style.color = "#8ac44bff";
            }
            this.saveChange(id, parentObj);
        };
        this.createComment = () => {
            let id = this.allCommentsObj.size;
            let comment = new comment_1.default(id);
            this.allCommentsObj.set(id, comment);
            this.saveComments(id, comment);
        };
        this.showComments = (comment) => {
            if (comment.commentText == undefined)
                return;
            let tred = document.createElement("article");
            tred.className = "tred";
            let isFavorite = "В избранное";
            let clasForFavorite = "";
            if (comment.isFavorite == true) {
                isFavorite = "В избранном";
                clasForFavorite = "actions__button__favorite_pressed";
            }
            let rankColor;
            if (comment.rank < 0) {
                rankColor = "#fa0000ff";
            }
            if (comment.rank == 0) {
                rankColor = "#999999ff";
            }
            if (comment.rank > 0) {
                rankColor = "#8ac44bff";
            }
            tred.innerHTML = `
    <div class="tred__comment comment" id ="${comment.id}" replied = "${comment.isReplied}" favorite = "${comment.isFavorite}" rank = "${comment.rank}" freePoints ="${comment.freePoints}" rankStatus="${comment.rankStatus}">
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
                  <span class="actions__button__reply" id ="${comment.id}-btn" >Ответить</span>
                  <span class="actions__button__favorite ${clasForFavorite}">${isFavorite}</span>
                  <div class="actions__rating rating">
                    <button class="rating__button rating__button_decrease">-</button>
                    <span class="rating__number" style=color:${rankColor}>${comment.rank}</span>
                    <button class="rating__button rating__button_increase"></button>
                  </div>
                </div>
              </div>
    </div>
    <div class="tred__reply"></div>`;
            document.querySelector(".comments").append(tred);
            comment.appropriateHTMLObject = document.getElementById(`${comment.id}`);
            if (comment.replyObj && !this.buttonShowFavorite.classList.contains("show-favorites")) {
                this.showReply(comment, comment.replyObj);
            }
            tred.scrollIntoView();
        };
        this.showReply = (parent, replyObj) => {
            let reply = document.createElement("div");
            reply.className = "reply__answer comment";
            parent.appropriateHTMLObject.nextSibling.nextSibling.append(reply);
            reply.setAttribute("id", `${replyObj.id}`);
            reply.setAttribute("favorite", `${replyObj.isFavorite}`);
            let isFavorite = "В избранное";
            let clasForFavorite = "";
            if (replyObj.isFavorite == true) {
                isFavorite = "В избранном";
                clasForFavorite = "actions__button__favorite_pressed";
            }
            let rankColor;
            if (replyObj.rank < 0) {
                rankColor = "#fa0000ff";
            }
            if (replyObj.rank == 0) {
                rankColor = "#999999ff";
            }
            if (replyObj.rank > 0) {
                rankColor = "#8ac44bff";
            }
            reply.innerHTML = `
    <div class="comment__avatar avatar">
                  <img class="avatar__image" src="https://loremflickr.com/61/61" alt="avatar" />
                </div>
                <div class="comment__main">
                  <div class="comment-main__info">
                    <p class="comment-main__info__name">${this.inputModule.name}</p>
                    <p class="comment-main__info__parent-name">${parent.name}</p>
                    <p class="comment-main__info__time">${replyObj.date}</p>
                  </div>
                  <div class="main__text">
                  ${replyObj.replyText}
                  </div>
                  <div class="main__actions actions">
                    <span class="actions__button__favorite reply__actions__button__favorite ${clasForFavorite}">${isFavorite}</span>
                    <div class="actions__rating rating">
                      <button class="rating__button rating__button_decrease">-</button>
                      <span class="rating__number" style=color:${rankColor}>${replyObj.rank}</span>
                      <button class="rating__button rating__button_increase"></button>
                    </div>
                  </div>
                </div>`;
            reply.scrollIntoView();
            replyObj.replyHTML = reply;
        };
        this.sortComments = (field) => {
            let arrayComments = [];
            this.allCommentsObj.forEach((item) => {
                arrayComments.push(item);
            });
            document.querySelectorAll(".tred").forEach((item) => {
                item.remove();
            });
            if (field == "По дате") {
                arrayComments.sort(byDate("fullDate"));
            }
            else if (field == "По количеству оценок") {
                arrayComments.sort(byQuantityOfRatings("absRank"));
            }
            else if (field == "По актуальности") {
                arrayComments.sort(byRelevance("fullDate"));
            }
            else if (field == "По количеству ответов") {
                arrayComments.sort(byQuantityOfReplies("isReplied"));
            }
            arrayComments.forEach((item) => {
                this.showComments(item);
            });
            function byDate(field) {
                return (a, b) => a[field] > b[field] ? 1 : -1;
            }
            function byQuantityOfRatings(field) {
                return (a, b) => a[field] < b[field] ? 1 : -1;
            }
            function byRelevance(field) {
                return (a, b) => a[field] < b[field] ? 1 : -1;
            }
            function byQuantityOfReplies(field) {
                return (a, b) => a[field] < b[field] ? 1 : -1;
            }
        };
        this.loadComments = () => {
            if (localStorage.length == 0)
                return;
            for (let i = 0; i < localStorage.length; i++) {
                let comment = JSON.parse(`${localStorage.getItem(String(i))}`);
                if (comment != null) {
                    this.allCommentsObj.set(i, comment);
                }
            }
            for (let i = 0.1; i < localStorage.length; i++) {
                let reply = JSON.parse(`${localStorage.getItem(String(i))}`);
                if (reply != null) {
                    this.allCommentsObj.get(reply.id - 0.1).replyObj = reply;
                    this.allCommentsObj.set(i, reply);
                }
            }
            this.allCommentsObj.forEach((item) => {
                this.showComments(item);
            });
        };
        this.saveComments = (id, comment) => {
            localStorage.setItem(String(id), JSON.stringify(comment));
        };
        this.saveChange = (id, comment) => {
            localStorage.removeItem(String(id));
            localStorage.setItem(String(id), JSON.stringify(comment));
        };
        this.commentArea = document.querySelector(".comments");
        this.inputModule = new input_1.default();
        this.allComments = Array.from(document.querySelectorAll(".comment"));
        this.allCommentsObj = new Map();
        this.favoriteCommentsObj = new Set();
        this.quantityOfComments = this.allComments.length;
        document.querySelector(".info__quantity").innerText = this.quantityOfComments;
        this.buttonShowFavorite = document.querySelector(".comments__header__favourites");
        this.buttonSort = document.querySelector(".sort__button");
    }
    makeFavorite(makeFavoriteButton) {
        if (makeFavoriteButton.classList[0] !== "actions__button__favorite")
            return;
        let comment = makeFavoriteButton.parentNode.parentNode.parentNode;
        let objectId = +comment["id"];
        let favoriteObj = this.allCommentsObj.get(objectId);
        makeFavoriteButton.classList.toggle("actions__button__favorite_pressed");
        if (favoriteObj.isFavorite == false) {
            favoriteObj.isFavorite = true;
            this.favoriteCommentsObj.add(favoriteObj);
            makeFavoriteButton.textContent = "В избранном";
            comment.setAttribute("favorite", "true");
        }
        else if (favoriteObj.isFavorite == true) {
            favoriteObj.isFavorite = false;
            this.favoriteCommentsObj.delete(favoriteObj);
            makeFavoriteButton.textContent = "В избранное";
            comment.setAttribute("favorite", "false");
        }
        this.saveChange(objectId, favoriteObj);
    }
    createReply(button) {
        let replyModule = new reply_1.default();
        let id = Number(button["id"].split("-")[0]);
        let parentObj = this.allCommentsObj.get(id);
        replyModule.id = parentObj.id + 0.1;
        this.allCommentsObj.set(replyModule.id, replyModule);
        parentObj.replyObj = replyModule;
        parentObj.isReplied = true;
        this.showReply(parentObj, replyModule);
        this.saveComments(replyModule.id, replyModule);
        this.saveChange(id, parentObj);
    }
}
let main = new Main();
document.execCommand("insertBrOnReturn");
let observer = new MutationObserver((mutationRecords) => {
    if (mutationRecords[0].addedNodes[0]) {
        if (mutationRecords[0].addedNodes[0].className == "tred" || mutationRecords[0].addedNodes[0].className == "reply__answer comment") {
            main.updateElements();
        }
    }
});
observer.observe(main.commentArea, {
    childList: true,
    subtree: true,
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("rating__button")) {
        main.changeRank(e.target);
    }
});
main.buttonShowFavorite.addEventListener("click", main.showFavorite);
main.buttonSort.addEventListener("click", () => {
    let sortList = document.querySelector(".sort__list");
    let listItem = Array.from(document.querySelectorAll(".sort-list__item"));
    sortList.classList.toggle("invisible");
    listItem.forEach((item) => {
        item.addEventListener("click", () => {
            main.buttonSort.textContent = item.textContent;
            sortList.classList.add("invisible");
            main.sortComments(item.textContent);
        });
    });
});
main.inputModule.buttonSend.addEventListener("click", () => {
    main.createComment();
    main.inputModule.cleanTextArea();
    main.showComments(main.allCommentsObj.get(main.quantityOfComments));
    main.updateElements();
});
document.addEventListener("click", (e) => {
    main.makeFavorite(e.target);
});
document.addEventListener("click", (e) => {
    var _a, _b;
    if (e.target == null || !e.target.classList.contains("actions__button__reply"))
        return;
    let id = Number(e.target["id"].split("-")[0]);
    let parentObj = main.allCommentsObj.get(id);
    let replyBlock = (_a = parentObj.appropriateHTMLObject.nextSibling) === null || _a === void 0 ? void 0 : _a.nextSibling;
    if (parentObj.isReplied == true)
        return;
    if (document.querySelector(".reply__typing")) {
        (_b = document.querySelector(".reply__typing")) === null || _b === void 0 ? void 0 : _b.remove();
        return;
    }
    let replyInputModule = new reply_input_1.default();
    replyBlock.innerHTML = replyInputModule.replyTyping;
    replyBlock.scrollIntoView();
    let replyInputBox = document.querySelector(".reply__typing");
    let replyInput = document.querySelector(".reply-textarea");
    let replyPlaceholder = document.querySelector(".reply-placeholder");
    let replyContent = replyInput.textContent;
    let replyButton = document.querySelector(".reply-button");
    replyButton.setAttribute("id", `${parentObj.id}-reply-btn`);
    replyInput.onfocus = () => {
        replyPlaceholder.style.display = "none";
    };
    replyInput.onblur = () => {
        if (replyContent.length == 0) {
            replyInputModule.makeButtonDisabled(replyButton);
            replyPlaceholder.style.display = "inline";
            document.querySelector(".reply-symbols_empty").classList.remove("invisible");
            document.querySelector(".reply-symbols_typing").classList.add("invisible");
        }
        if (replyContent.length > replyInputModule.maxLength) {
            replyInputModule.makeButtonDisabled(replyButton);
        }
    };
    replyInput.addEventListener("input", (e) => {
        document.querySelector(".reply-symbols_empty").classList.add("invisible");
        document.querySelector(".reply-symbols_typing").classList.remove("invisible");
        if (replyContent.length + 1 > replyInputModule.maxLength && e.inputType == "insertText") {
            replyInput.textContent = replyContent.substring(0, replyInputModule.maxLength);
            replyInput.focus();
            replyInputModule.placeCaretAtEnd(document.querySelector(".reply-textarea"));
        }
        replyContent = replyInput.textContent;
        document.querySelector(".reply-symbols__quantity").innerHTML = replyContent.length;
        if (replyContent.length > 0 && replyContent.length < replyInputModule.maxLength) {
            replyInputModule.makeButtonEnabled(replyButton);
        }
    });
    replyInput.addEventListener("paste", (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        if (clipboardData) {
            if (clipboardData.types && clipboardData.types.includes("Files")) {
                event.preventDefault();
            }
        }
    });
    replyInput.addEventListener("paste", (e) => {
        e.preventDefault();
        let text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    });
    replyInput.addEventListener("keydown", () => {
        setTimeout(checkIsInputEmpty, 1);
    });
    function checkIsInputEmpty() {
        if (replyContent.length == 0 || replyContent.length > replyInputModule.maxLength) {
            replyInputModule.makeButtonDisabled(replyButton);
        }
    }
    replyButton.addEventListener("click", () => {
        main.createReply(replyButton);
        replyInputBox.remove();
    });
});
main.loadComments();
