import {
  database_url,
  getHeaders,
  displayError,
  setLoggedInUser,
  checkIfLoggedIn,
  seePassword,
  verifyUsername
} from "./global.js";


checkIfLoggedIn();
//hjälp av chatgpt för att konvertera till riktig tidszon prompt: "Hur konverterar jag new Date() till norsk tidzon"
//Anledning servern hanterar new Date() på sin tidzon och därför lagrades datan 2 timmar bak.
const convertTimezone=(date)=> {
  const today = new Date(date);

  
  const timeZoneOffset = datum.getTimezoneOffset();

  today.setMinutes(today.getMinutes() - timeZoneOffset);
  return today;
}
const registerUser = async () => {
  const fName = document.querySelector("#fNameInput").value;
  const lName = document.querySelector("#lNameInput").value;
  const username = document.querySelector("#usernameInput").value.toLowerCase();
  const password = document.querySelector("#passwordInput").value;
  const repeatPassword = document.querySelector("#repeatPasswordInput").value;

  if (password !== repeatPassword) {
    return displayError("Passordet matchar inte");
  }
  const date= new Date()
  const user = [
    {
      name: fName,
      lastname: lName,
      myFavourites: [],
      username: username,
      password: password,
      registerDate: convertTimezone(date),
    }
  ];
  
  try {
    if (await verifyUsername(username)) {
      return displayError("Användarnamnet finns redan");
    }
    const res = await fetch(database_url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("Något är fel i databasen", res.status);
    }
    const data = await res.json();
    succesfullRegistration(data.items[0]);
  } catch (error) {
    console.error("Något blev fel med post av använderen", error);
    displayError("Något blev fel försök igen");
  }
};

const submitFormBtn = document.querySelector("#submitFormBtn");
submitFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await registerUser();
});
const succesfullRegistration = (user) => {
  const registerForm = document.querySelector("#registerForm");
  registerForm.innerHTML = "";
  const headline = document.createElement("h2");
  headline.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Välkommen till oss ${user.name} <i class="fa-solid fa-wand-magic-sparkles"></i>`;
  const message = document.createElement("p");
  message.innerHTML = `Vi loggar dig in och skickar dig vidare till förstasidan`;
  headline.classList.add("headline");
  message.classList.add("message");

  registerForm.appendChild(headline);
  registerForm.appendChild(message);
  setLoggedInUser(user._uuid);
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 3000);
};
const seeFirstPassword= document.querySelector("#seeFirstPassword");
seeFirstPassword.addEventListener("click", ()=> {
  const password = document.querySelector("#passwordInput")
  seePassword(password,seeFirstPassword)
})
const seeRepetedPassword= document.querySelector("#seeRepetedPassword");
seeRepetedPassword.addEventListener("click", ()=>{
  const repeatPassword = document.querySelector("#repeatPasswordInput")
  seePassword(repeatPassword,seeRepetedPassword)
})
