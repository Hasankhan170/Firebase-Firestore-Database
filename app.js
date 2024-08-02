import { collection, addDoc ,getDocs ,doc, deleteDoc ,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./config.js"


const form = document.querySelector('.form')
const input = document.querySelector('.input')
const ul = document.querySelector('ul')

let arr = []

async function getData(){
   const querySnapshot = await getDocs(collection(db, "users"));
   querySnapshot.forEach((doc) => {
   console.log(doc.data());
   arr.push({...doc.data() , id:doc.id})
});

rendersTodos()

}
getData()

function rendersTodos(){
  ul.innerHTML = ""

  arr.map((item)=>{
    ul.innerHTML += `<li>${item.todo}</li>
    <button class = "deleteBtn">Delete</button>
    <button class = "editBtn">Edit</button>
    `
  })

  const editBtn = document.querySelectorAll('.editBtn')

  const deleteBtn = document.querySelectorAll('.deleteBtn')


  deleteBtn.forEach((btn , index)=>{
    btn.addEventListener('click', async ()=>{
      deleteDoc(doc(db, "users", arr[index].id))
      arr.splice(index,1)
      rendersTodos()
    })
  })

  editBtn.forEach((btn , index)=>{
    btn.addEventListener('click' , async ()=>{
      const updateValue = prompt('enter new value')
      const cityRef = doc(db, 'users', arr[index].id);
      await updateDoc(cityRef, {
        todo: updateValue
    });

    arr[index].todo = updateValue
    rendersTodos()
    

    })
  })


  





}


form.addEventListener('submit' , async (e)=>{
    e.preventDefault()




    
    try {
        const docRef = await addDoc(collection(db, "users"), {
          todo : input.value
        });

        console.log("Document written with ID: ", docRef.id);
        arr.push({
          todo : input.value,
          id : docRef.id
        }) 
        rendersTodos()
        input.value = ""
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
})


