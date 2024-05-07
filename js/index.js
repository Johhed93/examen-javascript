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

    

    

 }catch (error){
    console.error("Något blev fel med fetchning i fetchHarryData", error)
 }
}

fetchHarryData()

const showHousesButton = (house)=>{
    const hogwartsHouses= document.querySelector("#hogwartsHouses");
    
    const button= document.createElement("button");
    button.value=house;
    button.innerHTML=house;
    button.classList.add("house-btn")
    button.classList.add(`${house}`)
    
    hogwartsHouses.appendChild(button)

}
