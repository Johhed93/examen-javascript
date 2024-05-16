import { checkIfLoggedIn, firstBigLetter } from "./global.js";

checkIfLoggedIn();
const harryPotter_URL = "https://hp-api.onrender.com/api/characters";
const characterList = document.querySelector("#characterList");
const titleOfContent = document.querySelector("#titleOfContent");
const advancedSearch= document.querySelector("#advanced")

//Används för att visa frem antalet karaktärer på sidan. Fått hjälp av chatgpt men gjort det förr.
let currentPage = 1;
const charactersPerPage = 12;
let currentCharacterList;

const fetchHarryData = async () => {
  try {
    const res = await fetch(harryPotter_URL);
    if (!res.ok) {
      throw new Error("Något blev fel hos databasen i fetchHarryData", res.status);
    }
    const data = await res.json();
    showHousesButton(data);
    showStatusButton(data);
    showSearchBar(data);
    showAdvancedButton(data)
  } catch (error) {
    console.error("Något blev fel med fetchning i fetchHarryData", error);
  }
};

fetchHarryData();
const showSearchBar = (data) => {
  const searchBar = document.querySelector("#searchBar");
  const inputField = document.createElement("input");
  inputField.classList.add("input");
  inputField.placeholder = "Harry Potter";

  inputField.addEventListener("keyup", (e) => {
    let input = e.target.value.toLowerCase();
    currentCharacterList = data.filter((character) => character.name.toLowerCase().includes(input));
    /* if(input.length>0 && currentCharacterList.length===-1) */
    titleOfContent.innerHTML = "Sökresultat";
    currentPage = 1;
    characterList.innerHTML = "";
    displayData();
  });
  searchBar.appendChild(inputField);
};

const showHousesButton = (data) => {
  const houses = Array.from(new Set(data.map((student) => student.house)));
  const hogwartsHouses = document.querySelector("#hogwartsHouses");
  houses.forEach((house) => {
    const button = document.createElement("button");

    button.classList.add("house-btn");
    if (house === "") {
      button.classList.add("unknown");
      button.innerHTML = "Inget hus";
    } else {
      button.classList.add(`${house}`);
      button.innerHTML = house;
    }
    button.setAttribute("value", `${house}`);
    button.addEventListener("click", () => {
      if (button.value === "") {
        titleOfContent.innerHTML = "Alla med okänd tillhörighet";
      } else {
        titleOfContent.innerHTML = `Alla från ${house}`;
      }
      currentPage = 1;
      currentCharacterList = data.filter((specificHouse) => specificHouse.house === button.value);
      displayData();
    });
    hogwartsHouses.appendChild(button);
  });
};
const showStatusButton = (data) => {
  const statusClass = document.querySelector("#statusClass");
  const student = document.createElement("button");
  student.classList.add("house-btn");
  student.innerHTML = "Student";
  student.addEventListener("click", () => {
    titleOfContent.innerHTML = "Alla elever på hogwarts";
    characterList.innerHTML = "";
    currentCharacterList = data.filter((student) => student.hogwartsStudent === true);
    currentPage = 1;
    displayData();
  });
  statusClass.appendChild(student);

  const teacher = document.createElement("button");
  teacher.classList.add("house-btn");
  teacher.innerHTML = "Lärare";
  teacher.addEventListener("click", () => {
    currentPage = 1;
    currentCharacterList = data.filter((teacher) => teacher.hogwartsStaff === true);
    characterList.innerHTML = "";
    titleOfContent.innerHTML = "Alla anställda på hogwarts";
    displayData();
  });
  statusClass.appendChild(teacher);

  const neither = document.createElement("button");
  neither.classList.add("house-btn");
  neither.innerHTML = "Inget av det";
  neither.addEventListener("click", () => {
    currentPage = 1;
    characterList.innerHTML = "";
    currentCharacterList = data.filter(
      (noth) => noth.hogwartsStaff === false && noth.hogwartsStudent === false
    );
    titleOfContent.innerHTML = "De som inte jobbar eller är elever på hogwarts";
    displayData();
  });
  statusClass.appendChild(neither);
};
const showAdvancedButton =(data)=>{
  const button= document.createElement("button");
  button.classList.add("big-button");
  button.innerHTML=`Avancerad sök <i class="fa-solid fa-arrow-down"></i>`
  button.addEventListener("click", ()=>{
     if(!button.classList.contains("active")){
      button.innerHTML= `Avancerad sök <i class="fa-solid fa-arrow-up"></i>`
      button.classList.add("active")
      showAdvancedSearch(data)
     }else{
      button.innerHTML=`Ta bort <i class="fa-solid fa-arrow-down"></i>`
      button.classList.remove("active");
      advancedSearch.innerHTML="";
      showAdvancedButton(data)
    }
  })
  advancedSearch.appendChild(button)
}
const showAdvancedSearch = (data)=>{
const div = document.createElement("div");
div.style.marginTop="10px"
div.classList.add("first-search-row");
advancedSearch.appendChild(div);

const aliveBox= document.createElement("div");
aliveBox.classList.add("column-box");
const aliveText= document.createElement("h3");
aliveText.innerHTML=`Lever karaktären?`;
aliveBox.appendChild(aliveText)
const aliveBtns=document.createElement("div");
aliveBtns.classList.add("button-container");
aliveBox.appendChild(aliveBtns)
const alive= Array.from(new Set(data.map(char=> char.alive)));
alive.forEach(char=>{
  const button=document.createElement("button");
  button.classList.add("house-btn");
  button.setAttribute("value", `${char}`);
  if(!char){
    button.innerHTML=`Nej`;
    button.classList.add("Gryffindor");
    
  }else{
    button.innerHTML=`Ja`
    button.classList.add("Slytherin");
  }
  button.addEventListener("click", ()=>{
      currentPage = 1;
      const isAlive= JSON.parse(button.getAttribute("value"))
      currentCharacterList = data.filter((status) => status.alive ===isAlive);
      displayData();
  })
  aliveBtns.appendChild(button)
})
div.appendChild(aliveBox)

const patronus= Array.from(new Set(data.map(char=>char.patronus)))
const spellBox= document.createElement("div");
spellBox.classList.add("column-box");

const spellText=document.createElement("h3");
spellText.innerHTML=`Finn fram vem som har vilken patrounus`;

const selectedSpell=document.createElement("select");
selectedSpell.classList.add("select")
const defaultStatus= document.createElement("option");
defaultStatus.innerHTML=`Välj ett alternativ`;
defaultStatus.selected=true
selectedSpell.appendChild(defaultStatus);
patronus.forEach(spell=>{
  if(spell===""){
    return;
  }
  const option= document.createElement("option");
  option.innerHTML=spell;
  selectedSpell.appendChild(option)
})
selectedSpell.addEventListener("click", ()=>{
  const selectedOption= selectedSpell.value;
  currentPage = 1;
  currentCharacterList = data.filter((spell) => spell.patronus ===selectedOption);
  displayData();
})

spellBox.appendChild(spellText)
spellBox.appendChild(selectedSpell)
div.appendChild(spellBox)

const yearBox= document.createElement("div");
yearBox.classList.add("column-box");

const yearText=document.createElement("h3");
yearText.innerHTML=``




}
// Fått hjälp av chatgpt med displayData() prompt "här har jag alla harry potter karaktärer som är teacher t:ex jag vill bara visa fram 12 åt gången och
// när jag trycker på en knapp längst ner på dokumentet (inte skapat än) så ska du kunna gå igenom nästa 12 så man inte visar fram
// 100 objekter på en gång. hur gör jag det?"
const displayData = () => {
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const charactersToShow = currentCharacterList.slice(startIndex, endIndex);
  characterList.innerHTML = "";
  showNextSet();
  charactersToShow.forEach((character) => {
    showCharacters(character);
  });
};

