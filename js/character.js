import { getHeaders, database_url, checkIfLoggedIn, harryPotter_URL} from "./global.js";
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
    }
   
    catch(error){
        console.error(error)
    }
}
fetchData();
const showCharacter = (character)=> {
    const container = document.createElement("div");
  container.classList.add("character-box");

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
  const house = document.createElement("li");
  textContainer.appendChild(list);

  house.innerHTML = `Hus: ${character.house}`;
  list.appendChild(house);
  const gender = document.createElement("li");
  gender.innerHTML = `Kön: ${character.gender}`;
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
  characterList.appendChild(container);
}