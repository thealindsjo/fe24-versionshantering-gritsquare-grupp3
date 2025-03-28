import { getAllUsers, patchBanned } from "./firebase.js";

export const messageDiv = document.getElementById("messageColumn");

export function displayAllUsers(userObj) {
  // Clear the message container
  messageDiv.innerHTML = "";

  // Array of pleasant, readable background colors for messages
  const colors = [
    "#FFD6A5", // Light orange
    "#CAFFBF", // Light green
    "#9BF6FF", // Light blue
    "#BDB2FF", // Light purple
    "#FFC6FF", // Light pink
    "#FDFFB6", // Light yellow
    "#A0C4FF", // Light sky blue
    "#FFADAD", // Light red
    "#D7E3FC", // Very light blue
    "#E2CFC4", // Light brown
    "#F1C0E8", // Light magenta
    "#CFBAF0", // Lavender
  ];

  for (const firebaseID in userObj) {
    // Create a message container for each user
    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    messageContainer.id = firebaseID;

    // Assign a random color to this message
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    messageContainer.style.setProperty("--random-color", randomColor);

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
