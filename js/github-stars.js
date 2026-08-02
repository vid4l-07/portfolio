// --- GITHUB STARS ---
fetch("https://api.github.com/users/vid4l-07/repos?per_page=100")
  .then(function(res) { return res.json(); })
  .then(function(repos) {
    var map = {};
    repos.forEach(function(repo) {
      map[repo.name] = repo.stargazers_count;
    });

    if (map["Klip"] == null) {
      var klipStars = document.getElementById("klip-stars-org");
      if (klipStars) klipStars.style.display = "none";
    } else {
      var klipEl = document.getElementById("klip-stars");
      if (klipEl) klipEl.textContent = map["Klip"];
    }

    if (map["dotfiles-hyprland"] == null) {
      var hyprStars = document.getElementById("hypr-stars-org");
      if (hyprStars) hyprStars.style.display = "none";
    } else {
      var hyprEl = document.getElementById("hypr-stars");
      if (hyprEl) hyprEl.textContent = map["dotfiles-hyprland"];
    }
  })
  .catch(function() {
    var klipStars = document.getElementById("klip-stars-org");
    if (klipStars) klipStars.style.display = "none";
    var hyprStars = document.getElementById("hypr-stars-org");
    if (hyprStars) hyprStars.style.display = "none";
  });
