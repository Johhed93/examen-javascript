import { userIsLoggedOut, getHeaders, setLoggedInUser, database_url, displayError} from "./global.js";

const loginUser= async ()=>{
    const username= document.querySelector("#usernameInput").value.toLowerCase();
    const password=document.querySelector("#passwordInput").value;
    if(await verifyLogin()){

    }
}

const verifyLogin= async (username, password)=>{
    try {
    const res= await fetch(database_url, {
        method:"GET",
        headers:getHeaders(),
    })
    if(!res.ok){
        displayError("Försök igen")
        throw new Error("Något blev fel i databasen på verifisering av bruker")
    }

    }catch (error){
        console.error("Något blev fel i verifisering av bruker", error)
    }
}
userIsLoggedOut()