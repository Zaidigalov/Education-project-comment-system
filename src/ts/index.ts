import MainInputModule from "./input";
import CommentModule from "./comment";
import ReplyInputModule from "./reply_input";
import ReplyModule from "./reply";

class Main {
  inputModule: any;
  commentModule: any;
  commentArea: HTMLElement;
  content: any;
  comment: any;
  allComments: HTMLElement[];
  allCommentsObj: Map<number, object>;
  favoriteCommentsObj: Set<object>;
  quantityOfComments: number;
  buttonShowFavorite: HTMLButtonElement;
  buttonSort: HTMLButtonElement;

  constructor() {
    this.commentArea = document.querySelector(".comments")!;
    this.inputModule = new MainInputModule();
    this.allComments = Array.from(document.querySelectorAll(".comment"));
    this.allCommentsObj = new Map();
    this.favoriteCommentsObj = new Set();
    this.quantityOfComments = this.allComments.length;
    document.querySelector(".info__quantity")!.innerText = this.quantityOfComments;
    this.buttonShowFavorite = document.querySelector(".comments__header__favourites")!;
    this.buttonSort = document.querySelector(".sort__button")!;
  }

  updateElements = () => {
    this.allComments = Array.from(document.querySelectorAll(".comment"))
    this.quantityOfComments = this.allComments.length;
    document.querySelector(".info__quantity")!.innerText = this.quantityOfComments;
    
  };

  makeFavorite(makeFavoriteButton: HTMLElement) {
    if (makeFavoriteButton.classList[0] !== "actions__button__favorite") return;

    let comment: HTMLElement = makeFavoriteButton.parentNode!.parentNode!.parentNode;
    let objectId: number = +comment["id"];   
    
    let favoriteObj:object|undefined = this.allCommentsObj.get(objectId);

    makeFavoriteButton.classList.toggle("actions__button__favorite_pressed");

    if(favoriteObj.isFavorite == false){
      favoriteObj.isFavorite = true;
      this.favoriteCommentsObj.add(favoriteObj)
      makeFavoriteButton.textContent = "В избранном";  
      comment.setAttribute("favorite", "true") 
      
    } 
    else if(favoriteObj.isFavorite == true){
      favoriteObj.isFavorite = false;
      this.favoriteCommentsObj.delete(favoriteObj)
      makeFavoriteButton.textContent = "В избранное";
      comment.setAttribute("favorite", "false")
     
    }

    
    this.saveChange(objectId, favoriteObj)
  
  }

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

    
    this.allComments = Array.from(document.querySelectorAll(".comment"))
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

  changeRank = (rankButton: HTMLButtonElement)=> {
    let parent: HTMLElement = rankButton.parentNode.parentNode.parentNode.parentNode;
    let id:number = Number(parent["id"].split("-")[0])
    let parentObj: object = this.allCommentsObj.get(id)

    
    if (rankButton.classList[1] == "rating__button_decrease") {
      if (parentObj.rankStatus == "none") {
        parentObj.rank -= parentObj.freePoints;
        parentObj.rankStatus = "decreased"
        
      }
      if (parentObj.rankStatus == "increased") {
        parentObj.rank -= parentObj.freePoints;
        parentObj.rankStatus = "none"
      }
      rankButton.nextSibling?.nextSibling?.textContent = parentObj.rank;
    }

    if (rankButton.classList[1] == "rating__button_increase") {
      if (parentObj.rankStatus == "none") {
        parentObj.rank += parentObj.freePoints;
        parentObj.rankStatus = "increased"
      }
      if (parentObj.rankStatus == "decreased") {
        parentObj.rank += parentObj.freePoints;
        parentObj.rankStatus = "none"
      }
      rankButton.previousSibling?.previousSibling?.textContent = parentObj.rank;
    }
    
    if (parentObj.rank < 0) {
      rankButton.nextSibling?.nextSibling.style.color = "#fa0000ff";
    }
    if (parentObj.rank == 0) {
      if (rankButton.previousSibling?.previousSibling) {
        rankButton.previousSibling?.previousSibling.style.color = "#999999ff";
      } else {
        rankButton.nextSibling?.nextSibling.style.color = "#999999ff";
      }
    }
    if (parentObj.rank > 0) {
      rankButton.previousSibling?.previousSibling.style.color = "#8ac44bff";
    }

    this.saveChange(id, parentObj)
  }

  createComment = () =>{
    let id:number = this.allCommentsObj.size
    let comment = new CommentModule(id)

    this.allCommentsObj.set(id, comment);

    this.saveComments(id, comment);
  }

  createReply(button: HTMLButtonElement) {
    let replyModule: any = new ReplyModule();

    let id:number = Number(button["id"].split("-")[0]);
    let parentObj: object = this.allCommentsObj.get(id);
    replyModule.id = parentObj.id+0.1

    this.allCommentsObj.set(replyModule.id, replyModule )

    parentObj.replyObj = replyModule;
    parentObj.isReplied = true;

    this.showReply(parentObj, replyModule)

    this.saveComments(replyModule.id, replyModule)
    this.saveChange(id, parentObj)
  }

