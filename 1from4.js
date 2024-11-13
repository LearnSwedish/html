// Get references
const toggleSwitch = document.getElementById('darkModeSwitch');
const body = document.body;
const feedback = document.getElementById('feedback');
const buttonsContainer = document.getElementById('buttons-container');
const questionText = document.getElementById('question-text');
const tooltip = document.getElementById('custom-tooltip');
const progressBar = document.getElementById('progress-bar');

// Check if the user has previously chosen a theme and apply it
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleSwitch.checked = true;
}

// Toggle function
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Open Modal Function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

// Close Modal Function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const infoModal = document.getElementById('infoModal');
    const congratulationsModal = document.getElementById('congratulationsModal');
    if (event.target === infoModal) {
        closeModal('infoModal');
    }
    if (event.target === congratulationsModal) {
        closeModal('congratulationsModal');
    }
});

// Calculate the total number of questions
const totalQuestions = questions.length;
// Display the total number of questions in the total score element
document.getElementById('total-score').textContent = totalQuestions;

// State tracking
let usedQuestions = [];
let correctCount = 0;
let incorrectCount = 0;

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Toggle Mobile Menu visibility
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerIcon = document.getElementById('hamburgerIcon');

    mobileMenu.classList.toggle('show');

    if (mobileMenu.classList.contains('show')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
        if (window.innerWidth <= 600) {
            document.querySelector('.desktop-menu').style.display = 'none';
        }
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
}

// Function to open the overlay
function openOverlay() {
    document.getElementById('mobileOverlay').style.display = 'block';
    if (window.innerWidth > 600) {
        document.querySelector('.desktop-menu').style.display = 'none';
    }
}

// Function to close the overlay
function closeOverlay() {
    document.getElementById('mobileOverlay').style.display = 'none';
    if (window.innerWidth > 600) {
        document.querySelector('.desktop-menu').style.display = 'flex';
    }
}

// Ensure desktop menu is hidden on small screens, even after closing mobile views
function handleResize() {
    if (window.innerWidth <= 600) {
        document.querySelector('.desktop-menu').style.display = 'none';
    } else {
        document.querySelector('.desktop-menu').style.display = 'flex';
    }
}

// Attach the resize event listener
window.addEventListener('resize', handleResize);

// Initialize to set the correct view on page load
handleResize();

// Close Mobile Menu
function closeMobileMenu() {
    document.querySelector('.mobile-menu').classList.remove('show');
}

// Toggle Dark Mode in Mobile Menu
function toggleDarkModeMobile() {
    const darkModeEnabled = body.classList.toggle('dark-mode');
    document.getElementById('darkModeIcon').style.color = darkModeEnabled ? '#ffeb3b' : 'black';
    document.getElementById('darkModeText').textContent = darkModeEnabled ? 'Light mode' : 'Dark mode';
    localStorage.setItem('theme', darkModeEnabled ? 'dark' : 'light');
}

// Set initial dark mode state in Mobile Menu
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeIcon').style.color = '#ffeb3b';
    document.getElementById('darkModeText').textContent = 'Light mode';
}

// Function to show tooltip
function showTooltip(event, text) {
    tooltip.textContent = text;
    tooltip.style.display = 'block';
    // Get the noun element's position
    const nounRect = event.target.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    // Position the tooltip above and slightly to the right of the noun
    let leftPosition = nounRect.left + 5;
    let topPosition = nounRect.top - tooltip.offsetHeight - 5;
    // Ensure tooltip stays within viewport on small screens
    if (leftPosition + tooltip.offsetWidth > screenWidth) {
        leftPosition = screenWidth - tooltip.offsetWidth - 10; // Adjust to fit within the screen
    }
    tooltip.style.left = `${leftPosition}px`;
    tooltip.style.top = `${topPosition}px`;
    // Add the visible class for smooth fade-in
    tooltip.classList.add('visible');
}

// Function to hide tooltip
function hideTooltip() {
    tooltip.classList.remove('visible');
}

// Make the entire dark mode toggle div clickable
document.getElementById('darkModeToggleDiv').addEventListener('click', () => {
    toggleSwitch.checked = !toggleSwitch.checked;
    if (toggleSwitch.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Function to change question with fade effect
function changeQuestion() {
    if (usedQuestions.length === questions.length) {
        showFinalScore();
        return;
    }

    // Apply fade-out to current question
    questionText.classList.add('fade-out');
    buttonsContainer.classList.add('fade-out');
    feedback.classList.add('fade-out');

    // Set up the new question right after fading out, without extra delay
    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * questions.length);
        } while (usedQuestions.includes(randomIndex));

        usedQuestions.push(randomIndex);
        const newQuestion = questions[randomIndex];
        document.getElementById('gender').textContent = newQuestion.gender;
        const nounElement = document.getElementById('noun');
        nounElement.innerHTML = newQuestion.noun;

        // Shuffle options and render buttons for new question
        const shuffledOptions = [...newQuestion.options];
        shuffleArray(shuffledOptions);
        buttonsContainer.innerHTML = shuffledOptions.map((option) => {
            const originalIndex = newQuestion.options.indexOf(option);
            return `
                <div class="button-container">
                    <button class="answer-button" onclick="checkAnswer(this, ${originalIndex}, ${randomIndex})">
                        ${option}
                        <span class="inner-outline"></span>
                    </button>
                </div>
            `;
        }).join('');

        feedback.textContent = '';

        // Reset tooltip event listeners for the new question's noun
        nounElement.addEventListener('mouseenter', (e) => showTooltip(e, newQuestion.tooltip));
        nounElement.addEventListener('mouseleave', hideTooltip);
        nounElement.addEventListener('touchstart', (e) => showTooltip(e, newQuestion.tooltip));
        nounElement.addEventListener('touchend', hideTooltip);

        // Remove fade-out and trigger fade-in quickly
        questionText.classList.remove('fade-out');
        buttonsContainer.classList.remove('fade-out');
        feedback.classList.remove('fade-out');
        questionText.classList.add('fade-in');
        buttonsContainer.classList.add('fade-in');
        feedback.classList.add('fade-in');

        // Clear fade-in class after animation to reset state
        setTimeout(() => {
            questionText.classList.remove('fade-in');
            buttonsContainer.classList.remove('fade-in');
            feedback.classList.remove('fade-in');
        }, 400); // Match this to your CSS fade duration (e.g., 0.3s)
    }, 400); // Minimal delay to match fade-out time
}

