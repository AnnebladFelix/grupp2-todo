import printTodosList from "./printTodos.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";

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

export default function newTodoForm() {
  rootDiv.innerHTML = "";

  const formDiv = document.createElement("div");
  formDiv.id = "form-div";
  const titleInputLabel = document.createElement("label");
  titleInputLabel.innerText = "Titel: ";
  titleInputLabel.setAttribute("for", "titleInput");

  const titleInput = document.createElement("input");
  titleInput.className = "titleInput";
  titleInput.id = "titel-Input";
  titleInput.type = "text";

  const descInputLabel = document.createElement("label");
  descInputLabel.innerText = "Description: ";
  descInputLabel.setAttribute("for", "descInput");

  const descInput = document.createElement("textarea");
  descInput.className = "descInput";
  descInput.id = "desc-input";

  const dateInputLabel = document.createElement("label");
  dateInputLabel.innerText = "Due date: ";
  dateInputLabel.setAttribute("for", "dateInput");

  const dateInput = document.createElement("input");
  dateInput.className = "dateInput";
  dateInput.id = "date-input";
  dateInput.type = "date";

  const newTodoBtn = document.createElement("button");
  newTodoBtn.className = "NewTodoBtn";
  newTodoBtn.innerText = "Add";
  newTodoBtn.id = "new-todo";

  const backBtn = document.createElement("button");
  backBtn.className = "backTodoBtn";
  backBtn.innerText = "Back";
  backBtn.id = "back-btn";

  formDiv.append(
    titleInputLabel,
    titleInput,
    descInputLabel,
    descInput,
    dateInputLabel,
    dateInput,
    newTodoBtn,
    backBtn
  );
  rootDiv.appendChild(formDiv);

  // === Add new todo === //
  newTodoBtn.addEventListener("click", () => {
    if (titleInput.value && descInput.value && dateInput.value) {
      const newTodoRef = push(ref(db, "todos"));
      const todoId = newTodoRef.key;

      const newTodo = {
        id: todoId,
        title: titleInput.value,
        description: descInput.value,
        dueDate: dateInput.value,
        isChecked: false,
      };

      set(newTodoRef, newTodo);
    } else {
      alert("Please fill in every field");
    }
  });

  backBtn.addEventListener("click", () => {
    get(postsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          printTodosList(data);
        } else {
          console.log("Ingen data finns i databasen.");
        }
      })
      .catch((error) => {
        console.error("Fel vid hämtning av data:", error);
      });
  });
}
