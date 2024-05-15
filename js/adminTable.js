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
    showData(data.items)
    registredToday(data.items)
}
fetchData()

const registredToday= (data)=>{
    const today= new Date();
    const allNewMembers= data.filter(newMembers=>{
    const timestamp=new Date(newMembers.registerDate)
    return timestamp.getFullYear()===today.getFullYear() && timestamp.getMonth()===today.getMonth() && timestamp.getDate()=== today.getDate()
    })
    return allNewMembers
}
const monthlyRegistred = (data)=>{
    const today= new Date();
    const allNewMembers= data.filter(newMembers=>{
        const timestamp=new Date(newMembers.registerDate)
        return timestamp.getFullYear()===today.getFullYear() && timestamp.getMonth()===today.getMonth();
        })
        return allNewMembers
}
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
    membersToday.innerHTML=`${registredToday(data).length} nya medlemmar idag`
    todayContainer.appendChild(membersToday)
    firstRow.appendChild(todayContainer)
    myPageContainer.appendChild(firstRow)

    const monthContainer= document.createElement("div");
    monthContainer.classList.add("box");
    const monthIcon=document.createElement("span");
    monthIcon.classList.add("icon");
    monthIcon.innerHTML=`<i class="fa-regular fa-calendar-days"></i>`
    const membersMonth=document.createElement("p");
    membersMonth.classList.add("large-text");
    membersMonth.innerHTML=`${monthlyRegistred(data).length} nya medlemmar denna månaden`
    monthContainer.appendChild(monthIcon)
    monthContainer.appendChild(membersMonth)
    firstRow.appendChild(monthContainer)
    
    const allContainer=document.createElement("div");
    allContainer.classList.add("box");
    const allIcon=document.createElement("span");
    allIcon.classList.add("icon");
    allIcon.innerHTML=`<i class="fa-solid fa-users"></i>`;
    const allMembers=document.createElement("p");
    allMembers.classList.add("large-text");
    allMembers.innerHTML=`${data.length} medlemmar totalt`
    allContainer.appendChild(allIcon);
    allContainer.appendChild(allMembers)
    firstRow.appendChild(allContainer);
}
const showUsers= (data)=>{
    
}
