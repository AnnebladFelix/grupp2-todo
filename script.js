import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

/* 
onValue används för att lyssna på ändringar i den refererade kollektionen. När det sker en ändring kommer callback-funktionen att köras, och du kan hämta datan från snapshot.val() och utföra lämplig logik eller bearbetning med den.
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Hämta databasreferens med getDatabase()
let db = getDatabase();

// Hämta en referens till kollektionen "posts"
const postsRef = ref(db, "posts");

// Lyssna på ändringar i kollektionen "posts"
onValue(postsRef, (snapshot) => {
  // Hämta datan från snapshot
  const data = snapshot.val();

  // Gör något med datan, t.ex. logga den
  console.log(data);

  console.log(data.post);

  console.log(data.post.postId);
});
