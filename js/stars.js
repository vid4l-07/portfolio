
fetch("https://api.github.com/repos/vid4l-07/Klip")
  .then(res => res.json())
  .then(data => {
    document.getElementById("klip-stars").textContent = data.stargazers_count;
  })
  .catch(() => {
    document.getElementById("klip-stars").textContent = "?";
  });


fetch("https://api.github.com/repos/vid4l-07/dotfiles-hyprland")
  .then(res => res.json())
  .then(data => {
    document.getElementById("hypr-stars").textContent = data.stargazers_count;
  })
  .catch(() => {
    document.getElementById("hypr-stars").textContent = "?";
  });

