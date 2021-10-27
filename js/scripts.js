function find() {
	document.location.href='#search';
	document.getElementById("find").focus();
};

function search() {
  document.getElementById("list").innerHTML = "";
  term = document.getElementById("find").value;
  fetch('https://api.themoviedb.org/3/search/multi?api_key=fc51837ea3d1a8362a61bd59be99f8c1&language=en-US&query=' + term + '&include_adult=true')
    .then(response => response.json())
    .then(data => result(data.results));
  
  function result(get) {
    for (i of get) {
      if (i.media_type == 'movie') {
        createCard(i.id, i.title, i.poster_path, i.overview, 'FILM')
      };
      if (i.media_type == 'tv') {
        createCard(i.id, i.name, i.backdrop_path, i.overview, 'TV SHOW')
      };
    }
  };
  
  function createCard(id, name, image, about, type) {
	if (type == "FILM") {
		color = "#FF5733";
	};
	if (type == "TV SHOW") {
		color = "#33A8FF";
	};
    elem = document.createElement("div");
    elem.className = "card";
	
	if (!about) {
		about = "<i>No description given</i>"
	};
    elem.innerHTML = "<img src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + image + "' onError='this.onerror=null;this.src=\"/images/error.jpg\";'><h1>" + name + "</h1><h3 style='position: absolute; top: 0; right: 0; border-bottom-left-radius: 20px; border-top-right-radius: 10px; margin: 0; background-color: " + color + "; padding: 10px;'>" + type + "</h3><p>" + about + "</p><button onclick='watch(\"" + id + "\", \"" + type + "\")'>Watch Now</button>";
    document.getElementById("list").append(elem);
  }
};


window.onload = function() {
	var input = document.getElementById("find");
	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	   event.preventDefault();
	   search();
	  }
	});
};

function watch(id, type) {
	if (type == "FILM") {
		window.location.href = '/film?id=' + id;
	};
	if (type == "TV SHOW") {
		window.location.href = '/tv?id=' + id;
	};
}