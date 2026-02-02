// -----------------------------
// Sections of text
// -----------------------------
const sections = [
  "Happy Birthday.\nI made this just for you.",
  "I made this because distance makes the quiet moments harder.\nNot the big things — the small, everyday ones.",
  "I can't always be there in the ways I'd like.\nBut I'm still here.",
  "You don't have to feel a certain way for me.\nYou don't have to be okay all the time.",
  "Even from far away, I try to show up — even when I don't know the perfect way.\nI just want you to know that you matter,\nand that you're not alone in this."
];

const textEl = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const musicBtn = document.getElementById("musicBtn");

let currentSection = 0;
let musicStarted = false;

// -----------------------------
// Typewriter function
// -----------------------------
function typeText(text, element, callback) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// -----------------------------
// Music system
// -----------------------------
const songs = [
  "2Vv-BfVoq4g", // Perfect
  "GxldQ9eX2wo", // Until I Found You
  "450p7goxZqg", // All of Me
  "ohJwF3g5z9A", // Lover Remix
  "rXz9D7bZ9mM"  // Dhairya
];

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;

  const randomSong = songs[Math.floor(Math.random() * songs.length)];

  const iframe = document.createElement("iframe");
  iframe.width = "0";
  iframe.height = "0";
  iframe.src = `https://www.youtube.com/embed/${randomSong}?autoplay=1&loop=1&playlist=${randomSong}`;
  iframe.allow = "autoplay";

  document.getElementById("music-container").appendChild(iframe);
}

// -----------------------------
// Show section
// -----------------------------
function showSection(index) {
  nextBtn.classList.add("hidden");
  musicBtn.classList.add("hidden");

  typeText(sections[index], textEl, () => {
    musicBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  });
}

// -----------------------------
// Button events
// -----------------------------
nextBtn.addEventListener("click", () => {
  startMusic();
  currentSection++;
  if (currentSection < sections.length) {
    showSection(currentSection);
  } else {
    // End of all sections
    nextBtn.classList.add("hidden");
    textEl.textContent += "\n\n🎉 That's it. I hope you feel my presence today!";
  }
});

musicBtn.addEventListener("click", startMusic);

// -----------------------------
// Initial load
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  showSection(currentSection);
});
