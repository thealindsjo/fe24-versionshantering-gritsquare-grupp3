import { getAllUsers, patchBanned } from "./firebase.js";

export const messageDiv = document.getElementById("messageColumn");

export function displayAllUsers(userObj) {
  // Clear the message container
  messageDiv.innerHTML = "";

  for (const firebaseID in userObj) {
    // Create a message container for each user
    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    messageContainer.id = firebaseID;

    // Create and style the username element
    const userHeader = document.createElement("div");
    userHeader.className = "user-header";

    const userName = document.createElement("p");
    userName.className = "user-name";
    userName.innerText = userObj[firebaseID].userName;

    userHeader.appendChild(userName);

    // Create and style the message content
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const userMessage = document.createElement("p");
    userMessage.innerText = userObj[firebaseID].userMessage;

    messageContent.appendChild(userMessage);

    // Build the complete message container
    messageContainer.appendChild(userHeader);
    messageContainer.appendChild(messageContent);

    // Add the finished message to the main container
    messageDiv.appendChild(messageContainer);

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
              await patchBanned(firebaseID, true); 
              const users = await getAllUsers();
              displayAllUsers(users); 
            }
            else {
                const users = await getAllUsers();
              displayAllUsers(users); 
              }
          });
        }
      });
    }
  }
