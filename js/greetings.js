
//magic strings

const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "userName"

//queries

const loginForm = document.querySelector('#login-form')
const loginInput = loginForm.querySelector('input')
const greeting = document.querySelector('#greeting')
const savedUser = localStorage.getItem(USERNAME_KEY);


function onLoginSubmit(event){
    event.preventDefault();
    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName);
    loginForm.classList.add(HIDDEN_CLASSNAME)
    renderGreetings(userName);
}

function renderGreetings(name){
    //const savedUser = localStorage.getItem(USERNAME_KEY); if we choose not to have arg for renderGreetings
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.textContent = `Hello ${name}`
}

if (savedUser === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}else{
    renderGreetings(savedUser);
    
}


