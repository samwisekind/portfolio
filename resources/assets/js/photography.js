window.Vue = require('vue');
window.axios = require('axios');

var selection = Vue.component('selection', {
	props: ['albumList'],
	template: `<transition>
			<div id="selection">
				<div v-for="album in albumList" class="album">
					<a href="#" class="preview" v-on:click="openAlbum(album.key)">
						<img src="http://placekitten.com.s3.amazonaws.com/homepage-samples/200/140.jpg" alt="" />
					</a>
					<h2><a href="#" v-on:click="openAlbum(album.key)">{{ album.title }}</a></h2>
					<p v-if="album.location">{{ album.location }}</p>
				</div>
			</div>
		</transition>`,
	methods: {
		openAlbum: function(key) {
			// Call parent method to get album data from album key
			photography.getAlbumData(key);
		}
	}
});

var globe = Vue.component('globe', {
	template: `<transition>
			<div class="globe">
				<div id="map-canvas" style="width: 100%; height: 100%;"></div>
			</div>
		</transition>`
});

var viewer = Vue.component('viewer', {
	props: ['photo'],
	template: `<div class="viewer">
			<div href="#" class="arrow prev" v-on:click="prevPhoto"></div>
			<div href="#" class="arrow next" v-on:click="nextPhoto"></div>
			<div v-if="photo" class="viewer-photo" v-bind:style="{ backgroundImage: backgroundURL }"></div>
		</div>`,
	methods: {
		prevPhoto: function() {
			// Call parent method to show the previous photo
			photography.prevPhoto();
		},
		nextPhoto: function() {
			// Call parent method to show the next photo
			photography.nextPhoto();
		}
	},
	computed: {
		backgroundURL: function() {
			// Return background image string
			return 'url("img/albums/' + this.photo.image_url + '")';
		}
	}
});

var navigator = Vue.component('navigator', {
	props: ['albumList', 'albumData', 'selectedAlbum', 'photoIndex', 'selectedIndex', 'globeOpen'],
	template: `<div class="navigator">
			<ul class="details" v-if="showDetails">
				<li class="title">{{ photoTitle }}</li>
				<li class="index">Photo {{ selectedIndex + 1 }} of {{ albumLength }}</li>
			</ul>
			<div class="buttons">
				<a v-if="!globeOpen" v-on:click="openMap" href="#" class="button map">Map</a>
				<a v-if="globeOpen" v-on:click="closeMap" href="#" class="button close">Close</a>
				<a v-on:click="closeAlbum" href="#" class="button menu">Menu</a>
			</div>
			<select v-if="albumList" v-model="currentAlbum" v-on:change="changeAlbum" class="selector">
				<optgroup label="Albums">
					<option v-for="album in albumList" :key="album" v-bind:value="album.key">{{ album.title }}</option>
				</optgroup>
			</select>
		</div>`,
	data: function() {
		return {
			// Save prop as data
			currentAlbum: this.selectedAlbum
		};
	},
	methods: {
		changeAlbum: function() {
			// Pass in data-prop album key to parent method
			photography.changeAlbum(this.currentAlbum);
		},
		openMap: function() {
			photography.mapOpen();
		},
		closeMap: function() {
			photography.mapClose();
		},
		closeAlbum: function() {
			// Call parent method to close album view
			photography.closeAlbum();
		}
	},
	computed: {
		showDetails: function() {
			// Need to compute the v-if bind as a photo index of 0 behaves the same as false
			return this.selectedIndex !== null;
		},
		photoTitle: function() {
			// Return the title of currently selected photo by its index
			return this.albumData[this.selectedIndex].title;
		},
		albumLength: function() {
			// Return the number of photos in the current album
			return this.albumData.length;
		}
	}
});

var sidebar = Vue.component('sidebar', {
	props: ['albumData', 'selectedIndex'],
	template: `<div class="sidebar">
			<a href="#" v-for="(photo, index) in albumData" :key="index" v-on:click="changePhoto(index)" v-bind:class="{ current: index === selectedIndex }" v-bind:style="{ backgroundImage: returnBackgroundURL(photo.thumbnail_url) }" class="sidebar-thumb"></a>
		</div>`,
	methods: {
		changePhoto: function(index) {
			// Call parent method to change photo index
			photography.changePhoto(index);
		},
		returnBackgroundURL: function(url) {
			// Return background image string
			return 'url("img/albums/' + url + '")';
		}
	}
});

