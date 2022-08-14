const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

const loginContainer = document.querySelector('.login');
const loginForm = document.getElementById('loginForm');
const loginInput = document.getElementById('userName');
const mainContainer = document.querySelector('.main');
const greeting = document.getElementById('greeting');
const logout = document.getElementById('logout');
const images = ['0.png', '1.png', '2.png', '3.png'];
const profile = document.getElementById('profileImg');

function onLoginSubmit(e) {
    // page refresh prevent
    e.preventDefault();
    
    loginContainer.classList.add(HIDDEN_CLASSNAME);
    const userName = loginInput.value;

    // save username
    localStorage.setItem(USERNAME_KEY, userName);

    paint(userName);
}

function paint(userName) {
    greeting.innerText = `${userName}`;
    mainContainer.classList.remove(HIDDEN_CLASSNAME);

    // profile 이미지 변경
    const chosenImage = images[Math.floor(Math.random() * images.length)];
    profile.src = `img/${chosenImage}`;
}

function onLogOut(e) {
    loginContainer.classList.remove(HIDDEN_CLASSNAME);
    mainContainer.classList.add(HIDDEN_CLASSNAME);
    localStorage.removeItem(USERNAME_KEY);
}

logout.addEventListener('click', onLogOut);

// 스토리지에 저장된 정보 불러오기
const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
    loginContainer.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit);
} else {
    paint(savedUsername);
}