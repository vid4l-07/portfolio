const botonlen = document.getElementById("len-btn");
const botonsist = document.getElementById("sist-btn");
const len = document.getElementById("len");
const sist = document.getElementById("sist");

botonlen.addEventListener("click", () => {
  len.classList.remove("oculto"); 
  sist.classList.add("oculto"); 
  botonlen.classList.add("btn-active");
  botonsist.classList.remove("btn-active");
});

botonsist.addEventListener("click", () => {
    sist.classList.remove("oculto"); 
    len.classList.add("oculto"); 
    botonsist.classList.add("btn-active");
    botonlen.classList.remove("btn-active");
});

const sections = [
  { id: "top", btn: document.getElementById("boton-top") },
  { id: "about", btn: document.getElementById("boton-about") },
  { id: "proyectos", btn: document.getElementById("boton-proyectos") },
  { id: "contacto", btn: document.getElementById("boton-contacto") },
];

const observer = new IntersectionObserver((entries) => {
  let visible = null;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      visible = entry.target.id;
    }
  });
  if (visible) {
    sections.forEach(({ id, btn }) => {
      btn.classList.toggle("activo", id === visible);
    });
  }
}, { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" });

sections.forEach(({ id }) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});
