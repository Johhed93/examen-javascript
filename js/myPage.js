import { getHeaders, database_url, checkIfLoggedIn, seePassword, getLoggedInUser, removeFromFavourties} from "./global.js";
checkIfLoggedIn()
const myPageContainer=document.querySelector("#myPageContainer")
const fetchUser= async()=>{
    try{
    const res= await fetch(`${database_url}/${getLoggedInUser()}`,{
    method:"GET",
    headers:getHeaders()
    })
    const data=await res.json();
    myPageContainer.innerHTML=""
    showUser(data)
    }catch(error){
        console.error("Feil i henting av bruker", error)
    }
}
fetchUser()
/* const paragraphToInput =(p, container, user)=>{
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
} */
const showUser= (user)=>{
    const firstRow= document.createElement("div");
    firstRow.classList.add("first-row");
    const profileContainer= document.createElement("div");
    firstRow.appendChild(profileContainer)
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
    
    const userActions= document.createElement("div");
    userActions.classList.add("profile-container");
    firstRow.appendChild(userActions)
    const userTitle= document.createElement("h2");
    userTitle.style.fontSize="2rem";
    userTitle.style.width="289px"
    userTitle.innerHTML=`Användarcenter`
    userActions.appendChild(userTitle)

    const signOut= document.createElement("button");
    signOut.classList.add("house-btn");
    signOut.innerHTML="Logga ut";
    signOut.classList.add("unknown")
    userActions.appendChild(signOut);

    const deleteAccount=document.createElement("button");
    deleteAccount.classList.add("house-btn");
    deleteAccount.classList.add("Gryffindor");
    deleteAccount.innerHTML=`Radera konto`;
    userActions.appendChild(deleteAccount)

    myPageContainer.appendChild(firstRow)

    const myFavouritesList= document.createElement("div");
    myFavouritesList.classList.add("profile-container");
    myFavouritesList.style.width="100%";
    const favouritesHeadline=document.createElement("h2");
    favouritesHeadline.style.fontSize="2rem"
    favouritesHeadline.innerHTML=`Mina favoriter`;
    myFavouritesList.appendChild(favouritesHeadline);
    myPageContainer.appendChild(myFavouritesList);
    
    const list= document.createElement("ul");
    list.classList.add("list");
    myFavouritesList.appendChild(list)

    if(user.myFavourites.length===0){
    const li=document.createElement("li");
    const container=document.createElement("div");
    container.classList.add("list-element");
    const message= document.createElement("p");
    message.innerHTML="Det ser ut som du inte har hittat någon favorit än"
    const link= document.createElement("a");
    link.classList.add("link")
    link.href="./index.html";
    link.innerHTML=`Hitta favoriter`
    list.appendChild(li)
    li.appendChild(container);
    container.appendChild(message);
    container.appendChild(link)
    }else{
        user.myFavourites.forEach(char=>{
            const li=document.createElement("li");
           
            const container= document.createElement("div");
            container.classList.add("list-element");
            
            li.appendChild(container)
            const picture= document.createElement("img");
            picture.classList.add("picture");
            picture.src=char.image;
            
            const name=document.createElement("p");
            name.innerHTML=char.name;

            const house=document.createElement("p");
            if(char.house===""){
                house.innerHTML="Hus okänt"
                house.classList.add("unknown")
            }else{
                house.innerHTML=`${char.house}`;
                house.classList.add(`${char.house}`)
            }
            const btnContainer= document.createElement("div");
            btnContainer.classList.add("btn-container");
            const seeMore= document.createElement("a");
            seeMore.href=`./character.html?character=${char.id}`;
            seeMore.innerHTML="Läs mer";
            seeMore.classList.add("link")
            btnContainer.appendChild(seeMore);
            const remove= document.createElement("button");
            remove.classList.add("button");
            remove.innerHTML="Ta bort";
            remove.addEventListener("click", async()=>{
            await removeFromFavourties(char)
            await fetchUser()
            })
            btnContainer.appendChild(remove)
            container.appendChild(picture)
            container.appendChild(name)
            container.appendChild(house)
            container.appendChild(btnContainer)
            list.appendChild(li)
        })
    }

}