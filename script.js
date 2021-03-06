function displayMediums() {
	var html = '';
	
	for (var medium in filters) {
		html += `<button id="medium-${medium}" class="medium" onclick="displayGenres('${medium}');displayWorks('${medium}','All')">${medium}</button>`
	}
	
	document.getElementById('mediums').innerHTML = html;
}

function displayGenres(medium) {
	var genres = filters[medium];
	var html = '';
	
	for (var i = 0; i < genres.length; i++) {
		var genre = genres[i];
		html += `<button id="genre-${genre}" class="genre" onclick="displayWorks('${medium}','${genre}')">${genre}</button>`
	}
	
	document.getElementById('genres').innerHTML = html;
}

function displayWorks(medium, genre) {
	var html = '';
	
	for (var i = 0; i < data.length; i++) {
		var work = data[i];
		if (work.medium.includes(medium) && (work.genre.includes(genre) || genre == 'All')) {
			var content = '';
			html += `<div onclick="openLightbox('${work.type}', '${work.youtubeUrl}', '${work.photoFilenames}', '${work.slug}')" style="background-image: url('img/thumbnails/${work.thumbnailFilename}')">
						<div class="work-info">
							<div class="title">${work.title}</div>
						</div>
					</div>`;
		}
	}
	
	setActiveFilters(medium, genre);
	
	document.getElementById('work-content').innerHTML = html;
}

function setActiveFilters(medium, genre) {
	var mediums = document.getElementsByClassName('medium');
	var genres = document.getElementsByClassName('genre');
	
	for (var i = 0; i < mediums.length; i++) {
		var elm = mediums[i];
		var id = 'medium-' + medium;
		elm.id == id ? elm.classList.add('active') : elm.classList.remove('active');
	}
	
	for (var j = 0; j < genres.length; j++) {
		var elm = genres[j];
		var id = 'genre-' + genre;
		elm.id == id ? elm.classList.add('active') : elm.classList.remove('active');
	}
}

window.onscroll = function() {
	var navbar = document.getElementById('navbar');
	window.pageYOffset > window.innerHeight - 40 ? navbar.classList.add('black') : navbar.classList.remove('black');
}

function openLightbox(type, youtubeUrl, photoFilenames, albumName) {
	if (type == 'video') {
		SimpleLightbox.open({
			items: [youtubeUrl.replace('watch?v=', 'embed/')]
		})
	} else {
		var photos = photoFilenames.split(',');
		for (var i = 0; i < photos.length; i++) {
			var url = 'img/albums/' + albumName + '/' + photos[i];
			photos[i] = url;
		}
		SimpleLightbox.open({
			items: photos
		})
	}
}

displayMediums();
displayGenres(defaultMedium);
displayWorks(defaultMedium, defaultGenre);
