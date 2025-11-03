let score = 0;

// === 1. Rätta svar – färga även hela meningen ===
function evaluateAnswer(select) {
  const correct = select.dataset.correct.trim();
  const value = select.value.trim();
  const sentenceContainer = select.closest(".sentence");
  const selects = sentenceContainer.querySelectorAll("select");

  // Färga individuellt
  if (value === "") {
    select.classList.remove("correct", "incorrect");
  } else if (value === correct) {
    select.classList.add("correct");
    select.classList.remove("incorrect");
  } else {
    select.classList.add("incorrect");
    select.classList.remove("correct");
  }

  // Kontrollera hela meningen
  let allSelected = true;
  let anyIncorrect = false;

  selects.forEach((s) => {
    const sValue = s.value.trim();
    const sCorrect = s.dataset.correct.trim();
    if (sValue === "") allSelected = false;
    else if (sValue !== sCorrect) anyIncorrect = true;
  });

  if (!allSelected) {
    sentenceContainer.classList.remove("correct", "incorrect");
  } else if (anyIncorrect) {
    sentenceContainer.classList.add("incorrect");
    sentenceContainer.classList.remove("correct");
  } else {
    sentenceContainer.classList.add("correct");
    sentenceContainer.classList.remove("incorrect");
  }

  updateScore();
}

// === 2. Skapa meningar (utan ikon) ===
function generateSentenceHTML(sentence, index) {
  const processedWords = sentence.words.map((item, wordIndex) => {
    const { word, translation } = item;
    return translation
      ? `<span class="word" aria-describedby="tooltip-${index}-${wordIndex}">
          ${word}
          <span class="tooltip" id="tooltip-${index}-${wordIndex}">${translation}</span>
        </span>`
      : word;
  });

  const sentenceHTML = processedWords.join(" ");

  return `
    <div class="sentence" id="sentence-${index}">
      <p>${sentenceHTML}</p>
    </div>`;
}

// === 4. Blanda och rendera meningar ===
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderSentences() {
  const shuffled = shuffleArray([...sentences]);
  const container = document.getElementById("sentences");
  if (!container) return;
  container.innerHTML = shuffled.map((s, i) => generateSentenceHTML(s, i)).join("");
  updateMaxScore();
}

// === 5. Poänghantering ===
function updateScore() {
  const correctCount = document.querySelectorAll(".sentence.correct").length;
  score = correctCount;
  document.querySelectorAll("#score").forEach(el => el.textContent = score);
  checkForMaxScore();
}

function updateMaxScore() {
  const maxScore = sentences.length;
  document.querySelectorAll(".score-max").forEach(el => el.textContent = maxScore);
}

function checkForMaxScore() {
  const correctCount = document.querySelectorAll(".sentence.correct").length;
  if (correctCount === sentences.length && sentences.length > 0) {
    openModal("congratulationsModal");
  }
}

// === 6. Modalhantering ===
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "flex";
    modal.classList.add("show");
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("show");
  }
}

window.addEventListener("click", (event) => {
  const infoModal = document.getElementById("infoModal");
  const congratsModal = document.getElementById("congratulationsModal");
  if (event.target === infoModal) closeModal("infoModal");
  else if (event.target === congratsModal) closeModal("congratulationsModal");
});

// === 7. Starta om ===
function startOver() {
  renderSentences();
  resetScore();
  closeModal("congratulationsModal");
}

function resetScore() {
  score = 0;
  document.querySelectorAll("#score").forEach(el => el.textContent = score);
}

// === 8. Mörkt läge och meny ===
function toggleMenu() {
  document.getElementById("menuOverlay").classList.toggle("active");
}

function startOverAndCloseMenu() {
  startOver();
  toggleMenu();
}

function showInfo() {
  openModal("infoModal");
  toggleMenu();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  document.getElementById("menuOverlay").classList.toggle("dark-mode-menu");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  document.getElementById("darkModeText").textContent = isDark ? "Light mode" : "Dark mode";

  const switchEl = document.getElementById("darkModeSwitch");
  if (switchEl) switchEl.checked = isDark;
}

function setDarkMode(enabled) {
  document.body.classList.toggle("dark-mode", enabled);
  document.getElementById("menuOverlay").classList.toggle("dark-mode-menu", enabled);
  const switchEl = document.getElementById("darkModeSwitch");
  if (switchEl) switchEl.checked = enabled;
  document.getElementById("darkModeText").textContent = enabled ? "Light mode" : "Dark mode";
}

// === 9. Init ===
document.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkMode") === "enabled";
  setDarkMode(isDark);
  renderSentences();
  resetScore();

  const switchEl = document.getElementById("darkModeSwitch");
  if (switchEl) switchEl.addEventListener("change", toggleDarkMode);
});
