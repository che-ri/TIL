const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
//   form이나 input으로 작성하면 gretting.js의 const form/input과 충돌하게 된다.
//  그러므로, 꼭 자바스크립트 모듈이 충돌하지 않게 이름을 지어야 한다! 

const TODOS_LS = "toDos"; //로컬 스토리지 

function loadToDos() {  //새로고침을 해도 데이터가 없어지지 않고, 화면에 계속 나타나게 하는 역할.
    const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  //else가 없는 이유는 null인 경우에는 input이 showing 상태라서 인풋이 화면에 드러난다.

function handleSubmit(event) {  //이벤트를 가져온다.
    event.preventDefault(); //event의 preventdefault 속성을 실행한다.
    const currentValue = toDoInput.value;
    paintToDo(currentValue); // paintToDo를 실행시킨다.
    toDoInput.value = ""; // paintTodo를 실행하고나면 input 창의 값을 ""으로 만든다.
  }

function paintToDo(text) {
  const li = document.createElement("li"); //"li"의 변수 생성
  const delBtn = document.createElement("button"); //"button"의 변수 생성
  const span = document.createElement("span"); //"span"의 변수 생성
  const newId = toDos.length + 1;
  delBtn.innerText = "❌"; //"button" 안에 ❌ 넣기 (이모지도 text다)
  span.innerText = text; //이 text는 submit function에서 온 값이다. 
  li.appendChild(delBtn); // appendChild는 delbtn을 그의 father element 안에 넣는 것이다.
  li.appendChild(span); // span을 li 안에 넣기
  li.id = newId;
  toDoList.appendChild(li);} // toDoList 안에 li 넣기
  
  const toDos = []; //todo가 많아 질 수 있으니 array로!

  const toDoObj = { //toDos array를 위해선 object가 필요하다 
    text: text,
    id: newId //newId=toDos.length+1
  };
  toDos.push(toDoObj); //toDos라는 array 안에 toDoObj를 넣어주는 것! 
  saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

function init() {
  loadToDos(); //로컬스토리지에서 온 데이터를 로드해야한다.
  toDoForm.addEventListener("submit", handleSubmit); 
}

init();