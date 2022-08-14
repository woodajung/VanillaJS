const TODOS_KEY = 'todos';
const toDoForm = document.getElementById('todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoUl = document.getElementById('todo-list');
let toDos = [];

/**
 * 저장
 */
function saveToDos() {
     localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

/**
 * 삭제
 */
function deleteToDo(e) {
    const li = e.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

/**
 * TODO 항목 추가
 */
function paintToDo(newTodo) {
    const li = document.createElement('li');
    li.className = 'todo__item';
    li.id = newTodo.id;
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    li.appendChild(span);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'todo__delete';
    button.addEventListener('click', deleteToDo);
    li.appendChild(button);

    toDoUl.appendChild(li);
}

/**
 * submit 시 호출
 */
function onTodoSubmit(e) {
    // page refresh prevent
    e.preventDefault();

    // current value save
    const newTodoInputValue = toDoInput.value;
    // empty 
    toDoInput.value = '';

    const newTodoObj = {
        text: newTodoInputValue,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener('submit', onTodoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach((item) => paintToDo(item));
}