const showNextSet = () => {
  const showNextContainer = document.querySelector("#showNextContainer");
  showNextContainer.innerHTML = "";
  if (currentCharacterList.length < 12) {
    return;
  }
  if (currentPage > 1) {
    const previousButton = document.createElement("button");
    previousButton.innerHTML = `Visa föregående sida`;
    previousButton.classList.add("big-button");
    previousButton.addEventListener("click", () => {
      currentPage--;
      displayData();
    });
    showNextContainer.appendChild(previousButton);
  }
  const showCurrentPage = document.createElement("p");
  showCurrentPage.innerHTML = `${currentPage} / ${Math.ceil(
    currentCharacterList.length / charactersPerPage
  )}`;
  showNextContainer.appendChild(showCurrentPage);

  if (currentCharacterList.length / currentPage > charactersPerPage) {
    const nextButton = document.createElement("button");
    nextButton.innerHTML = `Visa nästa sida`;
    nextButton.classList.add("big-button");
    nextButton.addEventListener("click", () => {
      currentPage++;
      displayData();
      console.log(currentCharacterList);
    });
    showNextContainer.appendChild(nextButton);
  }
};
const showCharacters = (user) => {
  const container = document.createElement("div");
  container.classList.add("character-box");

  const characterName = document.createElement("h3");
  characterName.classList.add("character-name");
  characterName.innerHTML = user.name;
  container.appendChild(characterName);

  const secondRow = document.createElement("div");
  secondRow.classList.add("row-box");
  const image = document.createElement("img");
  if (user.image === "") {
    image.src = "./assets/wizard.png";
  } else {
    image.src = user.image;
  }

  image.classList.add("character-image");
  image.alt = `Bilde av ${user.name}`;
  secondRow.appendChild(image);
  container.appendChild(secondRow);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-content");
  secondRow.appendChild(textContainer);

  const list = document.createElement("ul");
  list.classList.add("list");
  const house = document.createElement("li");
  textContainer.appendChild(list);

  house.innerHTML = `Hus: ${user.house}`;
  list.appendChild(house);
  const gender = document.createElement("li");
  gender.innerHTML = `Kön: ${firstBigLetter(user.gender)}`;
  list.appendChild(gender);

  const status = document.createElement("li");
  if (user.hogwartsStaff) {
    status.innerHTML = `Status: Lärare`;
  } else if (user.hogwartsStudent) {
    status.innerHTML = `Status: Student`;
  } else {
    status.innerHTML = `Status: Okänt`;
  }
  list.appendChild(status);

  const alive = document.createElement("li");
  if (user.alive) {
    alive.innerHTML = `Levande: Ja`;
  } else {
    alive.innerHTML = `Levande: Nej`;
  }
  list.appendChild(alive);

  const showMoreBtn = document.createElement("a");

  //https://medium.com/@cyberbotmachines/how-to-pass-value-from-one-html-page-to-another-using-javascript-3c9ab62df4d fick hjälp för att skicka vidare information
  showMoreBtn.href = `./character.html?character=${user.id}`;
  showMoreBtn.classList.add("house-btn");
  if (user.house === "") {
    container.classList.add("unknown");
    showMoreBtn.classList.add("unknown");
    house.innerHTML = `Hus: Okänt`;
  } else {
    showMoreBtn.classList.add(`${user.house}`);
    container.classList.add(`${user.house}`);
  }
  showMoreBtn.innerHTML = `Läs mer`;
  textContainer.appendChild(showMoreBtn);
  characterList.appendChild(container);
};
