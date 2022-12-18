const form = document.querySelector(".js-form");
const input = document.querySelector(".js-form input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveUserName(user) {
  localStorage.setItem(USER_LS, user);
}

function handleSubmit(event) {
  event.preventDefault();
  const userName = input.value;
  
  saveUserName(userName);
  paintGreeting(userName);
} 

function askForName() {
  form.classList.add(SHOWING_CN);
  addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);

  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello! ${text}`;
}


function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
    askForName();
  } else {
    //유저 존재
    paintGreeting(currentUser);
  }
}


loadName();