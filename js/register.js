import { userIsLoggedOut } from "./global.js";
userIsLoggedOut();

const registerUser = async ()=> {
 const fName=document.querySelector("#fNameInput").value;
 const lName= document.querySelector("#lNameInput").value;
 const username=document.querySelector("#usernameInput").value.toLowerCase();
 const password=document.querySelector("#passwordInput").value;
 const repeatPassword=document.querySelector("#repeatPasswordInput").value;
 const errorMsg=document.querySelector("#errorMsg");
 if(password!==repeatPassword){
    errorMsg.innerHTML="Lösenordet matchar inte"
    setTimeout(() => {
        return errorMsg.innerHTML=""
    }, 3000);
 }
 


}
const submitFormBtn=document.querySelector("#submitFormBtn");
submitFormBtn.addEventListener("click", registerUser)