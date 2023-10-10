const affirmations = [
  "I worry I'm not a strong leader in the cockpit.",
  "I feel uneasy when my teaching methods don't seem effective.",
  "I doubt my ability to mentor aspiring pilots.",
  "I lack confidence in my leadership skills.",
  "I fear I can't make quick, correct decisions under pressure.",
  "I wonder if I'm cut out for this responsibility.",
  "I fear my crew or students won't respect me.",
  "I question if I'm good enough to lead and teach.",
  "I want to be a confident and effective leader.",
  "I aim to be an inspiring instructor.",
  "I aspire to be a helpful mentor.",
  "I want to believe in my abilities.",
  "I want to trust my decision-making skills.",
  "I want this role to be a perfect fit for me.",
  "I want to earn the respect and trust of my crew and students.",
  "I want to feel I am more than capable.",
  "I give myself permission to excel in flight leadership.",
  "I give myself permission to be an effective instructor.",
  "I grant myself the right to mentor.",
  "I allow myself to be confident.",
  "I give myself permission to trust my instincts.",
  "I allow myself to embrace this role.",
  "I give myself permission to be respected.",
  "I grant myself the right to feel competent and capable.",
  "I am grateful for each flight where I lead successfully.",
  "I appreciate every student who learns from me.",
  "I'm thankful for the opportunity to mentor and make a difference.",
  "I am becoming more confident every day.",
  "I value the quick decisions I've made that were correct.",
  "I take pride in my growth and responsibility.",
  "I relish the respect I earn from my crew and students.",
  "I'm proud of the leader, instructor, and mentor I am becoming. I am enough.",
];

let currentIndex = 0;
let isPaused = false;

const displayElement = document.getElementById("affirmation-display");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pauseButton = document.getElementById("pause-button");

function updateDisplay() {
  displayElement.textContent = affirmations[currentIndex];
}

function moveToNext() {
  if (!isPaused && currentIndex < affirmations.length - 1) {
    currentIndex++;
    updateDisplay();
  }
}

function moveToPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateDisplay();
  }
}

function togglePause() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

// Update display initially
updateDisplay();

// Add event listeners
prevButton.addEventListener("click", moveToPrev);
nextButton.addEventListener("click", moveToNext);
pauseButton.addEventListener("click", togglePause);

// Automatic progression
setInterval(moveToNext, 5000); // Move to next affirmation every 5 seconds
