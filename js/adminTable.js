import {
    getHeaders,
    database_url,
    checkIfLoggedIn,
    seePassword,
    getLoggedInUser,
    removeFromFavourties,
    verifyUsername,
  } from "./global.js";
  checkIfLoggedIn();
const fetchData= async()=>{
    const res=await fetch(database_url,{
    method:"GET",
    headers:getHeaders()
    })
    if(!res.ok){
        throw new Error("Något blev feil i databasen fetchData", res.status)
    }
    const data=await res.json();
    console.log(data.items)
    showData()
}
fetchData()
const myPageContainer= document.querySelector("#myPageContainer")
const showData = (data)=>{
    const firstRow=document.createElement("div");
    firstRow.classList.add("first-row");
    const todayContainer= document.createElement("div");
    todayContainer.classList.add("box");
    const todayIcon= document.createElement("span");
    todayIcon.classList.add("icon")
    todayIcon.innerHTML=`<i class="fa-solid fa-user-plus"></i>`
    todayContainer.appendChild(todayIcon)
    const membersToday= document.createElement("p");
    membersToday.classList.add("large-text")
    membersToday.innerHTML=`3 Nya medlemmar idag`
    todayContainer.appendChild(membersToday)
    firstRow.appendChild(todayContainer)
    myPageContainer.appendChild(firstRow)
   
}