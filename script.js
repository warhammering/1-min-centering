// State variables
let isRunning = false;
let currentPhase = 'inhale';
let countdownTime = 1;
let round = 0;
const maxRounds = 5;
let countdownInterval;

// DOM elements
const circle = document.getElementById('circle');
const actionText = document.getElementById('actionText');
const countdown = document.getElementById('countdown');
const startStopButton = document.getElementById('startStopButton');
const roundCounter = document.getElementById('roundCounter');
const toggleTheme = document.getElementById('toggleTheme');
const logo = document.getElementById('logo');

// Audio elements
const breathInSound = new Audio('sounds/breath_in.ogg');
const breathOutSound = new Audio('sounds/breath_out.ogg');
const completedSound = new Audio('sounds/completed.ogg');

// Constants for styling
const COLORS = {
	LIGHT_GREEN: '#D8FFD0',
	BRIGHT_GREEN: '#9EFF8A',
	LILAC: '#C0AFEB',
	PINK: '#FFC8F0',
};

const LOGOS = {
	DARK: 'logo/Masterschool-logo-White.png',
	LIGHT: 'logo/Masterschool-logo-Soft black.png',
};

/**
 * Starts the breathing exercise.
 * Initializes the state, updates UI, and begins the countdown interval.
 */
function startBreathing() {
	isRunning = true;
	updateStartStopButton('Stop', true);
	resetBreathingState();
	updateBreathingUI();
	playSound(breathInSound);

	countdownInterval = setInterval(updateBreathingCycle, 1000);
}

/**
 * Stops the breathing exercise.
 * Resets the state and updates the UI.
 */
function stopBreathing() {
	isRunning = false;
	clearInterval(countdownInterval);
	updateStartStopButton('Start', false);
	resetBreathingState();
	updateBreathingUI();
	resetRoundCounter();
}

/**
 * Updates the breathing cycle state and UI.
 * Handles transitions between inhale and exhale phases.
 */
function updateBreathingCycle() {
	if (currentPhase === 'inhale') {
		handleInhalePhase();
	} else {
		handleExhalePhase();
	}
}

/**
 * Handles the inhale phase of the breathing cycle.
 */
function handleInhalePhase() {
	if (countdownTime < 5) {
		countdownTime++;
		updateCountdown();
		if (countdownTime === 3) {
			updateCircleColor(COLORS.BRIGHT_GREEN);
		}
	} else {
		transitionToExhale();
	}
}

/**
 * Handles the exhale phase of the breathing cycle.
 */
function handleExhalePhase() {
	if (countdownTime > 1) {
		countdownTime--;
		updateCountdown();
		if (countdownTime === 4) {
			updateCircleColor(COLORS.PINK);
		}
	} else {
		completeRound();
	}
}

/**
 * Transitions from inhale to exhale phase.
 */
function transitionToExhale() {
	currentPhase = 'exhale';
	countdownTime = 7;
	updateBreathingUI();
	playSound(breathOutSound);
}

/**
 * Completes a round of the breathing exercise.
 * Handles round progression and exercise completion.
 */
function completeRound() {
	round++;
	updateRoundCounter();

	if (round >= maxRounds) {
		stopBreathing();
		playSound(completedSound);
		return;
	}

	resetToInhale();
}

/**
 * Resets the state to begin a new inhale phase.
 */
function resetToInhale() {
	currentPhase = 'inhale';
	countdownTime = 1;
	updateBreathingUI();
	playSound(breathInSound);
}

/**
 * Updates the breathing exercise UI.
 * Sets the appropriate text, colors, and animations.
 */
function updateBreathingUI() {
	const isInhale = currentPhase === 'inhale';
	actionText.textContent = isInhale ? 'Breathe In' : 'Breathe Out';
	updateCircleColor(isInhale ? COLORS.LIGHT_GREEN : COLORS.LILAC);
	updateCircleTransform(isInhale ? 1.2 : 0.6);
	updateCircleTransition(isInhale ? 5 : 7);
	updateCountdown();
}

/**
 * Updates the countdown display.
 */
function updateCountdown() {
	countdown.textContent = countdownTime;
}

/**
 * Updates the round counter display.
 */
function updateRoundCounter() {
	roundCounter.textContent = `Round ${round}/${maxRounds}`;
}

/**
 * Resets the round counter display.
 */
function resetRoundCounter() {
	round = 0;
	updateRoundCounter();
}

/**
 * Updates the start/stop button text and style.
 * @param {string} text - The text to display on the button.
 * @param {boolean} isStop - Whether the button is in the "stop" state.
 */
function updateStartStopButton(text, isStop) {
	startStopButton.textContent = text;
	startStopButton.classList.toggle('stop', isStop);
}

/**
 * Resets the breathing exercise state.
 */
function resetBreathingState() {
	currentPhase = 'inhale';
	countdownTime = 1;
}

/**
 * Updates the color of the breathing circle.
 * @param {string} color - The color to set.
 */
function updateCircleColor(color) {
	circle.style.backgroundColor = color;
}

/**
 * Updates the transform scale of the breathing circle.
 * @param {number} scale - The scale factor to apply.
 */
function updateCircleTransform(scale) {
	circle.style.transform = `scale(${scale})`;
}

/**
 * Updates the transition of the breathing circle.
 * @param {number} duration - The duration of the transition in seconds.
 */
function updateCircleTransition(duration) {
	circle.style.transition = `transform ${duration}s linear, background-color ${duration}s linear`;
}

/**
 * Plays an audio sound.
 * @param {HTMLAudioElement} sound - The audio element to play.
 */
function playSound(sound) {
	sound.play();
}

/**
 * Toggles the theme between light and dark mode.
 * Updates the UI and saves the preference to localStorage.
 */
function toggleThemeMode() {
	const isDarkMode = document.body.classList.toggle('dark-mode');
	updateLogo(isDarkMode);
	saveThemePreference(isDarkMode);
}

/**
 * Updates the logo based on the current theme.
 * @param {boolean} isDarkMode - Whether the theme is in dark mode.
 */
function updateLogo(isDarkMode) {
	logo.src = isDarkMode ? LOGOS.DARK : LOGOS.LIGHT;
}

/**
 * Saves the current theme preference to localStorage.
 * @param {boolean} isDarkMode - Whether the theme is in dark mode.
 */
function saveThemePreference(isDarkMode) {
	localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

/**
 * Loads the saved theme preference and applies it.
 */
function loadThemePreference() {
	const savedTheme = localStorage.getItem('theme');
	const isDarkMode = savedTheme === 'dark';
	document.body.classList.toggle('dark-mode', isDarkMode);
	toggleTheme.checked = isDarkMode;
	updateLogo(isDarkMode);
}

// Event Listeners
startStopButton.addEventListener('click', () =>
	isRunning ? stopBreathing() : startBreathing()
);
toggleTheme.addEventListener('change', toggleThemeMode);

// Initialize
window.onload = loadThemePreference;

// Initialize VanillaTilt
VanillaTilt.init(document.querySelector('#tiltCard'), {
	max: 15,
	speed: 400,
	glare: true,
	'max-glare': 0.2,
});
