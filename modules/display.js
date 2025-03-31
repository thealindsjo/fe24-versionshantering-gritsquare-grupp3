import { getAllUsers, patchBanned, updateUserStatus } from "./firebase.js";
import { updateLikeDislikeFirebase } from "./firebase.js";
import { addPinFunctionality } from "./pin.js";

export const messageDiv = document.getElementById("messageColumn");

export function displayAllUsers(userObj) {
  // messageDiv.innerHTML = "";

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#FFC300",
    "#DAF7A6",
    "#C70039",
    "#900C3F",
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

    // --- Like / Dislike knappar ---
    const likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.innerText = "👍 ";
    const likeSpan = document.createElement("span");
    likeSpan.innerText = userObj[firebaseID].like || "0";
    likeButton.appendChild(likeSpan);

    const dislikeButton = document.createElement("button");
    dislikeButton.className = "dislike-button";
    dislikeButton.innerText = "👎 ";
    const dislikeSpan = document.createElement("span");
    dislikeSpan.innerText = userObj[firebaseID].dislike || "0";
    dislikeButton.appendChild(dislikeSpan);

    likeButton.addEventListener("click", async () => {
      try {
        const updated = await updateLikeDislikeFirebase(firebaseID, "like");
        if (updated) {
          likeSpan.innerText = updated.like;
          dislikeSpan.innerText = updated.dislike;
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
        }
      } catch (error) {
        console.error(error);
      }
    });

    messageContainer.appendChild(likeButton);
    messageContainer.appendChild(dislikeButton);

    // Lägg till en knapp för att uppdatera användarstatus
    const statusButton = document.createElement("button");
    statusButton.className = "status-button";
    statusButton.innerText = "Change Status"; // Denna knapp låter administratören uppdatera statusen
    userHeader.appendChild(statusButton);

    statusButton.addEventListener("click", async () => {
      const newStatus = prompt("Enter new status (e.g., 'active', 'inactive'):", "active");
      if (newStatus) {
        try {
          const updatedUser = await updateUserStatus(firebaseID, newStatus);
          console.log("Användarstatus uppdaterad:", updatedUser);
          alert("User status updated successfully!");
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      }
    });

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

    // Befintlig funktion för att banna användare
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
      const users = await getAllUsers();
      displayAllUsers(users);
    } else {
      console.log(`Failed to delete user with ID: ${id}`);
    }
  } catch (error) {
    console.error(`Error removing message with ID: ${id}, error`);
  }
}
