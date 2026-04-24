const frases = ["Computer Engineering student", "Linux & Low-Level Systems Enthusiast", "Interested in Cybersecurity"];

const texto = document.getElementById("intro-text");

let i = 0;

setInterval(() => {

  texto.classList.remove("entrar");
  texto.classList.add("salir");

  setTimeout(() => {
    i = (i + 1) % frases.length;
    texto.textContent = frases[i];

    texto.classList.remove("salir");
    texto.classList.add("entrar");

  }, 500);

}, 4000);
