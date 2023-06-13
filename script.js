import printTodosList from "./printTodos.js";
import newTodoForm from "./newTodoForm.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

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
});

// === Print Todo Form == //
const showFormBtn = document.getElementById("show-form-btn");

showFormBtn.addEventListener("click", () => {
  newTodoForm();
});
