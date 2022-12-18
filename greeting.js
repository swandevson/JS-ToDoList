const form = document.querySelector(".js-form");  // 이름입력 form 태그
const input = document.querySelector(".js-form input"); // 이름입력 submit 태그
const greeting = document.querySelector(".js-greeting");  // 입력된 이름 출력 태그

const USER_LS = "currentUser";  // 유저명 변수
const SHOWING_CN = "showing"; // 클래스를 통해 show/hide 여부 결정

/* 이름 저장 */
function saveName(text) {
  localStorage.setItem(USER_LS, text);  // curretnUser 키값에 입력한 이름 저장
}

/* 이름 입력 부분의 submit 핸들링 */
function handleSubmit(event) {
  event.preventDefault(); // 제출 후, submit 태그 새로고침 방지
  
  const userName = input.value; // 입력된 값을 저장
  saveName(userName); // 이름 저장

  paintGreeting(userName);  // 저장된 이름 출력
}

/* 저장된 이름이 없을 경우 이름 입력 */
function askForName() {
  form.classList.add(SHOWING_CN); // input 태그가 보이도록 클래스 추가
  form.addEventListener("submit", handleSubmit);  // 이름 입력
}

/* 저장된 이름이 있을 경우 이름 출력 */
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);  // input 태그가 보이지 않도록 클래스 삭제

  greeting.classList.add(SHOWING_CN); // 입력한 이름이 보이도록 클래스 추가
  greeting.innerText = `Hello! ${text}`; 
}


function loadName() { // 저장된 이름 불러오기
  const currentUser = localStorage.getItem(USER_LS);  //저장된 이름이 없을 시 NULL 반환
  
  if(currentUser === null) {
    //유저 비존재
    askForName();
  } else {
    //유저 존재
    paintGreeting(currentUser);
  }
}


loadName();