// Check answer
function checkAnswer(button, answerIndex, questionIndex) {
    const correctAnswerIndex = questions[questionIndex].correctAnswer;
    const correctOption = questions[questionIndex].options[correctAnswerIndex];
    const correctButton = Array.from(buttonsContainer.querySelectorAll('.answer-button'))
        .find(btn => btn.textContent.trim() === correctOption);

    // Apply 'correct' class to the correct button
    if (answerIndex === correctAnswerIndex) {
        button.classList.add("correct");
        feedback.textContent = 'Correct answer';
        correctCount++;
    } else {
        button.classList.add("wrong");
        if (correctButton) {
            correctButton.classList.add('correct');
        }
        feedback.textContent = 'Wrong answer';
        incorrectCount++;
    }

    // Update the score display in all elements with id="score"
    document.querySelectorAll('#score').forEach(scoreElement => {
        scoreElement.textContent = correctCount;
    });

    // Update the progress bar
    updateProgressBar();

    // Disable all buttons to prevent multiple answers
    buttonsContainer.classList.add('answered');
    buttonsContainer.querySelectorAll('.answer-button').forEach(btn => btn.disabled = true);

    // Proceed to the next question after a delay
    setTimeout(() => {
        changeQuestion();
    }, 2500);
}

// Updates the score display based on value change.
function updateScore(value) {
    score += value;

    // Update all elements with id="score" to reflect the updated score
    document.querySelectorAll('#score').forEach((element) => {
        element.textContent = score;
    });

    checkForMaxScore(score);
}

// Function to update progress bar
function updateProgressBar() {
    const progress = (usedQuestions.length / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to initialize the first question
function initializeQuestion() {
    const progressBar = document.getElementById('progress-bar');
    const buttonsContainer = document.getElementById('buttons-container');
    const questionText = document.getElementById('question-text');
    const feedback = document.getElementById('feedback');

    // Reset counts
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById('score').textContent = correctCount;

    // Reset progress bar
    progressBar.style.width = '0%';

    // Select the first question
    let initialIndex;
    do {
        initialIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(initialIndex));

    usedQuestions.push(initialIndex);
    const initialQuestion = questions[initialIndex];
    document.getElementById('gender').textContent = initialQuestion.gender;
    const nounElement = document.getElementById('noun');
    nounElement.innerHTML = initialQuestion.noun;

    // Remove existing tooltip listeners by cloning
    nounElement.replaceWith(nounElement.cloneNode(true));
    const updatedNounElement = document.getElementById('noun');

    // Shuffle options
    const shuffledOptions = [...initialQuestion.options];
    shuffleArray(shuffledOptions);

    // Render buttons
    buttonsContainer.innerHTML = shuffledOptions.map((option) => {
        const originalIndex = initialQuestion.options.indexOf(option);
        return `
            <div class="button-container">
                <button class="answer-button" onclick="checkAnswer(this, ${originalIndex}, ${initialIndex})">
                    ${option}
                    <span class="inner-outline"></span>
                </button>
            </div>
        `;
    }).join('');

    feedback.textContent = '';

    // Add tooltip listeners
    updatedNounElement.addEventListener('mouseenter', (e) => showTooltip(e, initialQuestion.tooltip));
    updatedNounElement.addEventListener('mouseleave', hideTooltip);
    updatedNounElement.addEventListener('touchstart', (e) => showTooltip(e, initialQuestion.tooltip));
    updatedNounElement.addEventListener('touchend', hideTooltip);
}

// Function to restart the quiz
function startOver() {
    // Option 1: Reload the page
    location.reload();

    // Option 2: Reset the quiz state without reloading
    /*
    usedQuestions = [];
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById('score').textContent = '0';
    progressBar.style.width = '0%';
    initializeQuestion();
    */
}

// Function to show the final score
function showFinalScore() {
    questionText.textContent = `You have answered all questions!`;
    buttonsContainer.innerHTML = `
        <p style="font-size: 24px; font-weight: bold; color: green;">Correct: ${correctCount}</p>
        <p style="font-size: 24px; font-weight: bold; color: red;">Incorrect: ${incorrectCount}</p>
    `;
    feedback.textContent = '';
}

// Initialize first question
initializeQuestion();