import { getHeaders, database_url, checkIfLoggedIn, getLoggedInUser, firstBigLetter} from "./global.js";
checkIfLoggedIn();
const urlParams = new URLSearchParams(window.location.search);
const getCharacter = urlParams.get('character');
const character_url= "https://hp-api.onrender.com/api/character/"
const fetchData= async()=> {
    try{
        const res= await fetch(`${character_url}${getCharacter}`);
        if(!res.ok){
            throw new Error(res.status)
        }
        const data=await res.json();
        console.log(data[0])
        showCharacter(data[0])
    }
   
    catch(error){
        console.error(error)
    }
}
fetchData();
const getYear= ()=>{
    const date=new Date();
    return date.getFullYear();
}
getYear()

const showCharacter = (character)=> {
    const characterContainer= document.querySelector("#characterContainer")
    const container = document.createElement("div");
    container.classList.add("character-box");
    container.classList.add("blur")
 

  const characterName = document.createElement("h3");
  characterName.classList.add("character-name");
  characterName.innerHTML = character.name;
  container.appendChild(characterName);

  const secondRow = document.createElement("div");
  secondRow.classList.add("row-box");
  const image = document.createElement("img");
  if (character.image === "") {
    image.src = "./assets/wizard.png";
  } else {
    image.src = character.image;
  }

  image.classList.add("character-image");
  image.alt = `Bilde av ${character.name}`;
  secondRow.appendChild(image);
  container.appendChild(secondRow);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-content");
  secondRow.appendChild(textContainer);

  const list = document.createElement("ul");
  list.classList.add("list");
  list.classList.add("margin-left");
  
  if(character.alternate_names.length>0){
    const alternativeNames= document.createElement("li");
    if(character.alternate_names.length>3){
     const threeNames= character.alternate_names.splice(0,3).join(" ,")
    alternativeNames.innerHTML=`Smeknamn: ${threeNames}`
    }else{
       const allNames= character.alternate_names.join(" ,")
        alternativeNames.innerHTML=`Smeknamn: ${allNames}`
    }
    list.appendChild(alternativeNames)
  }
  const house = document.createElement("li");
  textContainer.appendChild(list);
  house.innerHTML = `Hus: ${character.house}`;
  list.appendChild(house);
  if (character.house === "") {
    container.classList.add("unknown");
    house.innerHTML=`Hus: Okänt`
  } else {
    container.classList.add(`${character.house}`)
  }
 
  const gender = document.createElement("li");
  gender.innerHTML = `Kön: ${firstBigLetter(character.gender)}`;
  list.appendChild(gender);

  const status = document.createElement("li");
  if (character.hogwartsStaff) {
    status.innerHTML = `Status: Lärare`;
  } else if (character.hogwartsStudent) {
    status.innerHTML = `Status: Student`;
  } else {
    status.innerHTML = `Status: Okänt`;
  }
  list.appendChild(status);

  const alive = document.createElement("li");
  if (character.alive) {
    alive.innerHTML = `Levande: Ja`;
  } else {
    alive.innerHTML = `Levande: Nej`;
  }
  list.appendChild(alive);
  const secondTextContainer= document.createElement("div");
  secondTextContainer.classList.add("text-content");
  secondRow.appendChild(secondTextContainer)

  const secondList= document.createElement("ul");
  secondList.classList.add("list");
  secondList.classList.add("margin-left");
  secondTextContainer.appendChild(secondList);

  const actor=document.createElement("li");
  actor.innerHTML=`Skådespelare: ${character.actor}`
  secondList.appendChild(actor)

  const age= document.createElement("li");
  age.innerHTML=`Ålder: ${getYear()-character.yearOfBirth} år`;
  secondList.appendChild(age);
  
  const species= document.createElement("li");
  species.innerHTML=`Art: ${firstBigLetter(character.species)}`
  secondList.appendChild(species)

  const ancestry=document.createElement("li");
  if(character.ancestry===""){
    ancestry.innerHTML=`Släktskap: Okänt`
  }else{
    ancestry.innerHTML=`Släktskap: ${firstBigLetter(character.ancestry)}`
  }
  secondList.appendChild(ancestry);

  if(getLoggedInUser()!==null){
    const addToFavourites= document.createElement("button");
    addToFavourites.innerHTML=`<i class="fa-solid fa-heart"></i> Lägg till i favoriter`
    
    addToFavourites.classList.add("house-btn");
    if(character.house===""){
        addToFavourites.classList.add("unknown");
    }else{
        addToFavourites.classList.add(`${character.house}`);
    }
    
    secondTextContainer.appendChild(addToFavourites)
  }
  characterContainer.appendChild(container);
}