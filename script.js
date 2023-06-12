import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const rootDiv = document.getElementById("root");

const firebaseConfig = {
  apiKey: "AIzaSyCQYXnE9tdxZDiYVVzO8vLlnkmsbUhoxvM",
  authDomain: "grupp2-todo.firebaseapp.com",
  databaseURL:
    "https://grupp2-todo-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "grupp2-todo",
  storageBucket: "grupp2-todo.appspot.com",
  messagingSenderId: "173060457088",
  appId: "1:173060457088:web:ed9f0413bbaa02a6dc1c65",
};

const app = initializeApp(firebaseConfig);
let db = getDatabase();
const postsRef = ref(db, "todos");

onValue(postsRef, (snapshot) => {
  const data = snapshot.val();

  printTodosList(data);

  console.log(data);
  console.log(data.todo);
  console.log(data.todo.id);
});

// ==== Print every todo === //
function printTodosList(data) {
  rootDiv.innerHTML = "";

  const todosWrapper = document.createElement("div");
  todosWrapper.className = "todos-wrapper";

  Object.values(data).forEach((todo) => {
    const todoBox = document.createElement("div");
    todoBox.className = "todo-box";

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "todo-checkbox");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = todo.title;

    const todoDesc = document.createElement("p");
    todoDesc.innerText = todo.description;

    const todoDate = document.createElement("p");
    todoDate.innerText = todo.dueDate;

    const todoTime = document.createElement("p");
    todoTime.innerText = todo.dueTime;

    todoBox.append(checkBox, todoTitle, todoDesc, todoDate, todoTime);

    todosWrapper.appendChild(todoBox);
  });
  rootDiv.appendChild(todosWrapper);
}
