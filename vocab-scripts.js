// Initialize Variables
let currentQuestion = 0;
let correctAnswers = 0;
let mistakes = 0;
let missedWords = [];
let previousRoundMissedWords = [];
let isRetry = false;
let totalQuestions = 0;
let answeredQuestions = 0;
let currentCorrectIndex = 0;

// Function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to render the missed words list in the DOM
function renderMissedWordsList() {
    const missedList = document.getElementById("missed-words-list");
    missedList.innerHTML = ""; // Clear existing list

    missedWords.forEach(word => {
        const missedWordItem = document.createElement("li");
        missedWordItem.innerText = word.swedish;
        missedList.appendChild(missedWordItem);
    });
}

// Start a new set of questions
function startNewSet() {
    missedWords = []; // Reset missed words for the new round
    renderMissedWordsList(); // Clear or update UI list based on missedWords

    const wordList = isRetry ? previousRoundMissedWords : vocabulary;
    totalQuestions = wordList.length;
    answeredQuestions = 0;
    document.getElementById("progress").style.width = "0%";

    if (!isRetry) {
        correctAnswers = 0;
        mistakes = 0;
        document.getElementById("correct-counter").innerText = "0";
        document.getElementById("mistake-counter").innerText = "0";
    }
}

// Load a question
function loadQuestion() {
    const wordList = isRetry ? previousRoundMissedWords : vocabulary;

    if (currentQuestion >= wordList.length) {
        if (missedWords.length === 0) {
            document.getElementById("feedback").innerText = "You've completed the quiz!";
            isRetry = false;
            document.getElementById("missedModal").style.display = "none";
        } else {
            showModal();
        }
        return;
    }

    const currentWord = wordList[currentQuestion];
    document.getElementById("word-text").innerText = currentWord.swedish;

    let shuffledChoices = [...currentWord.english];
    shuffledChoices = shuffleArray(shuffledChoices);

    const correctAnswerText = currentWord.english[currentWord.correct];
    currentCorrectIndex = shuffledChoices.indexOf(correctAnswerText);

    for (let i = 0; i < 4; i++) {
        document.getElementById(`choice${i}`).innerText = shuffledChoices[i];
    }

    document.getElementById("feedback").innerText = "";
}

// Speak the Swedish word
function speakSwedish() {
    const wordList = isRetry ? previousRoundMissedWords : vocabulary;
    if (currentQuestion >= wordList.length) {
        return;
    }
    const swedishWord = wordList[currentQuestion].swedish;
    responsiveVoice.speak(swedishWord, 'Swedish Female');
}

// Update the progress bar
function updateProgressBar() {
    if (totalQuestions === 0) return;
    const progress = (answeredQuestions / totalQuestions) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
}

// Check the user's answer
function checkAnswer(choice) {
    const wordList = isRetry ? previousRoundMissedWords : vocabulary;

    if (currentQuestion >= wordList.length) {
        return;
    }

    const currentWord = wordList[currentQuestion];
    const isCorrect = choice === currentCorrectIndex;

    if (isCorrect) {
        document.getElementById("feedback").innerText = "Correct!";
        correctAnswers++;
        document.getElementById("correct-counter").innerText = correctAnswers;

        if (isRetry) {
            missedWords = missedWords.filter(word => word.swedish !== currentWord.swedish);
            renderMissedWordsList();
        }

        answeredQuestions++;
        updateProgressBar();
    } else {
        document.getElementById("feedback").innerText = "Wrong answer!";
        mistakes++;
        document.getElementById("mistake-counter").innerText = mistakes;

        if (!missedWords.some(word => word.swedish === currentWord.swedish)) {
            missedWords.push(currentWord);
            renderMissedWordsList();
        }

        answeredQuestions++;
        updateProgressBar();
    }

    currentQuestion++;
    setTimeout(() => {
        loadQuestion();
    }, 500);
}

// Show the modal if there are missed words
function showModal() {
    const modalMessage = document.getElementById("modal-message");
    if (missedWords.length === 1) {
        modalMessage.innerHTML = `You got "${missedWords[0].swedish}" wrong. Do you want to try it again?`;
    } else if (missedWords.length > 1) {
        modalMessage.innerHTML = `You made ${mistakes} mistake${mistakes > 1 ? 's' : ''}. Do you want to try those words again?`;
    }
    document.getElementById("missedModal").style.display = "flex";
}

// Close the modal
function closeModal() {
    document.getElementById("missedModal").style.display = "none";
    missedWords = [];
    renderMissedWordsList();
}

// Retry with missed words
function retryMissed() {
    if (missedWords.length === 0) {
        document.getElementById("feedback").innerText = "Great job! No words to retry.";
        closeModal();
        return;
    }

    previousRoundMissedWords = [...missedWords];
    missedWords = [];
    isRetry = true;
    currentQuestion = 0;
    correctAnswers = 0;
    mistakes = 0;
    document.getElementById("correct-counter").innerText = correctAnswers;
    document.getElementById("mistake-counter").innerText = mistakes;

    answeredQuestions = 0;
    totalQuestions = previousRoundMissedWords.length;
    document.getElementById("progress").style.width = "0%";
    closeModal();
    loadQuestion();
}

// Reset the quiz by refreshing the page
function resetPage() {
    location.reload();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const modeLabel = document.getElementById("modeLabel");
    modeLabel.innerText = document.body.classList.contains("dark-mode") ? "Dark mode" : "Dark mode";
}

// Initialize the quiz
window.onload = function() {
    document.getElementById("missedModal").style.display = "none";
    startNewSet();
    loadQuestion();
};
