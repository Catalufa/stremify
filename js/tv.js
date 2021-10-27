window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id').split("/")[0];
	window.id = id;
	fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=fc51837ea3d1a8362a61bd59be99f8c1&language=en-US')
	  .then(response => response.json())
	  .then(data => result(data));
};

function result(get) {
	window.show = get.name;
	document.getElementById("name").innerHTML = get.name + " <i>(" + get.first_air_date.split("-")[0] + ")</i>";
	document.getElementById("cover").src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + get.backdrop_path;
	const hrs = Math.floor(get.episode_run_time[0]/60);
	const mins = get.episode_run_time[0] - hrs*60;
	if (hrs == 0) {
		var time = mins + "m"
	} else {
		var time = hrs + "h " + mins + "m"
	};
	
	var genre = get.genres[0]
	if (!genre) {
		var genre = "Other";
	} else {
		var genre = get.genres[0].name;
	};
	document.getElementById("details").innerHTML = genre + " &bull; " + get.vote_average * 10 + "% positive &bull; " + time;
	
	document.getElementById("tag").innerHTML = "<i>" + get.tagline + "</i>";
	
	if (!get.overview) {
		get.overview = "<i>No description given</i>"
	};
	
	document.getElementById("overview").innerHTML = get.overview;

	window.season = get.seasons[0].season_number;
	get.seasons.forEach(data => {
		seasonAdd(data.name, data.episode_count, data.air_date, data.season_number);
	});
	document.getElementById("season").value = 1;
	updateSeason();
};

function seasonAdd(name, episodes, date, sNumber) {
	sMenu = document.getElementById("season").innerHTML;
	document.getElementById("season").innerHTML = sMenu + "<option value='" + sNumber + "'>" + name + " (" + episodes + " episodes)</option>";
};

function updateSeason() {
	window.season = document.getElementById("season").value;
	fetch('https://api.themoviedb.org/3/tv/' + id + '/season/' + season + '?api_key=fc51837ea3d1a8362a61bd59be99f8c1&language=en-US')
		.then(response => response.json())
		.then(data => {
			document.getElementById("episode").innerHTML = '';
			data.episodes.forEach(data => {
				eMenu = document.getElementById("episode").innerHTML;
				document.getElementById("episode").innerHTML = eMenu + "<option value='" + data.episode_number + "'>" + data.episode_number + ". " + data.name + "</option>";
			});
		});
};

function updateEpisode() {
	window.episode = document.getElementById("episode").value;
};

function later() {
	if (localStorage.getItem('later')) {
		var later = localStorage.getItem('later').split(",");
	} else {
		var later = []
	};
	if (later.includes(id)) {
		var index = later.indexOf(id);
		later.splice(index, 1);
		localStorage.setItem('later', later);
		document.getElementById("later").innerHTML = "+ Add to Watch Later";
		
	} else {
		later.push(id);
		localStorage.setItem('later', later);
		document.getElementById("later").innerHTML = "&#10004; Added to Watch Later";
	};
};

function play() {
	updateEpisode();
	Swal.fire({
	  title: 'Loading Stremify Player...',
	  html: 'This may take a few seconds',
	  allowEscapeKey: false,
	  allowOutsideClick: false,
	  didOpen: () => {
		Swal.showLoading()
	  }
	});
	//document.getElementById("watch").src = "https://www.2embed.ru/embed/tmdb/tv?id=" + id + "&s=" + season + "&e=" + episode;
	
	document.getElementById("watch").src = "/filter.php?furl=https://123moviesplayer.com/show/" + show.toLowerCase().replaceAll(/[^a-zA-Z0-9 ]/g, '-').replaceAll(/ +/g, '-').replaceAll(/-+/g, '-') + "/" + season.padStart(2, "0") + "-" + episode.padStart(2, "0") + "?src=mirror7";
}