var album = Vue.component('album', {
	props: ['albumList', 'albumData', 'globeOpen', 'album', 'photoIndex', 'selectedIndex'],
	template: `<transition>
			<div id="album">
				<globe v-show="globeOpen"></globe>
				<viewer v-bind:photo="photoData"></viewer>
				<navigator v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:selectedAlbum="album" v-bind:photoIndex="photoIndex" v-bind:selectedIndex="selectedIndex" v-bind:globeOpen="globeOpen"></navigator>
				<sidebar v-bind:albumData="albumData" v-bind:selectedIndex="selectedIndex"></sidebar>
			</div>
		</transition>`,
	computed: {
		photoData: function() {
			return this.albumData[this.photoIndex];
		}
	}
});

var photography = new Vue({
	el: '#photography',
	template: `<div id="photography" v-bind:class="{ loading: isLoading }">
			<selection v-if="!albumData" v-bind:albumList="albumList"></selection>
			<album v-if="albumData" v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:album="selectedAlbum" v-bind:photoIndex="photoIndex" v-bind:selectedIndex="selectedIndex" v-bind:globeOpen="globeOpen"></album>
		</div>`,
	data: {
		isLoading: true,
		albumList: null,
		albumData: null,
		selectedAlbum: null,
		photoIndex: null,
		selectedIndex: null,
		mapLoaded: false,
		globeOpen: false
	},
	methods: {
		getAlbumList: function() {

			axios.get('/api/album')
				.then(function(response) {
					photography.albumList = response.data; // Store album list data
					photography.isLoading = false; // Hide loading
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		getAlbumData: function(album) {

			axios.get('/api/album/' + album)
				.then(function(response) {
					photography.albumData = response.data; // Store album photo data
					photography.selectedAlbum = album; // Set the album key for the drop-down selected option
					photography.photoIndex = photography.selectedIndex = 0; // Reset the photo and selected indexs to 0
					photography.changePhoto(photography.selectedIndex); // Load the first photo via the pre-loading method
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		changeAlbum: function(key) {
			// Call API to get new album data with an album key
			this.getAlbumData(key);
		},
		changePhoto: function(index) {

			// Show loading
			this.isLoading = true;

			// Change the selected photo index even if it's loading
			photography.selectedIndex = index;

			// Create a new image object for pre-loading
			var image = new Image();

			image.onload = function() {
				// Once the image has loaded, update the photo index and remove the loading
				photography.photoIndex = index;
				photography.isLoading = false;
			};

			// Set the image src attribute to the image url to start pre-loading
			var targetUrl = this.albumData[index].image_url;
			image.src = 'img/albums/' + targetUrl;

		},
		prevPhoto: function() {

			var index;

			// Check if index is at the minimum, reset to maximum
			if (this.selectedIndex <= 0) {
				index = this.albumLength;
			}
			else {
				index = this.selectedIndex - 1;
			}

			this.changePhoto(index);

		},
		nextPhoto: function() {

			var index;

			// Check if index is at the maximum, reset to zero
			if (this.selectedIndex >= this.albumLength) {
				index = 0;
			}
			else {
				index = this.selectedIndex + 1;
			}

			this.changePhoto(index);

		},
		mapLoad: function() {

			var location = new google.maps.LatLng(20, 0);
			var mapOptions = {
				center: location,
				zoom: 2,
				scrollwheel: false
			};

			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			for (var i = 0; i < this.albumList.length; i++) {

				var data = this.albumList[i];

				if (data.map_latitude === 0 || data.map_longitude === 0) {
					continue;
				}

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(data.map_latitude, data.map_longitude),
					map: map,
					title: data.title,
					key: data.key
				});

				google.maps.event.addListener(marker, 'click', function() {
					photography.getAlbumData(this.key);
					photography.mapClose();
				});

			}

			this.mapLoaded = true;

		},
		mapOpen: function() {
			if (this.mapLoaded === false) {
				this.mapLoad();
			}
			this.globeOpen = true;
		},
		mapClose: function() {
			this.globeOpen = false;
		},
		closeAlbum: function() {
			// Clear albumData data
			this.albumData = null;
		}
	},
	computed: {
		albumLength: function() {
			return this.albumData.length - 1;
		}
	},
	mounted: function() {

		this.getAlbumList();

		// Attach key commands to previous and next methods
		document.addEventListener('keydown', function(event) {
			if (photography.albumData !== null) {
				switch (event.keyCode) {
					case 37:
					case 38:
					case 80:
					case 65:
						photography.prevPhoto();
						break;
					case 39:
					case 40:
					case 78:
					case 68:
						photography.nextPhoto();
				}
			}
		}, false);

	}
});
