// =============================
// SECTIONS (ALL TEXT CONTENT)
// =============================
const sections = [
  { text: "Happy Birthday.\nI made this just for you.", musicButton: true },
  { text: "I made this because distance makes the quiet moments harder.\nNot the big things — the small, everyday ones.", musicButton: false },
  { text: "I can't always be there in the ways I'd like.\nBut I'm still here.", musicButton: false },
  { text: "You don't have to feel a certain way for me.\nYou don't have to be okay all the time.", musicButton: false },
  { text: "Even from far away, I try to show up — even when I don't know the perfect way.\nI just want you to know that you matter,\nand that you're not alone in this.", musicButton: false },
  { text: "When you feel something, just click next.\nI wrote something for each feeling.", musicButton: false },
  { text: "🫶 When you miss me:\nMissing someone doesn’t mean weakness.\nIt just means love exists.", musicButton: false },
  { text: "🌙 When you feel unsure:\nYou don’t need answers tonight.\nYou are allowed to rest.", musicButton: false },
  { text: "😔 When the distance feels heavy:\nYou don’t have to carry it alone.\nI’m thinking of you.", musicButton: false },
  { text: "😊 When you’re smiling:\nPlease don’t hold it back.\nYour happiness is safe.", musicButton: false },
  { text: "Today isn’t about distance.\nIt’s about you.\nAnd I’m really glad you exist.", musicButton: false }
];

// =============================
// ELEMENTS
// =============================
const textEl = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

// =============================
// STATE
// =============================
let currentSection = 0;
let musicStarted = false;

// =============================
// TYPEWRITER EFFECT
// =============================
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

// =============================
// SHOW SECTION
// =============================
function showSection(index) {
  nextBtn.style.display = "none";

  typeText(sections[index].text, textEl, () => {
    if (index < sections.length - 1) {
      nextBtn.style.display = "inline-block";
    }
    if (sections[index].musicButton && !musicStarted) {
      musicBtn.style.display = "inline-block";
    } else {
      musicBtn.style.display = "none";
    }
  });
}

// =============================
// MUSIC (BULLETPROOF)
// =============================
function startMusic() {
  if (musicStarted) return;

  bgMusic.volume = 0.8;
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => { musicStarted = true; })
      .catch(() => { /* fail silently, retry on next click */ });
  }
}

// First user interaction hooks (guaranteed to work)
function setupMusicHooks() {
  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });
  document.addEventListener("keydown", startMusic, { once: true });
}

// =============================
// BUTTON EVENTS
// =============================
nextBtn.addEventListener("click", () => {
  currentSection++;
  if (currentSection < sections.length) {
    showSection(currentSection);
  } else {
    nextBtn.style.display = "none";
    textEl.textContent += "\n\n🎉 Happy Birthday 💗";
  }
});

musicBtn.addEventListener("click", () => {
  startMusic();
  musicBtn.style.display = "none";
});

// =============================
// INITIAL LOAD
// =============================
window.addEventListener("DOMContentLoaded", () => {
  setupMusicHooks();
  showSection(currentSection);
});
