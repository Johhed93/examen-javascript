import { getHeaders, setLoggedInUser, database_url, displayError, checkIfLoggedIn} from "./global.js";

const loginBtn= document.querySelector("#signInBtn");
loginBtn.addEventListener("click", async(e)=>{
    e.preventDefault();
    await loginUser()
})
const loginUser= async ()=>{
    const username= document.querySelector("#usernameInput").value.toLowerCase();
    const password=document.querySelector("#passwordInput").value;
    
    if(!await verifyLogin(username, password)){ 
    return displayError("Användarnamnet eller lösenordet är fel") 
    }
    
    setLoggedInUser(await returnID(username))
    window.location.href="./index.html";
}

const verifyLogin= async (username, password)=>{
    try {
    const res= await fetch(database_url, {
        method:"GET",
        headers:getHeaders(),
    })
    if(!res.ok){
        displayError("Något blev fel försök igen")
        throw new Error("Något blev fel i databasen på verifisering av bruker")
    }
    const data= await res.json();
    return data.items.some(user=> user.username===username && user.password===password)

    }catch (error){
        console.error("Något blev fel i verifisering av bruker", error)
    }
}
const returnID= async (username)=> {
    try {
    const res= await fetch(database_url,{
        method:"GET",
        headers: getHeaders()
    })
    if(!res.ok){
        throw new Error("Något blev fel i returing av id i databasen", res.status);
    }
    const data= await res.json();
    const findUser= data.items.find(user=> user.username===username);
    return findUser._uuid;
    }catch (error){
        console.error("Något blev fel i returnering av ID")
    }
}
checkIfLoggedIn()
