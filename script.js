function startTypewriter(lines, element, callback) {
  let lineIndex = 0;
  let charIndex = 0;

  element.textContent = "";

  function type() {
    if (lineIndex >= lines.length) {
      if (callback) callback();
      return;
    }

    if (charIndex < lines[lineIndex].length) {
      element.textContent += lines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 50);
    } else {
      element.textContent += "\n\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(type, 400);
    }
  }

  type();
}
