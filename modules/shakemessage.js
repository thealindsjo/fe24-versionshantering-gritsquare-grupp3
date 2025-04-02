
removeButton.addEventListener("click", async () => {
    shake();  
    setTimeout(async () => {
      await removeMessageById(id); // ta bort funktionen
    }, 1000);
  });
  


export function shake(){
  const allMessages = document.querySelectorAll(".message"); // Dubbelkolla om denna funkar
    allMessages.forEach((msg) => {
      const delay = Math.random() * 500;
      setTimeout(() => {
        msg.classList.add("shake");
        setTimeout(() => {
          msg.classList.remove("shake");
        }, 1000);
      }, delay);
    });
}