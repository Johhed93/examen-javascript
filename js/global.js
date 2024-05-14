//Databasfunktioner

const key = "TCRU4bcWoBMSCPlYvhlY7Cyv9Z9NijWGCLGFyEAYv0Bcw05NqQ";
const database_url = "https://crudapi.co.uk/api/v1/userbase";
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };
};
const removeFromFavourties = async (character) => {
  let user;
  try {
    const res = await fetch(`${database_url}/${getLoggedInUser()}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Något blev feil i henting av bruker", res.status);
    }
    const data = await res.json();
    const findIndex = data.myFavourites.find((char) => char.id === character.id);
    user = data;
    user.myFavourites.splice(findIndex, 1);
  } catch (error) {
    console.error("Något blev feil i henting av bruker", error);
  }
  try {
    const res = await fetch(`${database_url}/${getLoggedInUser()}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("Feil i put favorit", res.status);
    }
  } catch (error) {
    console.error("Feil i put removeFromFavourites", error);
  }
};
//Login funktioner
const setLoggedInUser = (id) => {
  return sessionStorage.setItem("loggedInUser", JSON.stringify(id));
};
const getLoggedInUser = () => {
  return JSON.parse(sessionStorage.getItem("loggedInUser"));
};
const checkIfLoggedIn = () => {
  if (getLoggedInUser() === null) {
    return userIsLoggedOut();
  }
  return userIsLoggedIn();
};
//display-login state
const navigationList = document.querySelector("#navigationList");
const userIsLoggedOut = () => {
  navigationList.innerHTML = "";

  const list1 = document.createElement("li");
  const register = document.createElement("a");
  register.href = "./register.html";
  register.classList.add("navigation-link");
  register.classList.add("register");
  register.innerHTML = "Registrera";
  list1.appendChild(register);
  navigationList.appendChild(list1);

  const list2 = document.createElement("li");
  const login = document.createElement("a");
  login.href = "./login.html";
  login.classList.add("navigation-link");
  login.innerHTML = "Logga in";
  list2.appendChild(login);
  navigationList.appendChild(list2);
};
const userIsLoggedIn = () => {
  navigationList.innerHTML = "";
  const list1 = document.createElement("li");
  const myPage = document.createElement("a");
  myPage.href = "./myPage.html";
  myPage.classList.add("navigation-link");
  myPage.classList.add("my-page");
  myPage.innerHTML = "Min Sida";
  list1.appendChild(myPage);

  const list2 = document.createElement("li");
  const logOut = document.createElement("button");
  logOut.innerHTML = "Logga ut";
  logOut.classList.add("navigation-link");
  logOut.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "./index.html";
  });
  list2.appendChild(logOut);
  navigationList.appendChild(list1);
  navigationList.appendChild(list2);
};
//Help function
//från arbeidskrav 1
const firstBigLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const displayError = (message) => {
  const errorMsg = document.querySelector("#errorMsg");
  errorMsg.innerHTML = message;
  setTimeout(() => {
    errorMsg.innerHTML = "";
  }, 3000);
};
const seePassword = (input, element) => {
  if (input.type === "password") {
    element.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
    input.type = "text";
  } else {
    input.type = "password";
    element.innerHTML = `<i class="fa-solid fa-eye"></i>`;
  }
};

export {
  database_url,
  getHeaders,
  displayError,
  setLoggedInUser,
  getLoggedInUser,
  checkIfLoggedIn,
  firstBigLetter,
  seePassword,
  removeFromFavourties,
};
