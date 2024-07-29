import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./config.js"


const form = document.querySelector('.form')
const input = document.querySelector('.input')

let arr = []
form.addEventListener('submit' , async (e)=>{
    e.preventDefault()

    arr.push({
        todo : input.value
    })

    try {
        const docRef = await addDoc(collection(db, "users"), {

            todo : input.value
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log(arr);
})
