import { collection, addDoc ,  getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./config.js";

const todoForm = document.querySelector('.form')
const todoInput = document.querySelector('.input')
const ul = document.querySelector('ul')

let arr = []

async function getData(){
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
  console.log(doc.data());
  arr.push(doc.data())
});
    console.log(arr);
    rendersTodo()
}
getData()
function rendersTodo(){
  ul.innerHTML = ""
  arr.map((item) => {
    ul.innerHTML += `<li>${item.todo}</li>`
  })
}

todoForm.addEventListener('submit' , async (e)=>{
  e.preventDefault();
 

  if(todoInput === ''){
    alert('Please enter a valid todo')
    return;
  }
 
arr.push({
  todo : todoInput.value
})


rendersTodo()



  try {
    const docRef = await addDoc(collection(db, "todos"), {
      todo : todoInput.value
    });
    todoInput.value = "";
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
   
})