const applyBtn = document.getElementById("applyBtn");
const textarea = document.getElementById("blockedWords");
const savedWords = document.getElementById("savedWords"); // Save the blocked words to the storage
applyBtn.addEventListener("click", () => {
const blockedWordsStr = textarea.value;
chrome.storage.local.set({ blockedWords: blockedWordsStr }, () => {
// Update the displayed saved words after saving
displaySavedWords(blockedWordsStr);
});
}); // Display saved words
function displaySavedWords(blockedWordsStr) {
const blockedWordsArray = blockedWordsStr
.split(",")
.map((word) => word.trim())
.filter((word) => word.length > 0); // Create an unordered list to display the words
const ul = document.createElement("ul");
for (const word of blockedWordsArray) {
const li = document.createElement("li");
li.textContent = word;
ul.appendChild(li);
} // Clear the current saved words and append the new list
savedWords.innerHTML = "";
savedWords.appendChild(ul);
} // Load the blocked words when the popup is opened and display them at the top
chrome.storage.local.get("blockedWords", ({ blockedWords }) => {
textarea.value = blockedWords;
displaySavedWords(blockedWords);
});