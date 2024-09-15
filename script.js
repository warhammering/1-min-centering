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
const logo = document.getElementById('logo');

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

	// Change the logo based on theme
	if (document.body.classList.contains('dark-mode')) {
		logo.src = 'logo/Masterschool-logo-White.png';
	} else {
		logo.src = 'logo/Masterschool-logo-Soft black.png';
	}

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
		logo.src = 'logo/Masterschool-logo-White.png';
	} else {
		document.body.classList.remove('dark-mode');
		toggleTheme.checked = false; // Ensure the toggle is in the right position
		logo.src = 'logo/Masterschool-logo-Soft black.png';
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
	circle.style.backgroundColor = '#D8FFD0'; // Light Green
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
					circle.style.backgroundColor = '#9EFF8A'; // Transition to Bright Green halfway through inhale
				}
			} else {
				// Switch to exhale phase
				currentPhase = 'exhale';
				countdownTime = 7; // Set countdown to start from 7 for exhale
				countdown.textContent = countdownTime; // Immediately display 7
				actionText.textContent = 'Breathe Out';
				circle.style.backgroundColor = '#C0AFEB'; // Start with Lilac
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
					circle.style.backgroundColor = '#FFC8F0'; // Transition to Pink halfway through exhale
				}
			} else {
				// Complete a round
				round++;
				roundCounter.textContent = `Round ${round}/${maxRounds}`;

				if (round >= maxRounds) {
					stopBreathing();
					// Play completed sound
					completedSound.play();
					return;
				}

				// Switch back to inhale phase
				currentPhase = 'inhale';
				countdownTime = 1; // Start inhale from 1 again
				actionText.textContent = 'Breathe In';
				circle.style.backgroundColor = '#D8FFD0'; // Light Green
				circle.style.transform = 'scale(1.2)'; // Expand circle again
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
	circle.style.transform = 'scale(1)';
	countdown.textContent = '1';
	actionText.textContent = 'Breathe In';
	currentPhase = 'inhale';
	countdownTime = 1;
	round = 0;
	roundCounter.textContent = `Round ${round}/${maxRounds}`;
}

// Initialize VanillaTilt on the card element
VanillaTilt.init(document.querySelector('#tiltCard'), {
	max: 15,
	speed: 400,
	glare: true,
	'max-glare': 0.2,
});
