import { collection, addDoc ,getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./config.js"


const form = document.querySelector('.form')
const input = document.querySelector('.input')
const ul = document.querySelector('ul')

let arr = []

async function geteData(){
   const querySnapshot = await getDocs(collection(db, "users"));
   querySnapshot.forEach((doc) => {
   console.log(doc.data());
   arr.push(doc.data())
});

}
geteData()

function rendersTodos(){
  ul.innerHTML = ""

  arr.map((item)=>{
    ul.innerHTML += `<li>${item.todo}</li>`
  })
console.log(arr);

}

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


