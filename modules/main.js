import {postUser} from './firebase.js';

const toggleMenu = document.querySelector(".toggleMenu");
const menu = document.querySelector(".menu");
const messageForm = document.getElementById('addMessage');

toggleMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});



messageForm.addEventListener('submit', async event => {
  event.preventDefault();

  const userName = document.getElementById('user-name').value;
  const userMessage = document.getElementById('user-message').value;

  console.log(userName, userMessage)

  const userObj = {
    userName,
    userMessage,
  }
  await postUser(userObj);
  //await postMessage(Obj);
});