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
const registerUser = async () => {
  const fName = document.querySelector("#fNameInput").value;
  const lName = document.querySelector("#lNameInput").value;
  const username = document.querySelector("#usernameInput").value.toLowerCase();
  const password = document.querySelector("#passwordInput").value;
  const repeatPassword = document.querySelector("#repeatPasswordInput").value;

  if (password !== repeatPassword) {
    return displayError("Passordet matchar inte");
  }
  const user = [
    {
      name: fName,
      lastname: lName,
      myFavourites: [],
      username: username,
      password: password,
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
const getData = async () => {
  try {
    const res = await fetch(database_url, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Något blev fel i databasen för verifiering av username", res.status);
    }
    const data = await res.json();
  } catch (error) {
    console.error(error);
  }
};
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