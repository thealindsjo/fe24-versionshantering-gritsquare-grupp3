async function removeMessageById(id) {
  try {
    const messageRef = ref(database, `messages/${id}`);
    await set(messageRef, null);
    console.log(`Message with ID: ${id} removed successfully.`);
  } catch (error) {
    console.error(`Error removing message with ID: ${id}, error`);
  }
}

const removeButton = document.createElement("button");
removeButton.textContent = "❌";
removeButton.classList.add("removeButton");

removeButton.addEventListener("click", async () => {
  console.log(id);
  removeMessageById(id);
  const allmessages = document.querySelectorAll(".message");
});
