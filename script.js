// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { database } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQYXnE9tdxZDiYVVzO8vLlnkmsbUhoxvM",
  authDomain: "grupp2-todo.firebaseapp.com",
  projectId: "grupp2-todo",
  storageBucket: "grupp2-todo.appspot.com",
  messagingSenderId: "173060457088",
  appId: "1:173060457088:web:ed9f0413bbaa02a6dc1c65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let database = firebase.database();

let ref = database.ref()
ref.on('value', function(snapshot) {
    let data = snapshot.val();
    console.log(data)
});



