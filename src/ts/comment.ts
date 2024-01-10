import ReplyInputModule from "./reply_input";

class CommentModule {
  name: string;
  commentText: string;

  date: string;
  day: number | string;
  month: number | string;
  hours: number | string;
  minutes: number | string;
  rank: number;
  rankStatus: string;
  //freePoints: number;
  /* isReplied: boolean;
  isFavorite: boolean; */

  constructor() {
    this.name = document.querySelector(".main__name")!.textContent!;
    this.rank = 0;
    this.rankStatus = "none";
    //this.freePoints = 1;

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
    /* this.isReplied = false;
    this.isFavorite = false; */
    this.commentText = document.querySelector(".textarea__input")!.textContent!;
  }

  makeFavorite(makeFavoriteButton: HTMLElement) {
    if (makeFavoriteButton.classList[0] !== "actions__button__favorite") return;

    let comment: HTMLElement = makeFavoriteButton.parentNode!.parentNode!.parentNode;

    let favorite = comment.getAttribute("favorite");
    makeFavoriteButton.classList.toggle("actions__button__favorite_pressed");

    if (favorite == "false") {
      comment.setAttribute("favorite", "true");
      makeFavoriteButton.textContent = "В избранном";
    } else if (favorite == "true") {
      comment.setAttribute("favorite", "false");
      makeFavoriteButton.textContent = "В избранное";
    }
  }

  changeRank(rankButton: HTMLButtonElement) {
    if (rankButton.classList[0] !== "rating__button") return;

    let commentRank: string | null | undefined | number = rankButton.nextSibling?.nextSibling?.textContent;
    if (commentRank == undefined) commentRank = rankButton.previousSibling?.previousSibling?.textContent;
    commentRank = Number(commentRank);
    let parent: HTMLElement = rankButton.parentNode.parentNode.parentNode.parentNode;
    let freePoints: number = +parent.getAttribute("freePoints");
    this.rankStatus = parent.getAttribute("rankStatus");
    console.log(freePoints);

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
      rankButton.nextSibling?.nextSibling?.textContent = commentRank;
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
      rankButton.previousSibling?.previousSibling?.textContent = commentRank;
    }

    rankButton.parentNode?.parentNode.parentNode.parentNode.setAttribute("rank", `${commentRank}`);
    console.log(freePoints);
    console.log(this.rankStatus);
  }
}

let commentModule: any = new CommentModule();

document.addEventListener("click", (e: MouseEvent) => {
  commentModule.makeFavorite(e.target);
});

document.addEventListener("click", (e: MouseEvent) => {
  commentModule.changeRank(e.target);
});

document.addEventListener("click", (e) => {
  if (e.target == null || !e.target.classList.contains("actions__button__reply")) return;

  const target: HTMLElement = e.target;
  const tred: HTMLElement = target.parentNode!.parentNode!.parentNode!.parentNode;

  if (document.querySelector(".reply__typing")) {
    document.querySelector(".reply__typing")?.remove();

    return;
  }

  if (tred.childNodes[3]) {
    if (tred.childNodes[3].classList[1] == "reply" || tred.childNodes[2].classList[1] == "reply") {
      return;
    }
  }

  let replyInputModule = new ReplyInputModule();

  tred.append(replyInputModule.replyBlock!);
  replyInputModule.replyBlock!.scrollIntoView();

  let replyInputBox: HTMLElement = document.querySelector(".reply__typing")!;
  let replyInput: HTMLElement = document.querySelector(".reply-textarea")!;
  let replyPlaceholder: HTMLElement = document.querySelector(".reply-placeholder")!;
  let replyContent: string = replyInput.textContent!;
  let replyButton: HTMLButtonElement = document.querySelector(".reply-button")!;

  replyInput.onfocus = () => {
    replyPlaceholder!.style.display = "none";
  };

  replyInput.onblur = () => {
    if (replyContent.length == 0) {
      replyInputModule.makeButtonDisabled(replyButton);
      replyPlaceholder.style.display = "inline";
      document.querySelector(".reply-symbols_empty")!.classList.remove("invisible");
      document.querySelector(".reply-symbols_typing")!.classList.add("invisible");
    }
    if (replyContent.length > replyInputModule.maxLength) {
      replyInputModule.makeButtonDisabled(replyButton);
    }
  };

  replyInput.addEventListener("input", (e: any) => {
    document.querySelector(".reply-symbols_empty")!.classList.add("invisible");
    document.querySelector(".reply-symbols_typing")!.classList.remove("invisible");

    if (replyContent.length + 1 > replyInputModule.maxLength && e.inputType == "insertText") {
      replyInput.textContent = replyContent.substring(0, replyInputModule.maxLength);

      replyInput.focus();
      replyInputModule.placeCaretAtEnd(document.querySelector(".reply-textarea"));
    }

    replyContent = replyInput.textContent!;
    document.querySelector(".reply-symbols__quantity")!.innerHTML = replyContent.length;

    if (replyContent.length > 0 && replyContent.length < replyInputModule.maxLength) {
      replyInputModule.makeButtonEnabled(replyButton);
    }
  });

  replyInput.addEventListener("paste", (event: any) => {
    const clipboardData = event.clipboardData || window.clipboardData;

    if (clipboardData) {
      if (clipboardData.types && clipboardData.types.includes("Files")) {
        event.preventDefault();
      }
    }
  });

  replyInput.addEventListener("paste", (e: any) => {
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
    replyInputModule.createReply(replyButton);
    replyInputBox.remove();
  });
});

export default CommentModule;
