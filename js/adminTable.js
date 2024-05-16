import {
  getHeaders,
  database_url,
  checkIfLoggedIn,
  getLoggedInUser,
  deleteUser,
} from "./global.js";
checkIfLoggedIn();

const userContainer = document.querySelector("#userContainer");
const myPageContainer = document.querySelector("#myPageContainer");
const headline = document.querySelector("#headline");

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
fetchData();
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

const showData = (data) => {
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
