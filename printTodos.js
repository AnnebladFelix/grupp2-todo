import updateTodo from "./updateTodo.js";
import { initializeApp } from "firebase/app";
import { ref, update, remove, getDatabase } from "firebase/database";

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
const rootDiv = document.getElementById("root");

// ==== Print every todo === //
export default function printTodosList(data) {
    rootDiv.innerHTML = "";
  
    const todosWrapper = document.createElement("div");
    todosWrapper.className = "todos-wrapper";
  
    Object.values(data).forEach((todo) => {
      const todoBox = document.createElement("div");
      todoBox.className = "todo-box";
  
      const checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("class", "todo-checkbox");
      checkBox.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        updateTodoStatus(todo.id, isChecked);
      });
      function updateTodoStatus(todoId, isChecked) {
        const todoRef = ref(db, `todos/${todoId}`);
        update(todoRef, { isChecked });
      }
  
      if (todo.isChecked){
        checkBox.setAttribute("checked", "true")
      }
  
      function deleteTodo(todoId) {
        const todoRef = ref(db, `todos/${todoId}`);
        remove(todoRef)
      }
  
      const todoTitle = document.createElement("h3");
      todoTitle.innerText = todo.title;
  
      const todoDesc = document.createElement("p");
      todoDesc.innerText = todo.description;
  
      const todoDate = document.createElement("p");
      todoDate.innerText = todo.dueDate;
  
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
  
      deleteButton.addEventListener("click", () => {
        deleteTodo(todo.id);
      })
  
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit todo";
      editBtn.addEventListener("click", ()=>{
        updateTodo(todo);
      })
  
      todoBox.append(checkBox, todoTitle, todoDesc, todoDate, deleteButton, editBtn);
  
      todosWrapper.appendChild(todoBox);
    });
    rootDiv.appendChild(todosWrapper);
  }