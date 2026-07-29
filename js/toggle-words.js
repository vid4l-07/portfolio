const frases = ["Computer Engineering student", "Linux Environments Enthusiast", "Interested in Cybersecurity"];
const texto = document.getElementById("intro-text");
let i = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
  const current = frases[i];

  if (isPaused) {
    setTimeout(typeEffect, 2000);
    isPaused = false;
    return;
  }

  if (!isDeleting) {
    texto.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isPaused = true;
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 60 + Math.random() * 60);
  } else {
    texto.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      i = (i + 1) % frases.length;
      setTimeout(typeEffect, 300);
      return;
    }
    setTimeout(typeEffect, 30 + Math.random() * 40);
  }
}

typeEffect();
