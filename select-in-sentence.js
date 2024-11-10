    let score = 0;
		
	function generateSentenceHTML(sentence, sentenceIndex) {
        const processedWords = sentence.words.map((item, wordIndex) => {
            const {
                word,
                translation
            } = item;
		return translation ?
			`<span class="word" aria-describedby="tooltip-${sentenceIndex}-${wordIndex}">
					${word}
					<span class="tooltip" id="tooltip-${sentenceIndex}-${wordIndex}">${translation}</span>
				</span>` :
			word;
        });

        const sentenceWithTooltips = processedWords.join(' ');
        const sentenceHTML = sentenceWithTooltips.replace('__.', `<select data-correct="${sentence.correct}" onchange="evaluateAnswer(this)" aria-label="Choose the correct adjective">
            <option value="">...</option>
            <option value="värre">värre</option>
            <option value="sämre">sämre</option>
        </select>.`);

        return `<div class="sentence" data-state="none"><p>${sentenceHTML}</p></div>`;
    }

    // Fisher-Yates shuffle algorithm to shuffle an array.
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Render sentences in a shuffled order.
    function renderSentences() {
        const shuffledSentences = shuffleArray([...sentences]);
        const sentencesHTML = shuffledSentences.map((sentence, index) => generateSentenceHTML(sentence, index)).join('');
        document.getElementById('sentences').innerHTML = sentencesHTML;
    }

    // Evaluates the user's answer and updates the score and UI accordingly.
	function evaluateAnswer(selectElement) {
		const correctAnswer = selectElement.getAttribute('data-correct');
		const selectedValue = selectElement.value;
		const parent = selectElement.closest('.sentence');
	
		// Get the previous state to ensure points are added only once per correct answer
		const priorState = parent.getAttribute('data-state') || 'none';
		let newState;
	
		if (selectedValue === correctAnswer) {
			newState = 'correct';
			// Only add a point if it's a new correct answer
			if (priorState !== 'correct') {
				updateScore(1);
			}
		} else if (selectedValue !== "") {
			newState = 'incorrect';
			// No score change for incorrect answers
		} else {
			newState = 'none';
		}
	
		// Update the UI with the new state
		parent.classList.remove('correct', 'incorrect');
		parent.classList.add(newState);
		parent.setAttribute('data-state', newState);
	
		checkAllCorrect();
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

    // Check if the score has reached max and opens the congratulations modal if so.
    function checkForMaxScore(currentScore) {
        if (currentScore >= sentences.length) {
            openModal('congratulationsModal');
        }
    }

    // Checks if all sentences are correctly answered.
    function checkAllCorrect() {
        const allCorrect = Array.from(document.querySelectorAll('.sentence')).every(sentence => sentence.classList.contains('correct'));
        if (allCorrect) {
            openModal('congratulationsModal');
        }
    }

    // Opens a modal by its ID.
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('show');
        }
    }

    // Closes a modal by its ID.
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    }

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        const infoModal = document.getElementById('infoModal');
        const congratulationsModal = document.getElementById('congratulationsModal');

        if (event.target === infoModal) {
            closeModal('infoModal');
        } else if (event.target === congratulationsModal) {
            closeModal('congratulationsModal');
        }
    });

	// Function to toggle mobile menu	
	function toggleMenu() {
		const menuOverlay = document.getElementById('menuOverlay');
		menuOverlay.classList.toggle('active');
	}
	
	// Update the dark mode toggle to listen for clicks on the entire .dark-mode-toggle div
	document.querySelector('.dark-mode-toggle').addEventListener('click', () => {
		// Toggle the checkbox to visually reflect the dark mode state
		const darkModeSwitch = document.getElementById('darkModeSwitch');
		darkModeSwitch.checked = !darkModeSwitch.checked;
	
		// Toggle dark mode and update localStorage
		toggleDarkMode();
	});
	
	// Function to toggle dark mode and close the menu
	function toggleDarkMode() {
		document.body.classList.toggle('dark-mode');
	
		// Toggle dark mode on the menu overlay
		const menuOverlay = document.getElementById('menuOverlay');
		menuOverlay.classList.toggle('dark-mode-menu');
	
		// Update dark mode preference in localStorage
		const isDarkModeEnabled = document.body.classList.contains('dark-mode');
		localStorage.setItem('darkMode', isDarkModeEnabled ? 'enabled' : 'disabled');
	
		// Update text in the dark mode toggle based on the mode
		document.getElementById('darkModeText').textContent = isDarkModeEnabled ? "Light mode" : "Dark mode";
	}

    // Function to open MenuURL
    function openMenuURL() {
        window.open('https://drive.google.com/file/d/1b8-wswpvxLPSkKlcNMDHX91VFpduhD74/view?usp=sharing', '_blank', 'noopener,noreferrer');
    }

	// Open the Info modal and close the menu
	function showInfo() {
		openModal('infoModal');
		toggleMenu(); // Close the menu after showing info
	}
	
	// Start over and close the menu
	function startOverAndCloseMenu() {
		startOver();
		toggleMenu(); // Close the menu after starting over
	}
	
	// Initialize the dark mode toggle with stored preference
	document.addEventListener('DOMContentLoaded', () => {
		const isDarkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
		if (isDarkModeEnabled) {
			document.body.classList.add('dark-mode');
			document.getElementById('menuOverlay').classList.add('dark-mode-menu');
			document.getElementById('darkModeText').textContent = "Light mode";
		} else {
			document.getElementById('darkModeText').textContent = "Dark mode";
		}
	});

    // Resets the quiz and score, then re-renders sentences.
    function startOver() {
        renderSentences();
        resetScore();
        closeModal('congratulationsModal');
    }

    // Resets the score to zero.
    function resetScore() {
        score = 0;
        document.getElementById('score').textContent = score;
    }

    // Sets dark mode based on enabled status.
    function setDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    // Initializes modals and dark mode toggle.
    function initializeModalsAndDarkMode() {
        const darkModeToggle = document.getElementById('darkModeSwitch');
        const isDarkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
        setDarkMode(isDarkModeEnabled);
        darkModeToggle.checked = isDarkModeEnabled;

        darkModeToggle.addEventListener('change', function() {
            setDarkMode(this.checked);
        });
    }
	
	// Function to update the maximum score in the HTML
	function updateMaxScore() {
		const maxScore = sentences.length;
		document.querySelectorAll('.score-max').forEach((element) => {
			element.textContent = maxScore;
		});
	}

    // Initialize the application once the DOM is fully loaded.
	document.addEventListener('DOMContentLoaded', () => {
		renderSentences();
		initializeModalsAndDarkMode();
		resetScore();
		updateMaxScore();
	});
