const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target; //이벤트의 대상은 btn
  const li = btn.parentNode; //btn의 parentnode는 li라는 것을 지정한다.
  toDoList.removeChild(li); //li를 지우는 역할
  const cleanToDos = toDos.filter(function(toDo) { //filer은 forEach에서 함수를 실행하는 것과 같이 각각의 item과 같이 실행 될 것이다.
  //filter는 todo의 모든 item에 함수를 실행하고, true인 아이템들만 가지고 새로운 array를 만든다.
    return toDo.id !== parseInt(li.id); //parseInt는 string을 숫자로 바꿔준다.
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() { //todos를 가져와서 로컬에 저장하는 역할을 한다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify는 자바스크립트 object를 string으로 바꿔준다.
  //JSON.stringify를 쓰는 이유? 데이터를 LS에 저장해야되는데, JS는 LS에 무조건 문자열로만 저장하려하거든!! 
 }

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);//delete버튼 클릭하는 이벤트!
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId //id를 부여하는 이유는? 나중에 delbtn이 지울 li를 셀렉하기 위해
  };
  toDos.push(toDoObj);
  saveToDos(); //윗줄에 push를 하고, 함수호출을 할 것! why? 그 전에 하면, todos는 비어있으니, 저장할 게 아무것도 없지요~ 
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); 
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //json이 LS에 있는 값을 object로 변환!
    parsedToDos.forEach(function(toDo) { //forEach는 array를 위한 함수다.
      paintToDo(toDo.text); //변환된 것들에 대해 paintToDo라는 함수가 실행된다.
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();