  showComments = (comment: any) =>{
      if(comment.commentText == undefined) return

      let tred = document.createElement("article");
      tred.className = "tred";

      let isFavorite : string = "В избранное";
      let clasForFavorite:string = "";
      
      if (comment.isFavorite == true){
        isFavorite = "В избранном"
        clasForFavorite = "actions__button__favorite_pressed"
      }

      let rankColor: string;
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
    <div class="tred__reply"></div>`
    ;

      document.querySelector(".comments")!.append(tred);

      
      comment.appropriateHTMLObject = document.getElementById(`${comment.id}`)

      if(comment.replyObj && !this.buttonShowFavorite.classList.contains("show-favorites")){
        this.showReply(comment, comment.replyObj)
      }
      

      tred.scrollIntoView();
    
  }

  showReply = (parent:object, replyObj:object) =>{

    let reply = document.createElement("div");
    reply.className = "reply__answer comment";

    parent.appropriateHTMLObject.nextSibling.nextSibling.append(reply)

    reply.setAttribute("id", `${replyObj.id}`)
    reply.setAttribute("favorite", `${replyObj.isFavorite}`)

    let isFavorite : string = "В избранное";
    let clasForFavorite:string = "";
      
      if (replyObj.isFavorite == true){
        isFavorite = "В избранном";
        clasForFavorite = "actions__button__favorite_pressed";
      }

      let rankColor: string;
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

    
  }

  sortComments = (field: string) =>{
    let arrayComments:object[] = [];
    
    this.allCommentsObj.forEach((item)=>{
      arrayComments.push(item)
    })

    
    document.querySelectorAll(".tred").forEach((item)=>{
      item.remove()
    })

    if(field == "По дате"){
      arrayComments.sort(byDate("fullDate"))
    }
    else if(field == "По количеству оценок"){
      arrayComments.sort(byQuantityOfRatings("absRank"))
    }
    else if(field == "По актуальности"){
      arrayComments.sort(byRelevance("fullDate"))
    }
    else if(field == "По количеству ответов"){
      arrayComments.sort(byQuantityOfReplies("isReplied"))
    }    
    
    arrayComments.forEach((item)=>{
      this.showComments(item)
    })

    function byDate  (field: string) {
      return (a: number, b: number) => a[field] > b[field] ? 1 : -1;
    }
     function byQuantityOfRatings (field: string) {
      return (a: number, b: number) => a[field] < b[field] ? 1 : -1;
    }
     function byRelevance  (field: string) {
      return (a: number, b: number) => a[field] < b[field] ? 1 : -1;
    }
     function byQuantityOfReplies (field: string) {
      return (a: number, b: number) => a[field] < b[field] ? 1 : -1;
    }


  }

  loadComments = () =>{
    if(localStorage.length == 0) return

    for(let i: number = 0; i<localStorage.length; i++) {
      let comment = JSON.parse(`${localStorage.getItem(String(i))}`)

      if(comment != null){
        this.allCommentsObj.set(i, comment);
      }      
    }

    for(let i: number = 0.1; i<localStorage.length; i++) {
      let reply = JSON.parse(`${localStorage.getItem(String(i))}`)

      if(reply != null){
        this.allCommentsObj.get(reply.id-0.1).replyObj = reply;
        this.allCommentsObj.set(i, reply);
      }
    }

    this.allCommentsObj.forEach((item)=>{
      this.showComments(item)
    })
  }

  saveComments = (id:number, comment:object) =>{
    localStorage.setItem(String(id), JSON.stringify(comment))
   
  }

  saveChange = (id:number, comment:object)=>{
    localStorage.removeItem(String(id))
    localStorage.setItem(String(id), JSON.stringify(comment))
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
  if(e.target.classList.contains("rating__button")){
    main.changeRank(e.target);
  }  
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
      main.sortComments(item.textContent!);      
    });    
  });  
});

main.inputModule.buttonSend.addEventListener("click",()=>{
  main.createComment();
  main.inputModule.cleanTextArea();
  main.showComments(main.allCommentsObj.get(main.quantityOfComments))
  main.updateElements()
} );

document.addEventListener("click", (e: MouseEvent) => {
 main.makeFavorite(e.target);
});

 document.addEventListener("click", (e) => {
  if (e.target == null || !e.target.classList.contains("actions__button__reply")) return;
  

  let id:number = Number(e.target["id"].split("-")[0]);
  let parentObj: object = main.allCommentsObj.get(id);
  let replyBlock: HTMLElement = parentObj.appropriateHTMLObject.nextSibling?.nextSibling;

  
  if (parentObj.isReplied == true) return
  if (document.querySelector(".reply__typing")) {
    document.querySelector(".reply__typing")?.remove();
    return;
  }
  

  

  let replyInputModule: any = new ReplyInputModule();
  replyBlock.innerHTML = replyInputModule.replyTyping;

 
  replyBlock.scrollIntoView();
  

  let replyInputBox: HTMLElement = document.querySelector(".reply__typing")!;
  let replyInput: HTMLElement = document.querySelector(".reply-textarea")!;
  let replyPlaceholder: HTMLElement = document.querySelector(".reply-placeholder")!;
  let replyContent: string = replyInput.textContent!;
  let replyButton: HTMLButtonElement = document.querySelector(".reply-button")!;
  replyButton.setAttribute("id", `${parentObj.id}-reply-btn`)

  

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
    main.createReply(replyButton);
    replyInputBox.remove();
  }); 
}); 

main.loadComments()