import {
  getHeaders,
  database_url,
  checkIfLoggedIn,
  getLoggedInUser,
  deleteUser,
  verifyAuth
} from "./global.js";
checkIfLoggedIn();

const userContainer = document.querySelector("#userContainer");
const myPageContainer = document.querySelector("#myPageContainer");
const headline = document.querySelector("#headline");
const verifyStatus= async ()=> {
  if(getLoggedInUser()===null){
    return window.location="./index.html"
  }
  if(!await verifyAuth()){
  return window.location="./index.html"
  }
  fetchData();
}
verifyStatus()
const fetchData = async () => {
  const res = await fetch(database_url, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error("Något blev feil i databasen fetchData", res.status);
  }
  const data = await res.json();
  showData(data.items);
  userContainer.innerHTML = "";
  data.items.forEach((user) => {
    showUsers(user);
  });
};

const confirmDelete = (user) => {
  const div = document.createElement("div");
  div.classList.add("delete-container");
  div.classList.add("centered-element");
  const text = document.createElement("p");
  text.classList.add("large-text");
  text.innerHTML = `Är du säker du vill radera ${user.username}`;
  div.appendChild(text);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.classList.add("bigger-btn");
  deleteBtn.classList.add("green");
  deleteBtn.innerHTML = `Ja`;
  deleteBtn.addEventListener("click", async () => {
    await deleteUser(user._uuid);
    await fetchData();
  });

  btnContainer.appendChild(deleteBtn);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("bigger-btn");
  closeBtn.classList.add("delete-btn");
  closeBtn.innerHTML = `Nej`;
  closeBtn.addEventListener("click", () => {
    div.remove();
  });
  btnContainer.appendChild(closeBtn);
  div.appendChild(btnContainer);
  myPageContainer.appendChild(div);
};
const registredToday = (data) => {
  const today = new Date();
  const allNewMembers = data.filter((newMembers) => {
    const timestamp = new Date(newMembers.registerDate);
    return (
      timestamp.getFullYear() === today.getFullYear() &&
      timestamp.getMonth() === today.getMonth() &&
      timestamp.getDate() === today.getDate()
    );
  });
  return allNewMembers;
};
const monthlyRegistred = (data) => {
  const today = new Date();
  const allNewMembers = data.filter((newMembers) => {
    const timestamp = new Date(newMembers.registerDate);
    return (
      timestamp.getFullYear() === today.getFullYear() && timestamp.getMonth() === today.getMonth()
    );
  });
  return allNewMembers;
};
const updateUser = async (data) => {
  try {
    const res = await fetch(`${database_url}/${data._uuid}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("feil i database updateuser", res.status);
    }
  } catch (error) {
    console.error("feil i update", error);
  }
};
const showData = (data) => {
  myPageContainer.innerHTML = "";
  const firstRow = document.createElement("div");
  firstRow.classList.add("first-row");

  const todayContainer = document.createElement("div");
  todayContainer.classList.add("box");
  todayContainer.addEventListener("click", () => {
    userContainer.innerHTML = "";
    headline.innerHTML = "Alla som registrerat idag";
    const newMembers = registredToday(data);
    newMembers.forEach((member) => {
      showUsers(member);
    });
  });

  const todayIcon = document.createElement("span");
  todayIcon.classList.add("icon");
  todayIcon.innerHTML = `<i class="fa-solid fa-user-plus"></i>`;
  todayContainer.appendChild(todayIcon);
  const membersToday = document.createElement("p");
  membersToday.classList.add("large-text");
  membersToday.innerHTML = `${registredToday(data).length} nya medlemmar idag`;
  todayContainer.appendChild(membersToday);
  firstRow.appendChild(todayContainer);
  myPageContainer.appendChild(firstRow);

  const monthContainer = document.createElement("div");
  monthContainer.classList.add("box");
  monthContainer.addEventListener("click", () => {
    userContainer.innerHTML = "";
    headline.innerHTML = `Alla som registrerat sig denna månaden`;
    const newMembers = monthlyRegistred(data);
    newMembers.forEach((member) => {
      showUsers(member);
    });
  });
  const monthIcon = document.createElement("span");
  monthIcon.classList.add("icon");
  monthIcon.innerHTML = `<i class="fa-regular fa-calendar-days"></i>`;
  const membersMonth = document.createElement("p");
  membersMonth.classList.add("large-text");
  membersMonth.innerHTML = `${monthlyRegistred(data).length} nya medlemmar denna månaden`;
  monthContainer.appendChild(monthIcon);
  monthContainer.appendChild(membersMonth);
  firstRow.appendChild(monthContainer);

  const allContainer = document.createElement("div");
  allContainer.classList.add("box");
  allContainer.addEventListener("click", () => {
    headline.innerHTML = "Alla medlemmar";
    userContainer.innerHTML = "";
    data.forEach((user) => {
      showUsers(user);
    });
  });
  const allIcon = document.createElement("span");
  allIcon.classList.add("icon");
  allIcon.innerHTML = `<i class="fa-solid fa-users"></i>`;
  const allMembers = document.createElement("p");
  allMembers.classList.add("large-text");
  allMembers.innerHTML = `${data.length} medlemmar totalt`;
  allContainer.appendChild(allIcon);
  allContainer.appendChild(allMembers);
  firstRow.appendChild(allContainer);
};
const showUsers = (user) => {
  const li = document.createElement("li");
  const container = document.createElement("div");
  container.classList.add("user-info");
  li.appendChild(container);
  const fName = document.createElement("p");
  fName.innerHTML = `Firstname: ${user.name}`;
  container.appendChild(fName);

  const lastname = document.createElement("p");
  lastname.innerHTML = `Lastname: ${user.lastname}`;
  container.appendChild(lastname);

  const username = document.createElement("p");
  username.innerHTML = `Username: ${user.username}`;
  container.appendChild(username);

  const password = document.createElement("p");
  password.innerHTML = `PW: ${user.password}`;
  container.appendChild(password);

  const status = document.createElement("p");
  status.innerHTML = `Status: ${user.status}`;
  container.appendChild(status);

  const activity = document.createElement("p");
  activity.innerHTML = `Aktivitet: ${user.myFavourites.length}`;
  container.appendChild(activity);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btn-container");
  const change = document.createElement("button");
  change.innerHTML = `<i class="fa-solid fa-gear"></i>`;
  change.classList.add("interface");
  change.addEventListener("click", () => {
    editUser(user);
  });
  buttonContainer.appendChild(change);

  const remove = document.createElement("button");
  remove.classList.add("delete-btn");
  remove.innerHTML = `Ta bort`;
  remove.addEventListener("click", () => {
    confirmDelete(user);
  });
  buttonContainer.appendChild(remove);
  container.appendChild(buttonContainer);
  userContainer.appendChild(li);
};
const editUser = (data) => {
  const container = document.createElement("div");
  container.classList.add("delete-container");
  container.classList.add("centered-element");
  const headline = document.createElement("h2");
  headline.innerHTML = `Uppdatera ${data.username} innehåll`;
  container.append(headline);
  const xBtn = document.createElement("button");
  xBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
  xBtn.classList.add("x-btn");
  xBtn.addEventListener("click", () => {
    container.remove();
  });
  container.appendChild(xBtn);
  const form = document.createElement("form");
  form.classList.add("form-field");

  const fNameInputBox = document.createElement("div");
  fNameInputBox.classList.add("input-box");
  const fNameLabel = document.createElement("label");
  fNameLabel.setAttribute("for", "fNameInput");
  fNameLabel.innerHTML = `tidagare förnavn ${data.name}`;
  const fNameInput = document.createElement("input");
  fNameInput.classList.add("inputs");
  fNameInput.value = data.name;
  fNameInputBox.appendChild(fNameLabel);
  fNameInputBox.appendChild(fNameInput);

  const lNameInputBox = document.createElement("div");
  lNameInputBox.classList.add("input-box");
  const lNameLabel = document.createElement("label");
  lNameLabel.setAttribute("for", "lNameInput");
  lNameLabel.innerHTML = `tidagare efternavn ${data.lastname}`;
  const lNameInput = document.createElement("input");
  lNameInput.classList.add("inputs");
  lNameInput.value = data.lastname;
  lNameInputBox.appendChild(lNameLabel);
  lNameInputBox.appendChild(lNameInput);

  const usernameInputBox = document.createElement("div");
  usernameInputBox.classList.add("input-box");
  const usernameLabel = document.createElement("label");
  usernameLabel.setAttribute("for", "usernameInput");
  usernameLabel.innerHTML = `tidagare användarnamn ${data.username}`;
  const usernameInput = document.createElement("input");
  usernameInput.classList.add("inputs");
  usernameInput.value = data.username;

  usernameInputBox.appendChild(usernameLabel);
  usernameInputBox.appendChild(usernameInput);

  const passwordInputBox = document.createElement("div");
  passwordInputBox.classList.add("input-box");
  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "passwordInput");
  passwordLabel.innerHTML = `tidagare lösenord ${data.password}`;
  const passwordInput = document.createElement("input");
  passwordInput.classList.add("inputs");
  passwordInput.value = data.password;
  passwordInputBox.appendChild(passwordLabel);
  passwordInputBox.appendChild(passwordInput);

  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("delete-btn");
  confirmButton.style.padding = "10px 0";
  confirmButton.innerHTML = `Bekräfta`;
  confirmButton.type = "submit";
  confirmButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!fNameInput.value || !lNameInput.value || !usernameInput.value || !passwordInput.value) {
      return (errorMsg.innerHTML = "Du måste fylla i alla fält");
    }
    if (
      fNameInput.value === data.name &&
      lNameInput.value === data.lastname &&
      usernameInput.value === data.username &&
      passwordInput.value === data.password
    ) {
      return (errorMsg.innerHTML = "Du måste ändra någon av värdena");
    }
    data.name = fNameInput.value;
    data.lastname = lNameInput.value;
    data.username = usernameInput.value;
    data.password = passwordInput.value;
    await updateUser(data);
    container.remove();
    await fetchData();
  });

  form.appendChild(fNameInputBox);
  form.appendChild(lNameInputBox);
  form.appendChild(usernameInputBox);
  form.appendChild(passwordInputBox);
  form.appendChild(errorMsg);
  form.appendChild(confirmButton);
  container.appendChild(form);

  myPageContainer.appendChild(container);
};
