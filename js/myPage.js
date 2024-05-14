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
    showUser(data)
    }catch(error){
        console.error("Feil i henting av bruker", error)
    }
}
fetchUser()
const paragraphToInput =(p, container, user)=>{
    let input=document.createElement("input");
    input.classList.add("edit-input");
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
const showUser= (user)=>{
    const profileContainer= document.createElement("div");
    profileContainer.classList.add("profile-container");
    const headline= document.createElement("h1");
    headline.innerHTML="Min profil";
    profileContainer.appendChild(headline);

    const usernameBox= document.createElement("div");
    usernameBox.classList.add("edit-user-box");
    const usernameTextContainer= document.createElement("div");
    usernameTextContainer.classList.add("text-box");
    const usernameTitle=document.createElement("p");
    usernameTitle.innerHTML=`Användarnamn:`;
    const usernameText= document.createElement("p");
    usernameText.innerHTML=` ${user.username}`;
    usernameTextContainer.appendChild(usernameTitle);
    usernameTextContainer.appendChild(usernameText);
    usernameBox.appendChild(usernameTextContainer);
    const editUsername= document.createElement("button");
    editUsername.innerHTML=`<i class="fa-solid fa-pen"></i>`
    editUsername.classList.add("edit-btn")
    usernameBox.appendChild(editUsername)
    profileContainer.appendChild(usernameBox)
    
    const nameBox= document.createElement("div");
    nameBox.classList.add("edit-user-box");
    const nameTextContainer= document.createElement("div");
    nameTextContainer.classList.add("text-box");
    const nameTitle=document.createElement("p");
    nameTitle.innerHTML=`Förnavn:`;
    const nameText= document.createElement("p");
    nameText.innerHTML=` ${user.name}`;
    nameTextContainer.appendChild(nameTitle);
    nameTextContainer.appendChild(nameText);
    nameBox.appendChild(nameTextContainer);
    const editName= document.createElement("button");
    editName.innerHTML=`<i class="fa-solid fa-pen"></i>`
    editName.classList.add("edit-btn")
    editName.addEventListener("click", ()=>{
        paragraphToInput(nameText, nameTextContainer, user)
    })
    nameBox.appendChild(editName)
    profileContainer.appendChild(nameBox)

    const lastNameBox= document.createElement("div");
    lastNameBox.classList.add("edit-user-box");
    const lNameTextContainer= document.createElement("div");
    lNameTextContainer.classList.add("text-box");
    const lNameTitle=document.createElement("p");
    lNameTitle.innerHTML=`Efternavn:`;
    const lNameText= document.createElement("p");
    lNameText.innerHTML=` ${user.lastname}`;
    lNameTextContainer.appendChild(lNameTitle);
    lNameTextContainer.appendChild(lNameText);
    lastNameBox.appendChild(lNameTextContainer);
    const editLName= document.createElement("button");
    editLName.innerHTML=`<i class="fa-solid fa-pen"></i>`
    editLName.classList.add("edit-btn")
    lastNameBox.appendChild(editLName)
    profileContainer.appendChild(lastNameBox)

    const passwordBox= document.createElement("div");
    passwordBox.classList.add("edit-user-box");
    const passwordTextContainer= document.createElement("div");
    passwordTextContainer.classList.add("text-box");
    const passwordTitle=document.createElement("p");
    passwordTitle.innerHTML=`Passord:`;
    const passwordText= document.createElement("p");
    passwordText.innerHTML=`*****`;
    passwordTextContainer.appendChild(passwordTitle);
    passwordTextContainer.appendChild(passwordText);
    passwordBox.appendChild(passwordTextContainer);
    const editpassword= document.createElement("button");
    editpassword.innerHTML=`<i class="fa-solid fa-pen"></i>`
    editpassword.classList.add("edit-btn")
    passwordBox.appendChild(editpassword)
    profileContainer.appendChild(passwordBox)
    
    

    myPageContainer.appendChild(profileContainer)
}