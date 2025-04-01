import { getAllUsers, patchBanned } from "./firebase.js";
import { updateLikeDislikeFirebase } from "./firebase.js";
import { addPinFunctionality } from "./pin.js";

// import { ref, set } from "firebase/database"; // Antag att du använder Firebase Realtime Database
// import { database } from "./firebase.js"; // Antag att du har din database-instans i firebase.js

export const messageDiv = document.getElementById("messageColumn");

// la till dislike och like knappar, Vill ni styla dom så är classnamnen "like-button" och "dislike-button"/Matti
export function displayAllUsers(userObj) {
  // messageDiv.innerHTML = "";

  const colors = [
    "#FFB3BA", // Light Red
    "#FFDFBA", // Light Orange
    "#FFFFBA", // Light Yellow
    "#BAFFC9", // Light Green
    "#BAE1FF", // Light Blue
    "#E2BAFF", // Light Purple
    "#FFC8DD", // Pastel Pink
    "#A0E7E5"  // Pastel Cyan
  ];

  for (const firebaseID in userObj) {
    if (document.getElementById(firebaseID)) {
      continue;
    }

    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    messageContainer.id = firebaseID;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    messageContainer.style.setProperty("--random-color", randomColor);

    const userHeader = document.createElement("div");
    userHeader.className = "user-header";

    const userName = document.createElement("p");
    userName.className = "user-name";
    userName.innerText = userObj[firebaseID].userName;
    userHeader.appendChild(userName);

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const userMessage = document.createElement("p");
    userMessage.innerText = userObj[firebaseID].userMessage;
    messageContent.appendChild(userMessage);

    messageContainer.appendChild(userHeader);
    messageContainer.appendChild(messageContent);
    addPinFunctionality(messageContainer, messageDiv);
    messageDiv.insertBefore(messageContainer, messageDiv.firstChild);


    // --- Like / Dislike knappar ---
    const likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.innerHTML = '<i class="fa-solid fa-heart"></i> ';
    const likeSpan = document.createElement("span");
    likeSpan.innerText = userObj[firebaseID].like || "0";
    likeButton.appendChild(likeSpan);

    const dislikeButton = document.createElement("button");
    dislikeButton.className = "dislike-button";
    dislikeButton.innerHTML = '<i class="fa-solid fa-heart-crack"></i> ';
    const dislikeSpan = document.createElement("span");
    dislikeSpan.innerText = userObj[firebaseID].dislike || "0";
    dislikeButton.appendChild(dislikeSpan);

    likeButton.addEventListener("click", async () => {
      try {
        const updated = await updateLikeDislikeFirebase(firebaseID, "like");
        if (updated) {
          likeSpan.innerText = updated.like;
          dislikeSpan.innerText = updated.dislike;

          likeButton.classList.add('flash-green');
          setTimeout(() => likeButton.classList.remove('flash-green'), 500);
        }
      } catch (error) {
        console.error(error);
      }
    });

    dislikeButton.addEventListener("click", async () => {
      try {
        const updated = await updateLikeDislikeFirebase(firebaseID, "dislike");
        if (updated) {
          likeSpan.innerText = updated.like;
          dislikeSpan.innerText = updated.dislike;

          dislikeButton.classList.add('flash-red');
          setTimeout(() => dislikeButton.classList.remove('flash-red'), 500);
        }
      } catch (error) {
        console.error(error);
      }
    });

    messageContainer.appendChild(likeButton);
    messageContainer.appendChild(dislikeButton);

     //lägger till nyaste meddelanden längst upp utan att behöva ändra från objekt till array
    messageDiv.insertBefore(messageContainer, messageDiv.firstChild);
    // Ni kan ändra animationen här om ni vill. / Matti
    anime({
      targets: messageContainer,
      opacity: [0, 1],
      translateX: [-200, 0],
      scale: [0.5, 1],
      duration: 800,
      easing: "easeOutCubic",
    });

     // Befintlig funktion för ban och ta bort

    userHeader.addEventListener("click", async (event) => {
      event.preventDefault();
      document.querySelectorAll(".ban-button").forEach((btn) => btn.remove());
      if (!userHeader.querySelector(".ban-button")) {
        const banButton = document.createElement("button");
        banButton.className = "ban-button";
        banButton.innerText = "Ban";
        userHeader.appendChild(banButton);
        banButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const confirmBan = confirm("Do you want to ban this user?");
            if (confirmBan) {
                await patchBanned(userName.innerText, true);
                const users = await getAllUsers();
                displayAllUsers(users);
            } else {
                const users = await getAllUsers();
                displayAllUsers(users);
            }
        });
    }
});


    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    messageContainer.appendChild(removeButton);
    removeButton.addEventListener("click", async () => {
      console.log(firebaseID);
      await removeMessageById(firebaseID);
      const allMessages = document.querySelectorAll(".message");
      allMessages.forEach((message) => {
        const delay = Math.random() * 500;
        setTimeout(() => {
          message.classList.add("shake");
          setTimeout(() => {
            message.classList.remove("shake");
          }, 1000);
        }, delay);
      });
    });
  }
}

export async function removeMessageById(id) {
  try {
    const url = `https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`;
    const options = {
      method: "DELETE",
    };
    const res = await fetch(url, options);
    if (res.ok) {
      console.log(`User with ID: ${id} removed successfully.`);
      document.getElementById(id)?.remove();
      const users = await getAllUsers();
      displayAllUsers(users);
    } else {
      console.log(`Failed to delete user with ID: ${id}`);
    }
  } catch (error) {
    console.error(`Error removing message with ID: ${id}, error`);
  }
}
