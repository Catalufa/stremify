window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id').split("/")[0];
	window.id = id;
	fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=fc51837ea3d1a8362a61bd59be99f8c1&language=en-US')
	  .then(response => response.json())
	  .then(data => result(data));
};

function result(get) {
	window.movie = get.title;
	window.imdb_id = get.imdb_id;
	document.getElementById("name").innerHTML = get.title + " <i>(" + get.release_date.split("-")[0] + ")</i>";
	document.getElementById("cover").src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + get.poster_path;
	const hrs = Math.floor(get.runtime/60);
	const mins = get.runtime - hrs*60;
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
	Swal.fire({
	  title: 'Loading Stremify Player...',
	  html: 'This may take a few seconds',
	  allowEscapeKey: false,
	  allowOutsideClick: false,
	  didOpen: () => {
		Swal.showLoading()
	  }
	});
	//document.getElementById("watch").src = "https://www.2embed.ru/embed/tmdb/movie?id=" + id;
	//document.getElementById("watch").src = "../framefilter.php?furl=https://vidsrc.me/embed/" + imdb_id;
	//document.getElementById("watch").src = "../framefilter.php?furl=https://fsapi.xyz/movie/" + imdb_id;
	//document.getElementById("watch").src = "../framefilter.php?furl=https://imdbapi.xyz/movie/?c=" + imdb_id;
	//document.getElementById("watch").src = "../framefilter.php?furl=https://dbgo.fun/imdb.php?id=" + imdb_id;
	//document.getElementById("watch").src = "https://database.gdriveplayer.us/player.php?imdb=" + imdb_id;
	document.getElementById("watch").src = "/filter.php?furl=https://123moviesplayer.com/movie/" + movie.toLowerCase().replaceAll(/[^a-zA-Z0-9 ]/g, '-').replaceAll(/ +/g, '-').replaceAll(/-+/g, '-');
}