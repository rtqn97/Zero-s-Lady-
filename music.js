let musicStarted = false;

const songs = [
  "2Vv-BfVoq4g", // Perfect
  "GxldQ9eX2wo", // Until I Found You
  "450p7goxZqg", // All of Me
  "ohJwF3g5z9A", // Lover Remix
  "rXz9D7bZ9mM"  // Dhairya (example ID)
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
