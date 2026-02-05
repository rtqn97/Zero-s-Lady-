// =============================
// RANDOM SONG LIST (EXACT NAMES)
// =============================
const songs = [
  "Dhairya.mp3",
  "TumPremHo.mp3",
  "Birthday.mp3",
  "Perfect.mp3"
];

// Pick ONE random song per page load
const randomSong = songs[Math.floor(Math.random() * songs.length)];

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

// Inject random song into audio
bgMusic.src = randomSong;

// =============================
// STATE
// =============================
let currentSection = 0;
let musicStarted = false;
let endingShown = false;

// =============================
// TYPEWRITER EFFECT
// =============================
function typeText(text, callback) {
  let i = 0;
  textEl.textContent = "";
  textEl.style.opacity = 1;

  function type() {
    if (i < text.length) {
      textEl.textContent += text.charAt(i);
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

  typeText(sections[index].text, () => {
    nextBtn.style.display = "inline-block";

    if (sections[index].musicButton && !musicStarted) {
      musicBtn.style.display = "inline-block";
    } else {
      musicBtn.style.display = "none";
    }
  });
}

// =============================
// MUSIC (BROWSER SAFE)
// =============================
function startMusic() {
  if (musicStarted) return;

  bgMusic.volume = 0.8;
  bgMusic.play().then(() => {
    musicStarted = true;
  }).catch(() => {});
}

// Allow first interaction to start music
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });

// =============================
// FINAL FADE OUT
// =============================
function fadeOutEnding() {
  nextBtn.style.display = "none";
  musicBtn.style.display = "none";

  let opacity = 1;
  const fadeText = setInterval(() => {
    opacity -= 0.01;
    textEl.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fadeText);
      textEl.textContent = "";
    }
  }, 100);

  let volume = bgMusic.volume;
  const fadeMusic = setInterval(() => {
    volume -= 0.01;
    bgMusic.volume = Math.max(volume, 0);
    if (volume <= 0) {
      clearInterval(fadeMusic);
      bgMusic.pause();
    }
  }, 100);

  setTimeout(showTheEnd, 10000);
}

// =============================
// THE END (FLICKER)
// =============================
function showTheEnd() {
  textEl.textContent = "THE END";
  textEl.style.opacity = 1;
  textEl.style.fontSize = "2em";

  let visible = true;
  setInterval(() => {
    textEl.style.opacity = visible ? 0.2 : 1;
    visible = !visible;
  }, 700);
}

// =============================
// NEXT BUTTON LOGIC
// =============================
nextBtn.addEventListener("click", () => {
  if (currentSection < sections.length - 1) {
    currentSection++;
    showSection(currentSection);
    return;
  }

  if (!endingShown) {
    endingShown = true;
    typeText(
      "Enjoy your day, dear.\nHappy Birthday once again, my love 😘❤️",
      () => {
        nextBtn.textContent = "Stay Here 💗";
        nextBtn.onclick = fadeOutEnding;
      }
    );
  }
});

// =============================
// MUSIC BUTTON
// =============================
musicBtn.addEventListener("click", () => {
  startMusic();
  musicBtn.style.display = "none";
});

// =============================
// INITIAL LOAD
// =============================
window.addEventListener("DOMContentLoaded", () => {
  showSection(currentSection);
});
