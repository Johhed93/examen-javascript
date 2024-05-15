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
const myPageContainer = document.querySelector("#myPageContainer");
const fetchUser = async () => {
  try {
    const res = await fetch(`${database_url}/${getLoggedInUser()}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await res.json();
    myPageContainer.innerHTML = "";
    showUser(data);
  } catch (error) {
    console.error("Feil i henting av bruker", error);
  }
};
fetchUser();

const showUser = (user) => {
  const firstRow = document.createElement("div");
  firstRow.classList.add("first-row");
  const profileContainer = document.createElement("div");
  firstRow.appendChild(profileContainer);
  profileContainer.classList.add("profile-container");
  const headline = document.createElement("h1");
  headline.innerHTML = "Min profil";
  profileContainer.appendChild(headline);

  const usernameBox = document.createElement("div");
  usernameBox.classList.add("edit-user-box");
  const usernameTextContainer = document.createElement("div");
  usernameTextContainer.classList.add("text-box");
  const usernameTitle = document.createElement("p");
  usernameTitle.innerHTML = `Användarnamn:`;
  const usernameText = document.createElement("p");
  usernameText.innerHTML = user.username;
  usernameTextContainer.appendChild(usernameTitle);
  usernameTextContainer.appendChild(usernameText);
  usernameBox.appendChild(usernameTextContainer);
  const editUsername = document.createElement("button");
  editUsername.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  editUsername.classList.add("edit-btn");
  editUsername.addEventListener("click", () => {
    editState(user, "username", myPageContainer);
  });
  usernameBox.appendChild(editUsername);
  profileContainer.appendChild(usernameBox);

  const nameBox = document.createElement("div");
  nameBox.classList.add("edit-user-box");
  const nameTextContainer = document.createElement("div");
  nameTextContainer.classList.add("text-box");
  const nameTitle = document.createElement("p");
  nameTitle.innerHTML = `Förnavn:`;
  const nameText = document.createElement("p");
  nameText.innerHTML = user.name;
  nameTextContainer.appendChild(nameTitle);
  nameTextContainer.appendChild(nameText);
  nameBox.appendChild(nameTextContainer);
  const editName = document.createElement("button");
  editName.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  editName.classList.add("edit-btn");
  editName.addEventListener("click", () => {
    editState(user, "name", myPageContainer);
  });

  nameBox.appendChild(editName);
  profileContainer.appendChild(nameBox);

  const lastNameBox = document.createElement("div");
  lastNameBox.classList.add("edit-user-box");
  const lNameTextContainer = document.createElement("div");
  lNameTextContainer.classList.add("text-box");
  const lNameTitle = document.createElement("p");
  lNameTitle.innerHTML = `Efternavn:`;
  const lNameText = document.createElement("p");
  lNameText.innerHTML = ` ${user.lastname}`;
  lNameTextContainer.appendChild(lNameTitle);
  lNameTextContainer.appendChild(lNameText);
  lastNameBox.appendChild(lNameTextContainer);
  const editLName = document.createElement("button");
  editLName.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  editLName.classList.add("edit-btn");
  editLName.addEventListener("click", () => {
    editState(user, "lastname", myPageContainer);
  });
  lastNameBox.appendChild(editLName);
  profileContainer.appendChild(lastNameBox);

  const passwordBox = document.createElement("div");
  passwordBox.classList.add("edit-user-box");
  const passwordTextContainer = document.createElement("div");
  passwordTextContainer.classList.add("text-box");
  const passwordTitle = document.createElement("p");
  passwordTitle.innerHTML = `Passord:`;
  const passwordText = document.createElement("p");
  passwordText.innerHTML = `*****`;
  passwordTextContainer.appendChild(passwordTitle);
  passwordTextContainer.appendChild(passwordText);
  passwordBox.appendChild(passwordTextContainer);
  const editpassword = document.createElement("button");
  editpassword.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  editpassword.classList.add("edit-btn");
  editpassword.addEventListener("click", () => {
    editPasswordState(user, "password", myPageContainer);
  });
  passwordBox.appendChild(editpassword);
  profileContainer.appendChild(passwordBox);

  const userActions = document.createElement("div");
  userActions.classList.add("profile-container");
  firstRow.appendChild(userActions);
  const userTitle = document.createElement("h2");
  userTitle.style.fontSize = "2rem";
  userTitle.style.width = "289px";
  userTitle.innerHTML = `Användarcenter`;
  userActions.appendChild(userTitle);

  const signOut = document.createElement("button");
  signOut.classList.add("house-btn");
  signOut.innerHTML = "Logga ut";
  signOut.classList.add("unknown");
  userActions.appendChild(signOut);

  const deleteAccount = document.createElement("button");
  deleteAccount.classList.add("house-btn");
  deleteAccount.classList.add("Gryffindor");
  deleteAccount.innerHTML = `Radera konto`;
  userActions.appendChild(deleteAccount);

  myPageContainer.appendChild(firstRow);

  const myFavouritesList = document.createElement("div");
  myFavouritesList.classList.add("profile-container");
  myFavouritesList.style.width = "100%";
  const favouritesHeadline = document.createElement("h2");
  favouritesHeadline.style.fontSize = "2rem";
  favouritesHeadline.innerHTML = `Mina favoriter`;
  myFavouritesList.appendChild(favouritesHeadline);
  myPageContainer.appendChild(myFavouritesList);

  const list = document.createElement("ul");
  list.classList.add("list");
  myFavouritesList.appendChild(list);

  if (user.myFavourites.length === 0) {
    const li = document.createElement("li");
    const container = document.createElement("div");
    container.classList.add("list-element");
    const message = document.createElement("p");
    message.innerHTML = "Det ser ut som du inte har hittat någon favorit än";
    const link = document.createElement("a");
    link.classList.add("link");
    link.href = "./index.html";
    link.innerHTML = `Hitta favoriter`;
    list.appendChild(li);
    li.appendChild(container);

    container.appendChild(message);
    container.appendChild(link);
  } else {
    user.myFavourites.forEach((char) => {
      const li = document.createElement("li");

      const container = document.createElement("div");
      container.classList.add("list-element");

      li.appendChild(container);
      const picture = document.createElement("img");
      picture.classList.add("picture");
      picture.src = char.image;

      const name = document.createElement("p");
      name.innerHTML = char.name;

      const house = document.createElement("p");
      if (char.house === "") {
        house.innerHTML = "Hus okänt";
        house.classList.add("unknown");
      } else {
        house.innerHTML = `${char.house}`;
        house.classList.add(`${char.house}`);
      }
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");
      const seeMore = document.createElement("a");
      seeMore.href = `./character.html?character=${char.id}`;
      seeMore.innerHTML = "Läs mer";
      seeMore.classList.add("link");
      btnContainer.appendChild(seeMore);
      const remove = document.createElement("button");
      remove.classList.add("button");
      remove.innerHTML = "Ta bort";
      remove.addEventListener("click", async () => {
        await removeFromFavourties(char);
        await fetchUser();
      });
      btnContainer.appendChild(remove);
      container.appendChild(picture);
      container.appendChild(name);
      container.appendChild(house);
      container.appendChild(btnContainer);
      list.appendChild(li);
    });
  }
};

const updateUser = async (data) => {
  try {
    const res = await fetch(`${database_url}/${getLoggedInUser()}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Något blev feil i uppdatering av bruker", error);
  }
};
const editState = (user, object, parent) => {
  const editProfileContainer = document.createElement("div");
  editProfileContainer.classList.add("profile-container");
  editProfileContainer.classList.add("position-absolute");

  const headline = document.createElement("h2");
  headline.innerHTML = `Redigera ${object}: ${user[object]}`;
  editProfileContainer.appendChild(headline);
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("inputs");
  input.placeholder = user[object];
  
  const wrongText= document.createElement("p");
  wrongText.style.color="red";
  

  const submitButton = document.createElement("button");
  submitButton.innerHTML = "Uppdatera";
  submitButton.style.marginTop = "50px";
  submitButton.style.border = "none";
  submitButton.style.width = "300px";
  submitButton.classList.add("link");
  submitButton.addEventListener("click", async () => {
    if (!input.value) {
      return wrongText.innerHTML="Du måste skriva något";
    }
    if (input.value === user[object]) {
      return wrongText.innerHTML="Du måste uppdatera till ett annat verdi";
    }
    if (object === "username") {
      if (await verifyUsername(input.value.toLowerCase())) {
        return wrongText.innerHTML="Detta användernamnet är upptaget";
      }
    }
    user[object] = input.value;
    await updateUser(user);
    await fetchUser();
    editProfileContainer.remove();
  });

  const removeButton = document.createElement("button");
  removeButton.innerHTML = `<i class="fa-solid fa-x"></i>`;
  removeButton.classList.add("x-btn");

  removeButton.addEventListener("click", function () {
    editProfileContainer.remove();
  });

  editProfileContainer.appendChild(input);
  editProfileContainer.appendChild(wrongText)
  editProfileContainer.appendChild(submitButton);
  editProfileContainer.appendChild(removeButton);

  parent.appendChild(editProfileContainer);
};
const editPasswordState = (user, object, parent) => {
  const editProfileContainer = document.createElement("div");
  editProfileContainer.classList.add("profile-container");
  editProfileContainer.classList.add("position-absolute");

  const headline = document.createElement("h2");
  headline.innerHTML = `Redigera passord`;
  editProfileContainer.appendChild(headline);

  const oldContainer = document.createElement("div");
  oldContainer.classList.add("input-box");
  const oldText = document.createElement("label");
  oldText.innerHTML = `Gammalt lösenord`;
  oldContainer.appendChild(oldText);

  const oldInputContainer = document.createElement("div");
  oldInputContainer.classList.add("password-container");
  const oldPassword = document.createElement("input");
  oldPassword.type = "password";
  oldPassword.classList.add("inputs");
  oldPassword.placeholder = `****`;
  const seeOldPassword = document.createElement("button");
  seeOldPassword.classList.add("change-state");
  seeOldPassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
  seeOldPassword.addEventListener("click", () => {
    seePassword(oldPassword, seeOldPassword);
  });
  oldInputContainer.appendChild(oldPassword);
  oldInputContainer.appendChild(seeOldPassword);
  oldContainer.appendChild(oldInputContainer);
  editProfileContainer.appendChild(oldContainer);

  const newContainer = document.createElement("div");
  newContainer.style.marginTop="10px"
  newContainer.classList.add("input-box");
  const newText = document.createElement("label");
  newText.innerHTML = `Nytt lösenord`;
  newContainer.appendChild(newText);

  const newInputContainer = document.createElement("div");
  newInputContainer.classList.add("password-container");
  const newPassword = document.createElement("input");
  newPassword.type = "password";
  newPassword.classList.add("inputs");
  newPassword.placeholder = `****`;
  const seeNewPassword = document.createElement("button");
  seeNewPassword.classList.add("change-state");
  seeNewPassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
  seeNewPassword.addEventListener("click", () => {
    seePassword(newPassword, seeNewPassword);
  });
  newInputContainer.appendChild(newPassword);
  newInputContainer.appendChild(seeNewPassword);
  newContainer.appendChild(newInputContainer);
  editProfileContainer.appendChild(newContainer);

  const reContainer = document.createElement("div");
  reContainer.classList.add("input-box");
  const reText = document.createElement("label");
  reText.innerHTML = `Gammalt lösenord`;
  reContainer.appendChild(reText);

  const reInputContainer = document.createElement("div");
  reInputContainer.classList.add("password-container");
  const rePassword = document.createElement("input");
  rePassword.type = "password";
  rePassword.classList.add("inputs");
  rePassword.placeholder = `****`;
  const seeRePassword = document.createElement("button");
  seeRePassword.classList.add("change-state");
  seeRePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
  seeRePassword.addEventListener("click", () => {
    seePassword(rePassword, seeRePassword);
  });
  reInputContainer.appendChild(rePassword);
  reInputContainer.appendChild(seeRePassword);
  reContainer.appendChild(reInputContainer);
  editProfileContainer.appendChild(reContainer);
  const wrongText= document.createElement("p");
  wrongText.style.color="red";
  editProfileContainer.appendChild(wrongText)
  

  const submitButton = document.createElement("button");
  submitButton.innerHTML = "Uppdatera";
  submitButton.style.marginTop = "50px";
  submitButton.style.border = "none";
  submitButton.style.width = "300px";
  submitButton.classList.add("link");
  submitButton.addEventListener("click", async () => {
    if(oldPassword.value !== user.password){
        return wrongText.innerHTML="Detta lösenord matchar inte ditt gamla lösenord"
    }
    if(newPassword.value !== rePassword.value){
        return wrongText.innerHTML= "Ditt nya lösenord matchar inte"
    }
    if(newPassword.value === user.password){
        return wrongText.innerHTML="Du måste uppdatera lösenordet till ett nytt"
    }
    user[object] = newPassword.value;
    await updateUser(user);
    await fetchUser();
    editProfileContainer.remove();
  });

  const removeButton = document.createElement("button");
  removeButton.innerHTML = `<i class="fa-solid fa-x"></i>`;
  removeButton.classList.add("x-btn");

  removeButton.addEventListener("click", function () {
    editProfileContainer.remove();
  });

  editProfileContainer.appendChild(submitButton);
  editProfileContainer.appendChild(removeButton);

  parent.appendChild(editProfileContainer);
};