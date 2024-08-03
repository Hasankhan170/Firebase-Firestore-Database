import { collection, addDoc ,getDocs ,doc, deleteDoc ,updateDoc,Timestamp, query,
  where, orderBy } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./config.js"


const form = document.querySelector('.form')
const input = document.querySelector('.input')
const ul = document.querySelector('ul')
const select = document.querySelector('#select')
const citiesBtn = document.querySelectorAll('.cities-btn')
const reset = document.querySelector(".reset");



let arr = []

citiesBtn.forEach((btn)=>{
  btn.addEventListener('click', async (e)=>{
    arr = []
    const todosRef = collection(db, "users");
    const q = query(
      todosRef,
      where("city", "==", e.target.innerHTML),orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });

    
    rendersTodos()
  })
})

reset.addEventListener('click' , getData)

async function getData(){
  
  arr = []
  const q = query(collection(db, "users"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
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
    <p>${item.time ? item.time.toDate() : "no time"}</p>
    <hr/>
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
          todo : input.value,
          city : select.value,
          time: Timestamp.fromDate(new Date()),
        });

        console.log("Document written with ID: ", docRef.id);
        arr.push({
          todo : input.value,
          city : select.value,
          id : docRef.id
        }) 
        rendersTodos()
        input.value = ""
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
})

