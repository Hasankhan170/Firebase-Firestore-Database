import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./config.js"


const form = document.querySelector('.form')
const input = document.querySelector('.input')
const ul = document.querySelector('ul')

let arr = []

form.addEventListener('submit' , async (e)=>{
    e.preventDefault()

    arr.push({
      todo : input.value
    })


    rendersTodos()
    try {
        const docRef = await addDoc(collection(db, "users"), {
          todo : input.value
        });
        input.value = ""
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
})


function rendersTodos(){
  ul.innerHTML = ""

  arr.map((item)=>{
    ul.innerHTML += `<li>${item.todo}</li>`
  })
console.log(arr);

}