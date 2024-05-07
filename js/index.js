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
    allCharacters=data;
    console.log(allCharacters)

 }catch (error){
    console.error("Något blev fel med fetchning i fetchHarryData", error)
 }
}

fetchHarryData()
