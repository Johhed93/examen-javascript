import { userIsLoggedOut, harryPotter_URL } from "./global.js";

userIsLoggedOut()

let allCharacters;

const fetchHarryData = async()=>{
 try{
    const res= await fetch(harryPotter_URL);
    if(!res.ok){
        throw new Error("Något blev fel hos databasen i fetchHarryData", res.status)
    }
    const data=await res.json();

    const houses= Array.from(new Set(data.map(student=> student.house)));
    houses.forEach(house => {
        showHousesButton(house)
    });
    
    showStatusButton(data)
    
 }catch (error){
    console.error("Något blev fel med fetchning i fetchHarryData", error)
 }
}

fetchHarryData()

const showHousesButton = (house)=>{
    const hogwartsHouses= document.querySelector("#hogwartsHouses");
    
    const button= document.createElement("button");
    
    
    button.classList.add("house-btn")
    if(house===""){
        button.classList.add("unknown")
        button.innerHTML="Inget hus"
        button.setAttribute("value", '""')
        
    }else{
        button.classList.add(`${house}`)
        button.innerHTML=house;
        button.setAttribute("value", `${house}`)
        
    }
    
    hogwartsHouses.appendChild(button)

}
const showStatusButton= (data)=> {
    
    const statusClass=document.querySelector("#statusClass");
    const student= document.createElement("button");
    student.classList.add("house-btn");
    student.innerHTML="Student";
    student.addEventListener("click", ()=>{
   const students= data.filter(student=> student.hogwartsStudent===true);
   console.log(students)
    })
    statusClass.appendChild(student)

    const teacher= document.createElement("button");
    teacher.classList.add("house-btn");
    teacher.innerHTML="Teacher";
    teacher.addEventListener("click", ()=> {
        const teachers= data.filter(teacher=> teacher.hogwartsStaff===true);
        console.log(teachers);
    })
    statusClass.appendChild(teacher)
    
    const neither= document.createElement("button");
    neither.classList.add("house-btn");
    neither.innerHTML="Inget av de"
    neither.addEventListener("click", ()=> {
        const nothing= data.filter(not=> not.hogwartsStaff===false && not.hogwartsStudent===false)
        console.log(nothing)
    })
    
}