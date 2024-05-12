import { userIsLoggedOut, harryPotter_URL, userIsLoggedIn, checkIfLoggedIn} from "./global.js";

checkIfLoggedIn()

const characterList = document.querySelector("#characterList");
const titleOfContent = document.querySelector("#titleOfContent");

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
    showHousesButton(data)
    showStatusButton(data);
    showSearchBar(data)
    
  } catch (error) {
    console.error("Något blev fel med fetchning i fetchHarryData", error);
  }
};

fetchHarryData();
const showSearchBar=(data)=> {
  const searchBar= document.querySelector("#searchBar");
  const inputField= document.createElement("input");
  inputField.classList.add("input");
  inputField.placeholder="Harry Potter";
  

  inputField.addEventListener("keyup", (e)=>{
    let input= e.target.value.toLowerCase();
    currentCharacterList=data.filter(character=>character.name.toLowerCase().includes(input))
    /* if(input.length>0 && currentCharacterList.length===-1) */
    titleOfContent.innerHTML = "Sökresultat"
    currentPage=1
    characterList.innerHTML="";
    displayData()
  })
  searchBar.appendChild(inputField);
}

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
        button.addEventListener("click", ()=>{
        if(button.value===""){
          titleOfContent.innerHTML="Alla med okänd tillhörighet"
        }else{
          titleOfContent.innerHTML = `Alla från ${house}`
        }
        currentPage=1
        currentCharacterList=data.filter(specificHouse=> specificHouse.house===button.value);
        displayData();
        })
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
    currentPage=1
    displayData()
  });
  statusClass.appendChild(student);

  const teacher = document.createElement("button");
  teacher.classList.add("house-btn");
  teacher.innerHTML = "Lärare";
  teacher.addEventListener("click", () => {
    currentPage=1
    currentCharacterList = data.filter((teacher) => teacher.hogwartsStaff === true);
    characterList.innerHTML = "";
    titleOfContent.innerHTML = "Alla anställda på hogwarts";
    displayData()
  });
  statusClass.appendChild(teacher);

  const neither = document.createElement("button");
  neither.classList.add("house-btn");
  neither.innerHTML = "Inget av det";
  neither.addEventListener("click", () => {
    currentPage=1
    characterList.innerHTML = "";
    currentCharacterList = data.filter((noth) => noth.hogwartsStaff === false && noth.hogwartsStudent === false);
    titleOfContent.innerHTML = "De som inte jobbar eller är elever på hogwarts";
    displayData();
  });
  statusClass.appendChild(neither);
};

// Fått hjälp av chatgpt med displayData() prompt "här har jag alla harry potter karaktärer som är teacher t:ex jag vill bara visa fram 12 åt gången och 
// när jag trycker på en knapp längst ner på dokumentet (inte skapat än) så ska du kunna gå igenom nästa 12 så man inte visar fram 
// 100 objekter på en gång. hur gör jag det?"
const displayData = () => {
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex= startIndex+charactersPerPage;
  const charactersToShow= currentCharacterList.slice(startIndex, endIndex)
  characterList.innerHTML="";
  showNextSet();
  charactersToShow.forEach(character=>{
    showCharacters(character)
  })
};

const showNextSet = () => {
  const showNextContainer = document.querySelector("#showNextContainer");
  showNextContainer.innerHTML=""
  if(currentCharacterList.length<12){
    return
  }
  if(currentPage>1){
    const previousButton = document.createElement("button");
    previousButton.innerHTML = `Visa föregående sida`;
    previousButton.classList.add("big-button");
    previousButton.addEventListener("click", ()=>{
            currentPage--;
            displayData();
    })
    showNextContainer.appendChild(previousButton);
  }
  const showCurrentPage= document.createElement("p");
  showCurrentPage.innerHTML=`${currentPage} / ${Math.ceil(currentCharacterList.length/charactersPerPage)}`
  showNextContainer.appendChild(showCurrentPage);

  if(currentCharacterList.length/currentPage>charactersPerPage){
  const nextButton = document.createElement("button");
  nextButton.innerHTML = `Visa nästa sida`;
  nextButton.classList.add("big-button");
  nextButton.addEventListener("click", ()=>{
    currentPage++;
      displayData();
      console.log(currentCharacterList)
    
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
  gender.innerHTML = `Kön: ${user.gender}`;
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

  const showMoreBtn = document.createElement("button");
  showMoreBtn.classList.add("house-btn");
  if (user.house === "") {
    container.classList.add("unknown");
    showMoreBtn.classList.add("unknown");
    house.innerHTML=`Hus: Okänt`
  } else {
    showMoreBtn.classList.add(`${user.house}`);
    container.classList.add(`${user.house}`)
  }
  showMoreBtn.innerHTML = `Läs mer <i class="fa-solid fa-eye"></i>`;
  textContainer.appendChild(showMoreBtn);
  characterList.appendChild(container);
};
