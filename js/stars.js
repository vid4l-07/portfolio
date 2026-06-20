fetch("https://api.github.com/users/vid4l-07/repos?per_page=100")
	.then(res => res.json())
	.then(repos => {
		const map = {};

		repos.forEach(repo => {
			map[repo.name] = repo.stargazers_count;
		});
	
		if (map["Klip"] == null) {
			document.getElementById("klip-stars-org").style.display = "none";
		} else {
			document.getElementById("klip-stars").textContent = map["Klip"];
		}

		if (map["dotfiles-hyprland"] == null) {
			document.getElementById("hypr-stars-org").style.display = "none";
		} else {
			document.getElementById("hypr-stars").textContent = map["dotfiles-hyprland"];
		}


	})
	.catch(() => {
		document.getElementById("klip-stars-org").style.display = "none";
		document.getElementById("hypr-stars-org").style.display = "none";
	});
