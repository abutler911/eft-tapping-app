const affirmationSections = [
  {
    section: "Addressing Insecurities",
    phrases: [
      "I worry I'm not a strong leader in the cockpit.",
      "I feel uneasy when my teaching methods don't seem effective.",
      "I doubt my ability to mentor aspiring pilots.",
      "I lack confidence in my leadership skills.",
      "I fear I can't make quick, correct decisions under pressure.",
      "I wonder if I'm cut out for this responsibility.",
      "I fear my crew or students won't respect me.",
      "I question if I'm good enough to lead and teach.",
    ],
  },
  {
    section: "Shifting to Desires",
    phrases: [
      "I want to be a confident and effective leader.",
      "I aim to be an inspiring instructor.",
      "I aspire to be a helpful mentor.",
      "I want to believe in my abilities.",
      "I want to trust my decision-making skills.",
      "I want this role to be a perfect fit for me.",
      "I want to earn the respect and trust of my crew and students.",
      "I want to feel I am more than capable.",
    ],
  },
  {
    section: "Giving Permission",
    phrases: [
      "I give myself permission to excel in flight leadership.",
      "I give myself permission to be an effective instructor.",
      "I grant myself the right to mentor.",
      "I allow myself to be confident.",
      "I give myself permission to trust my instincts.",
      "I allow myself to embrace this role.",
      "I give myself permission to be respected.",
      "I grant myself the right to feel competent and capable.",
    ],
  },
  {
    section: "Affirmations and Gratitude",
    phrases: [
      "I am grateful for each flight where I lead successfully.",
      "I appreciate every student who learns from me.",
      "I'm thankful for the opportunity to mentor and make a difference.",
      "I am becoming more confident every day.",
      "I value the quick decisions I've made that were correct.",
      "I take pride in my growth and responsibility.",
      "I relish the respect I earn from my crew and students.",
      "I'm proud of the leader, instructor, and mentor I am becoming. I am enough.",
    ],
  },
];

let currentSectionIndex = 0;
let currentPhraseIndex = 0;
let isPaused = false;
let countdown;
let countdownValue = 5;

const displayElement = document.getElementById("affirmation-display");
const timerElement = document.getElementById("timer");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pauseButton = document.getElementById("pause-button");

function updateDisplay() {
  if (
    currentPhraseIndex < affirmationSections[currentSectionIndex].phrases.length
  ) {
    displayElement.textContent =
      affirmationSections[currentSectionIndex].phrases[currentPhraseIndex];
  } else {
    displayElement.textContent =
      "Place a hand on your heart and belly, and take three deep breaths.";
  }

  if (!isPaused) {
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(countdown);
  countdownValue = 5; // Reset timer to 5 seconds
  updateTimer();
  if (!isPaused) {
    countdown = setInterval(() => {
      countdownValue--;
      updateTimer();
      if (countdownValue <= 0) {
        clearInterval(countdown);
        moveToNext(); // Move to the next affirmation
      }
    }, 1000);
  }
}
function updateTimer() {
  timerElement.textContent = countdownValue ? `${countdownValue}s` : "";
}

function moveToNext() {
  // Logic for moving to the next affirmation, same as before but without the pause check
  if (
    currentPhraseIndex < affirmationSections[currentSectionIndex].phrases.length
  ) {
    currentPhraseIndex++;
  } else {
    currentSectionIndex++;
    currentPhraseIndex = 0;
  }

  if (currentSectionIndex >= affirmationSections.length) {
    // Reset if reached the end
    currentSectionIndex = 0;
    currentPhraseIndex = 0;
  }

  updateDisplay();
}

function moveToPrev() {
  // Only work if paused or no timer is active
  if (isPaused || !countdown) {
    currentPhraseIndex = Math.max(currentPhraseIndex - 1, 0); // Don't go below 0
    updateDisplay();
  }
}

function togglePause() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";

  if (isPaused) {
    // Clear the timer and remove it from the page
    clearInterval(countdown);
    timerElement.textContent = "";
  } else {
    // Restart the timer if unpaused
    resetTimer();
  }
}

// Update display initially
updateDisplay();

// Add event listeners
prevButton.addEventListener("click", moveToPrev);
nextButton.addEventListener("click", moveToNext);
pauseButton.addEventListener("click", togglePause);
