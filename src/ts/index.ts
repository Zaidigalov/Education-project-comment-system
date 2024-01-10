import MainInputModule from "./input";

class Main {
  inputModule: any;
  commentArea: HTMLElement;
  content: any;
  comment: any;
  allComments: HTMLElement[];
  quantityOfComments: number;
  buttonShowFavorite: HTMLButtonElement;
  buttonSort: HTMLButtonElement;

  constructor() {
    this.commentArea = document.querySelector(".comments")!;
    this.inputModule = new MainInputModule();
    this.allComments = Array.from(document.querySelectorAll(".comment"));
    this.quantityOfComments = this.allComments.length;
    document.querySelector(".info__quantity")!.innerText = this.quantityOfComments;
    this.buttonShowFavorite = document.querySelector(".comments__header__favourites")!;
    this.buttonSort = document.querySelector(".sort__button")!;
  }

  updateElements = () => {
    this.allComments = Array.from(document.querySelectorAll(".comment"));
    this.quantityOfComments = this.allComments.length;
    document.querySelector(".info__quantity")!.innerText = this.quantityOfComments;
  };

  showFavorite = () => {
    this.buttonShowFavorite.classList.toggle("show-favorites");
    let answers: HTMLElement[] = Array.from(document.querySelectorAll(".reply__answer"));

    if (this.buttonShowFavorite.classList.contains("show-favorites")) {
      answers.forEach((item) => {
        item.style.marginLeft = "0";
      });
    } else {
      answers.forEach((item) => {
        item.style.marginLeft = "91px";
      });
    }

    this.allComments.forEach((item) => {
      if (item.getAttribute("favorite") == "false") {
        if (this.buttonShowFavorite.classList.contains("show-favorites")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
      }
    });
  };

  changeRank(rankButton: HTMLButtonElement) {
    if (rankButton.classList[0] !== "rating__button") return;

    let commentRank: string | null | undefined | number = rankButton.nextSibling?.nextSibling?.textContent;
    if (commentRank == undefined) commentRank = rankButton.previousSibling?.previousSibling?.textContent;
    commentRank = Number(commentRank);

    let parent: HTMLElement = rankButton.parentNode.parentNode.parentNode.parentNode;
    let freePoints: number = +parent.getAttribute("freePoints");
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

    parent.setAttribute("rank", `${commentRank}`);

    if (commentRank < 0) {
      rankButton.nextSibling?.nextSibling.style.color = "#fa0000ff";
    }
    if (commentRank == 0) {
      if (rankButton.previousSibling?.previousSibling) {
        rankButton.previousSibling?.previousSibling.style.color = "#999999ff";
      } else {
        rankButton.nextSibling?.nextSibling.style.color = "#999999ff";
      }
    }
    if (commentRank > 0) {
      rankButton.previousSibling?.previousSibling.style.color = "#8ac44bff";
    }
  }

  sortComments() {
    //console.log(this.allComments);
    // console.log(this.allComments.sort());
  }

  byDate(a: number, b: number) {
    /* this.allComments.forEach((item) => {
      console.log(item.getAttribute("day"));
      //console.log(item.lastChild?.previousSibling?.firstChild?.nextSibling.lastChild?.previousSibling);
      //console.log(item.lastChild.firstChild?.nextSibling.lastChild?.previousSibling);
    }); */
    a = this.allComments[i].getAttribute("day");
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
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

document.addEventListener("click", (e: MouseEvent) => {
  main.changeRank(e.target);
});

main.buttonShowFavorite.addEventListener("click", main.showFavorite);

main.buttonSort.addEventListener("click", () => {
  let sortList: HTMLUListElement = document.querySelector(".sort__list")!;
  let listItem: HTMLLIElement[] = Array.from(document.querySelectorAll(".sort-list__item")!);

  sortList.classList.toggle("invisible");
  listItem.forEach((item) => {
    item.addEventListener("click", () => {
      main.buttonSort.textContent = item.textContent;
      sortList.classList.add("invisible");
    });
  });
});

main.sortComments();
