const toDoForm = document.querySelector(".js-toDoForm");  // 해야할 일 목록 form 태그
const toDoInput = toDoForm.querySelector("input");  // 해야할 일 목록 input 태그 (해야할 일 입력)
const toDoList = document.querySelector(".js-toDoUL");  // 입력된 해야할 일 목록 ul태그

const TODOS_LS = "LS-toDoThings";  // 해야할 일들을 Local Storage에 저장하기 위한 변수
let toDos = []; // 해야할 일들을 배열 형태로 저장

/* 입력한 값을 Local Storage에 저장 */
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

/* 리스트(toDos)는 계속해서 최신화 되는데 html 내부의 li태그 id가 갱신을 안해서 번호가 엇갈림 */
/* 해야할 일을 삭제하는 Delete Event Handler */
function delToDo(event) {
  const targetNode = event.target.parentNode; // 해당 <button>의 부모태그인 <li>태그
  toDoList.removeChild(targetNode); // 해당 노드 삭제
  
  let firstListNode = toDoList.firstChild.nextSibling;  // #id가 있는 첫 <li>태그
  // 바로 첫번째 자식태그는 'text' 뜸 (태그 띄어쓰기 때문)
  //console.log(toDoList.childNodes);
  
  // 새로운 객체에 최신화 시켜 갱신(할당)
  const cleanToDos = toDos.filter(function(toDo) {  // toDos를 toDo로 순회하며 조건에 맞을 시 cleanToDos에 추가
    const targetId = parseInt(targetNode.id); // 삭제한 노드의 id
    const toDoId = parseInt(toDo.num); // 순회중인 노드의 id
    
    return targetId !== toDoId; // true일 경우 array(celanToDos)에 할당시킴
  });

  // 순회하며 id 최신화
  cleanToDos.forEach(function(toDo, idx) {
    firstListNode.id = idx + 1; // ul 태그의 id 최신화
    firstListNode = firstListNode.nextSibling;  // ul 태그 순회

    toDo.num = idx + 1; // 각 할 일들 객체의 id 최신화
  });
  
  toDos = cleanToDos; // 해야할 일들 목록 갱신
  saveToDos();  // Local Storage 목록 갱신
}

/* 해야할 일들 출력 */
function paintToDo(obj) {
  const li = document.createElement("li");  // li 태그 생성
  const delBtn = document.createElement("button");  // 삭제 button 태그 생성
  const span = document.createElement("span");  // button이 li 옆에 있도록 span 태그로 설정

  delBtn.innerHTML = "✖"; // button 모양 생성
  span.innerHTML = "&nbsp;" + obj['text'];  //span 태그에 할 일 내용 입력

  delBtn.addEventListener("click", delToDo);

  const num = obj['num'];  // 해야할 일들 총 개수 갱신

  li.id = num; // 몇 번 째로 추가한 일인지 id로 저장
  li.appendChild(delBtn);  // 삭제 버튼 추가
  li.appendChild(span); // 삭제 버튼 우측에 해야할 일 출력

  toDoList.appendChild(li); // 완성된 해야할 일 한 줄(리스트)를 목록에 추가
}

/* 해야할 일을 추가하는 Add Event Handler */
function addToDo(event) {
  event.preventDefault(); // submit 후 새로고침 되지 않도록 함

  const toDoThing = toDoInput.value;  // input 태그에 입력한 값을 저장
  const toDoObj = {
    text: toDoThing,
    num: toDos.length + 1
  };
  
  toDos.push(toDoObj);
  saveToDos();  // 해야할 일 추가 및 저장

  paintToDo(toDoObj); // 해야할 일 출력
  
  toDoInput.value = ""; // 입력한 값 초기화
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) { // 이전에 입력한 내용이 있을 경우
    const parsedToDos = JSON.parse(loadedToDos);  // string을 object로 parsing
    
    parsedToDos.forEach(function(toDo) {
      toDos.push(toDo);
      paintToDo(toDo);
    });
    /* 위 구문과 동일
    for (var idx = 0; idx < parsedToDos.length; idx ++) {
      toDos.push(parsedToDos[idx]); // 각 object를 차례로 push
      paintToDo(parsedToDos[idx]);  // 각 object를 차례로 출력
    }
    */
  } 
}



/* 첫 동작 */
function init() {
  loadToDos();  // 해야할 일 목록들 불러오기
  toDoForm.addEventListener("submit", addToDo);  // 입력된 값에 따라 form의 submit에 대한 'addToDo' 이벤트 실행
}



/* JS 작동 */
init();