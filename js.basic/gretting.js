const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
// document.querySelector은 원하는 셀렉터의 첫번째 것을 가져온다.
// querySlelectorall은 클래스명에 따른 엘리먼트들을 가져온다.

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function SaveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    SaveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS)
    if(currentUser === null){
        askForName();
    }
    else{paintGreeting(currentUser);}
    }

function init(){
    loadName();
}
init();