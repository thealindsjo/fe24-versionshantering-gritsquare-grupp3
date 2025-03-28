import { postUser, getAllUsers } from "./firebase.js";
import { messageDiv, displayAllUsers } from "./display.js";
import { initTheme } from "./theme.js";

const toggleMenu = document.querySelector(".toggleMenu");
const menu = document.querySelector(".menu");
const messageForm = document.getElementById("addMessage");

// Initialize the theme functionality
initTheme();

toggleMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/** 
messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  var audio = new Audio('audio/pop-feature.mp3');
  audio.play();

  const userName = document.getElementById("user-name").value;
  const userMessage = document.getElementById("user-message").value;

  console.log(userName, userMessage);

  const userObj = {
    userName,
    userMessage,
  };
  await postUser(userObj);
  const users = await getAllUsers();
  displayAllUsers(users);
  //await postMessage(Obj);
});

displayAllUsers(await getAllUsers());
**/

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userName = document.getElementById("user-name").value;
  const userMessage = document.getElementById("user-message").value;

  console.log(userName, userMessage);

  const users = await getAllUsers();

  // Check if the username exists and if it's banned
  const existingUser = Object.values(users).find(
    (user) => user.userName === userName
  );

  if (existingUser && existingUser.banned) {
    alert("This username is banned, try again.");
    return;
  }

  const userObj = {
    userName,
    userMessage,
    banned: false,
  };

  const response = await postUser(userObj);

  if (response) {
    var audio = new Audio("audio/pop-feature.mp3");
    audio.play();

    const users = await getAllUsers();
    displayAllUsers(users);
  } else {
    console.error("Failed to post message");
    alert("Failed to post message, please try again");
  }

  messageForm.reset();
});

displayAllUsers(await getAllUsers());
