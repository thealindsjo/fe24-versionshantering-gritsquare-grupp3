export function addPinFunctionality(messageContainer, messageDiv) {
    const pinButton = document.createElement("button");
    pinButton.className = "pin-button";
    pinButton.innerHTML = '<i class="fa-solid fa-thumbtack" style="transform: rotate(45deg);"></i> Pin';
  
    let isPinned = false;
    let originalNextSibling = null;
  
    pinButton.addEventListener("click", () => {
      if (!isPinned) {
        originalNextSibling = messageContainer.nextSibling;
        messageDiv.insertBefore(messageContainer, messageDiv.firstChild);
        messageContainer.classList.add("pinned");
        pinButton.innerHTML = '<i class="fa-solid fa-thumbtack"></i> Unpin';
        isPinned = true;
      } else {
        messageContainer.classList.remove("pinned");
        pinButton.innerHTML = '<i class="fa-solid fa-thumbtack" style="transform: rotate(45deg);"></i> Pin';
        isPinned = false;
  
        if (
          originalNextSibling &&
          originalNextSibling.parentNode === messageDiv
        ) {
          messageDiv.insertBefore(messageContainer, originalNextSibling);
        } else {
          messageDiv.appendChild(messageContainer);
        }
      }
    });
  
    const footer = document.createElement("div");
    footer.className = "message-footer";
    footer.appendChild(pinButton);
  
    messageContainer.appendChild(footer);
  }