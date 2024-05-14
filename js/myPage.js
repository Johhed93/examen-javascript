import { getHeaders, setLoggedInUser, database_url, displayError, checkIfLoggedIn, seePassword, getLoggedInUser} from "./global.js";
checkIfLoggedIn()
const myPageContainer=document.querySelector("#myPageContainer")
const fetchUser= async()=>{
    try{
    const res= await fetch(`${database_url}/${getLoggedInUser()}`,{
    method:"GET",
    headers:getHeaders()
    })
    const data=await res.json();
    console.log(data)
    }catch(error){
        console.error("Feil i henting av bruker", error)
    }
}
fetchUser()

const paragraphToInput =(p, container, user)=>{
    let input=document.createElement("input");
    input.value=user.name;
    container.appendChild(input);
    p.remove();
}
const inputToParagrph = (input, container, user)=>{
    let p=document.createElement("p");
    p.innerHTML=user.name;
    container.appendChild(p);
    input.remove();
}