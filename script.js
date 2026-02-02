// -----------------------------
// Sections of the interactive site
// -----------------------------
const sections = [
  {
    text: "Happy Birthday.\nI made this just for you.",
    musicButton: true
  },
  {
    text: "I made this because distance makes the quiet moments harder.\nNot the big things — the small, everyday ones.",
    musicButton: false
  },
  {
    text: "I can't always be there in the ways I'd like.\nBut I'm still here.",
    musicButton: false
  },
  {
    text: "You don't have to feel a certain way for me.\nYou don't have to be okay all the time.",
    musicButton: false
  },
  {
    text: "Even from far away, I try to show up — even when I don't know the perfect way.\nI just want you to know that you matter,\nand that you're not alone in this.",
    musicButton: false
  },
  {
    text: "When you feel something, just click next to read some thoughts for each feeling.",
    musicButton: false
  },
  {
    text: "🫶 When you miss me:\nIt makes sense. Missing someone doesn’t mean something is wrong. It just means you care — and you’re cared for too.",
    musicButton: false
  },
  {
    text: "🌙 When you feel unsure:\nYou don’t need to figure everything out tonight. Nothing needs to be decided right now. I’m still here.",
    musicButton: false
  },
  {
    text: "😔 When the distance feels heavy:\nSome days it just is. You don’t have to be strong about it. I’m thinking of you — quietly, without needing anything back.",
    musicButton: false
  },
  {
    text: "😊 When you’re smiling:\nI hope you let yourself enjoy it. You don’t owe sadness to distance. Your happiness is allowed.",
    musicButton: false
  },
  {
    text: "Today isn’t about distance or waiting.\nIt’s about you existing.\nI’m really glad you do.",
    musicButton: false
  }
];

const textEl = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const musicBtn = document.getElementById("musicBtn");
const musicContainer = document.getElementById("music-container");

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

  musicContainer.appendChild(iframe);
}

// -----------------------------
// Show section
// -----------------------------
function showSection(index) {
  nextBtn.classList.add("hidden");

  // Show typewriter text
  typeText(sections[index].text, textEl, () => {
    nextBtn.classList.remove("hidden");

    // Show music button only if first section and not started
    if (sections[index].musicButton && !musicStarted) {
      musicBtn.classList.remove("hidden");
    } else {
      musicBtn.classList.add("hidden");
    }
  });
}

// -----------------------------
// Button events
// -----------------------------
nextBtn.addEventListener("click", () => {
  currentSection++;
  if (currentSection < sections.length) {
    showSection(currentSection);
  } else {
    nextBtn.classList.add("hidden");
    textEl.textContent += "\n\n🎉 That’s it. I hope you feel my presence today!";
  }
});

musicBtn.addEventListener("click", () => {
  startMusic();
  musicBtn.classList.add("hidden"); // remove button after clicked
});

// -----------------------------
// Initial load
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  showSection(currentSection);
});
