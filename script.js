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

const meridianPoints = [
  "Top of the head",
  "Third eye",
  "Temporal",
  "Under the eye",
  "Under nose",
  "Chin",
  "Collarbone",
  "Under arm",
];

let currentSectionIndex = 0;
let currentPhraseIndex = 0;
let isPaused = false;
let countdown;
let countdownValue = 5;

const displayElement = document.getElementById("affirmation-display");
const sectionNameElement = document.getElementById("section-name");
const timerElement = document.getElementById("timer");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pauseButton = document.getElementById("pause-button");

function updateDisplay() {
  const affirmationContainer = document.getElementById("affirmation-container");
  const currentSection = affirmationSections[currentSectionIndex];
  const meridianElement = document.getElementById("meridian-point"); // New element for the meridian point

  if (currentPhraseIndex < currentSection.phrases.length) {
    displayElement.textContent = currentSection.phrases[currentPhraseIndex];
    sectionNameElement.textContent = currentSection.section;

    // Display the meridian point
    meridianElement.textContent = `Meridian Point: ${meridianPoints[currentPhraseIndex]}`;

    countdownValue = 7;
    affirmationContainer.classList.remove("breathe");
  } else {
    displayElement.textContent =
      "Place a hand on your heart and belly, and take three deep breaths.";
    sectionNameElement.textContent = "";

    // Clear the meridian point when not applicable
    meridianElement.textContent = "";

    countdownValue = 15;
    affirmationContainer.classList.add("breathe");
  }

  if (!isPaused) {
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(countdown);
  updateTimer();
  if (!isPaused) {
    countdown = setInterval(() => {
      countdownValue--;
      updateTimer();
      if (countdownValue <= 0) {
        clearInterval(countdown);
        moveToNext();
      }
    }, 1000);
  }
}
function updateTimer() {
  timerElement.textContent = countdownValue ? `${countdownValue}` : "";
}

function moveToNext() {
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
  // Only work if paused
  if (isPaused) {
    if (currentPhraseIndex > 0) {
      currentPhraseIndex--;
    } else if (currentSectionIndex > 0) {
      currentSectionIndex--;
      currentPhraseIndex =
        affirmationSections[currentSectionIndex].phrases.length - 1;
    }
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

function showPage(pageId) {
  const pages = ["landing-page", "affirmation-page"];
  pages.forEach((id) => {
    document.getElementById(id).style.display =
      id === pageId ? "block" : "none";
  });
}

// Initial load shows landing page
showPage("landing-page");

// Start button event listener to switch to affirmation page
document.getElementById("start-button").addEventListener("click", () => {
  showPage("affirmation-page");
});

// Update display initially
updateDisplay();

// Add event listeners
prevButton.addEventListener("click", moveToPrev);
nextButton.addEventListener("click", moveToNext);
pauseButton.addEventListener("click", togglePause);
