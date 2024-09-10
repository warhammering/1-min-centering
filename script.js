let isRunning = false;
let currentPhase = 'inhale'; // "inhale" or "exhale"
let countdownTime = 1; // Start at 1 for inhale
let round = 0;
let maxRounds = 5;
let countdownInterval;
let circle = document.getElementById('circle');

const actionText = document.getElementById('actionText');
const countdown = document.getElementById('countdown');
const startStopButton = document.getElementById('startStopButton');
const roundCounter = document.getElementById('roundCounter');
const toggleTheme = document.getElementById('toggleTheme');

// Load the sounds
const breathInSound = new Audio('sounds/breath_in.ogg');
const breathOutSound = new Audio('sounds/breath_out.ogg');
const completedSound = new Audio('sounds/completed.ogg');

startStopButton.addEventListener('click', () => {
	if (isRunning) {
		stopBreathing();
	} else {
		startBreathing();
	}
});

// Toggle dark/light theme with localStorage to remember the user's preference
toggleTheme.addEventListener('change', () => {
	document.body.classList.toggle('dark-mode');

	// Save theme preference in localStorage
	if (document.body.classList.contains('dark-mode')) {
		localStorage.setItem('theme', 'dark');
	} else {
		localStorage.setItem('theme', 'light');
	}
});

// On page load, check if user has a stored theme preference
window.onload = () => {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'dark') {
		document.body.classList.add('dark-mode');
		toggleTheme.checked = true; // Ensure the toggle is in the right position
	} else {
		document.body.classList.remove('dark-mode');
		toggleTheme.checked = false; // Ensure the toggle is in the right position
	}
};

function startBreathing() {
	isRunning = true;
	startStopButton.textContent = 'Stop';
	startStopButton.classList.add('stop');
	countdownTime = 1; // Start from 1 for inhale
	currentPhase = 'inhale';
	actionText.textContent = 'Breathe In';
	countdown.textContent = countdownTime;
	circle.style.backgroundColor = 'lightblue'; // Start with light blue
	circle.style.transform = 'scale(1.2)'; // Expand circle for inhale
	circle.style.transition = 'transform 5s linear, background-color 5s linear'; // Smooth transition for inhale

	// Play inhale sound
	breathInSound.play();

	countdownInterval = setInterval(() => {
		if (currentPhase === 'inhale') {
			// Count up for inhale (1 to 5)
			if (countdownTime < 5) {
				countdownTime++;
				countdown.textContent = countdownTime;
				if (countdownTime === 3) {
					circle.style.backgroundColor = 'blue'; // Transition to blue halfway through inhale
				}
			} else {
				currentPhase = 'exhale';
				countdownTime = 7; // Start exhale from 7
				actionText.textContent = 'Breathe Out';
				circle.style.backgroundColor = 'lightgreen'; // Start with light green
				circle.style.transform = 'scale(0.6)'; // Contract circle for exhale
				circle.style.transition =
					'transform 7s linear, background-color 7s linear'; // Smooth transition for exhale

				// Play exhale sound
				breathOutSound.play();
			}
		} else if (currentPhase === 'exhale') {
			// Count down for exhale (7 to 1)
			if (countdownTime > 1) {
				countdownTime--;
				countdown.textContent = countdownTime;
				if (countdownTime === 4) {
					circle.style.backgroundColor = 'green'; // Transition to green halfway through exhale
				}
			} else {
				round++;
				roundCounter.textContent = `Round ${round}/${maxRounds}`;

				if (round >= maxRounds) {
					stopBreathing();
					// Play completed sound
					completedSound.play();
					return;
				}

				currentPhase = 'inhale';
				countdownTime = 1; // Start inhale from 1 again
				actionText.textContent = 'Breathe In';
				circle.style.backgroundColor = 'lightblue'; // Start with light blue
				circle.style.transform = 'scale(1.3)'; // Expand circle again
				circle.style.transition =
					'transform 5s linear, background-color 5s linear'; // Smooth transition for inhale

				// Play inhale sound
				breathInSound.play();
				countdown.textContent = countdownTime;
			}
		}
	}, 1000);
}

function stopBreathing() {
	isRunning = false;
	clearInterval(countdownInterval);
	startStopButton.textContent = 'Start';
	startStopButton.classList.remove('stop');
	circle.style.transform = 'scale(1)'; // Reset the circle size
}

// Initialize VanillaTilt on the card element
VanillaTilt.init(document.querySelector('#tiltCard'), {
	max: 15,
	speed: 400,
	glare: true,
	'max-glare': 0.2,
});
