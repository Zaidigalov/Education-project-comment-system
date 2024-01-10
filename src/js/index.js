"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
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
        this.commentArea = document.querySelector(".comments");
        this.inputModule = new input_1.default();
        this.allComments = Array.from(document.querySelectorAll(".comment"));
        this.quantityOfComments = this.allComments.length;
        document.querySelector(".info__quantity").innerText = this.quantityOfComments;
        this.buttonShowFavorite = document.querySelector(".comments__header__favourites");
        this.buttonSort = document.querySelector(".sort__button");
    }
    changeRank(rankButton) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (rankButton.classList[0] !== "rating__button")
            return;
        let commentRank = (_b = (_a = rankButton.nextSibling) === null || _a === void 0 ? void 0 : _a.nextSibling) === null || _b === void 0 ? void 0 : _b.textContent;
        if (commentRank == undefined)
            commentRank = (_d = (_c = rankButton.previousSibling) === null || _c === void 0 ? void 0 : _c.previousSibling) === null || _d === void 0 ? void 0 : _d.textContent;
        commentRank = Number(commentRank);
        let parent = rankButton.parentNode.parentNode.parentNode.parentNode;
        let freePoints = +parent.getAttribute("freePoints");
        this.rankStatus = parent.getAttribute("rankStatus");
        if (rankButton.classList[1] == "rating__button_decrease") {
            if (this.rankStatus == "none") {
                parent.setAttribute("freePoints", "1");
                freePoints = +parent.getAttribute("freePoints");
                commentRank -= freePoints;
                parent.setAttribute("rankStatus", "decreased");
                this.rankStatus = parent.getAttribute("rankStatus");
            }
            if (this.rankStatus == "increased") {
                parent.setAttribute("freePoints", "1");
                freePoints = +parent.getAttribute("freePoints");
                commentRank -= freePoints;
                parent.setAttribute("rankStatus", "none");
                this.rankStatus = parent.getAttribute("rankStatus");
            }
            if (this.rankStatus == "decreased") {
                parent.setAttribute("freePoints", "0");
                freePoints = +parent.getAttribute("freePoints");
            }
            (_f = (_e = rankButton.nextSibling) === null || _e === void 0 ? void 0 : _e.nextSibling) === null || _f === void 0 ? void 0 : _f.textContent = commentRank;
        }
        if (rankButton.classList[1] == "rating__button_increase") {
            if (this.rankStatus == "none") {
                parent.setAttribute("freePoints", "1");
                freePoints = +parent.getAttribute("freePoints");
                commentRank += freePoints;
                parent.setAttribute("rankStatus", "increased");
                this.rankStatus = parent.getAttribute("rankStatus");
            }
            if (this.rankStatus == "decreased") {
                parent.setAttribute("freePoints", "1");
                freePoints = +parent.getAttribute("freePoints");
                commentRank += freePoints;
                parent.setAttribute("rankStatus", "none");
                this.rankStatus = parent.getAttribute("rankStatus");
            }
            if (this.rankStatus == "increased") {
                parent.setAttribute("freePoints", "0");
                freePoints = +parent.getAttribute("freePoints");
            }
            (_h = (_g = rankButton.previousSibling) === null || _g === void 0 ? void 0 : _g.previousSibling) === null || _h === void 0 ? void 0 : _h.textContent = commentRank;
        }
        parent.setAttribute("rank", `${commentRank}`);
        if (commentRank < 0) {
            (_j = rankButton.nextSibling) === null || _j === void 0 ? void 0 : _j.nextSibling.style.color = "#fa0000ff";
        }
        if (commentRank == 0) {
            if ((_k = rankButton.previousSibling) === null || _k === void 0 ? void 0 : _k.previousSibling) {
                (_l = rankButton.previousSibling) === null || _l === void 0 ? void 0 : _l.previousSibling.style.color = "#999999ff";
            }
            else {
                (_m = rankButton.nextSibling) === null || _m === void 0 ? void 0 : _m.nextSibling.style.color = "#999999ff";
            }
        }
        if (commentRank > 0) {
            (_o = rankButton.previousSibling) === null || _o === void 0 ? void 0 : _o.previousSibling.style.color = "#8ac44bff";
        }
    }
    sortComments() {
        //console.log(this.allComments);
        // console.log(this.allComments.sort());
    }
    byDate(a, b) {
        /* this.allComments.forEach((item) => {
          console.log(item.getAttribute("day"));
          //console.log(item.lastChild?.previousSibling?.firstChild?.nextSibling.lastChild?.previousSibling);
          //console.log(item.lastChild.firstChild?.nextSibling.lastChild?.previousSibling);
        }); */
        a = this.allComments[i].getAttribute("day");
        if (a > b)
            return 1;
        if (a == b)
            return 0;
        if (a < b)
            return -1;
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
    main.changeRank(e.target);
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
        });
    });
});
main.sortComments();
