const harryPotter_URL= "https://hp-api.onrender.com/api/characters"
const userIsLoggedOut = ()=>{
    const navigationList=document.querySelector("#navigationList");
    navigationList.innerHTML="";

    const list1=document.createElement("li");
    const register=document.createElement("a");
    register.href="./register.html";
    register.classList.add("navigation-link");
    register.classList.add("register");
    register.innerHTML="Registrera";
    list1.appendChild(register);
    navigationList.appendChild(list1);

    const list2=document.createElement("li");
    const login=document.createElement("a");
    login.href="./login.html";
    login.classList.add("navigation-link");
    login.innerHTML="Logga in";
    list2.appendChild(login);
    navigationList.appendChild(list2)
}

export {userIsLoggedOut, harryPotter_URL}