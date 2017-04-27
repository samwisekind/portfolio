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

var viewer = Vue.component('viewer', {
	props: ['photo'],
	template: `<div class="viewer">
			<p v-on:click="prevPhoto">Back</p>
			<div class="viewer-photo" v-bind:style="{ backgroundImage: backgroundURL }"></div>
			<p v-on:click="nextPhoto">Next</p>
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
			return 'url("img/albums/' + this.photo.image_url + '")';
		}
	}
});

var navigator = Vue.component('navigator', {
	props: ['albumList', 'albumData', 'selectedAlbum', 'photoIndex'],
	template: `<div class="navigator">
			<ul class="details">
				<li class="title">{{ photoTitle }}</li>
				<li class="index">Photo {{ photoIndex + 1 }} of {{ albumLength }}</li>
			</ul>
			<a v-on:click="closeAlbum" href="#" class="close"></a>
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
		closeAlbum: function() {
			// Call parent method to close album view
			photography.closeAlbum();
		}
	},
	computed: {
		photoTitle: function() {
			// Return the title of currently selected photo by its index
			return this.albumData[this.photoIndex].title;
		},
		albumLength: function() {
			// Return the number of photos in the current album
			return this.albumData.length;
		}
	}
});

var sidebar = Vue.component('sidebar', {
	props: ['albumData', 'photoIndex'],
	template: `<div class="sidebar">
			<a href="#" v-for="(photo, index) in albumData" :key="index" v-on:click="changePhoto(index)" v-bind:class="{ current: index === photoIndex }" v-bind:style="{ backgroundImage: returnBackgroundURL(photo.thumbnail_url) }" class="sidebar-thumb"></a>
		</div>`,
	methods: {
		changePhoto: function(index) {
			// Call parent method to change photo index
			photography.changePhoto(index);
		},
		returnBackgroundURL: function(url) {
			return 'url("img/albums/' + url + '")';
		}
	}
});

var album = Vue.component('album', {
	props: ['albumList', 'albumData', 'album', 'photoIndex'],
	template: `<transition>
			<div id="album">
				<viewer v-bind:photo="photoData"></viewer>
				<navigator v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:selectedAlbum="album" v-bind:photoIndex="photoIndex"></navigator>
				<sidebar v-bind:albumData="albumData" v-bind:photoIndex="photoIndex"></sidebar>
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
	template: `<div id="photography">
			<selection v-if="!albumData" v-bind:albumList="albumList"></selection>
			<album v-if="albumData" v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:album="selectedAlbum" v-bind:photoIndex="photoIndex"></album>
		</div>`,
	data: {
		albumList: null,
		albumData: null,
		selectedAlbum: null,
		photoIndex: null
	},
	methods: {
		getAlbumList: function() {

			axios.get('/api/album')
				.then(function(response) {
					photography.albumList = response.data; // Store album list data
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
					photography.photoIndex = 0; // Reset photo index to the first photo (0)
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
			// Set new photo index that will be passed down to components
			this.photoIndex = index;
		},
		prevPhoto: function() {

			// Check if index is at the minimum, reset to maximum
			if (this.photoIndex <= 0) {
				this.photoIndex = this.albumLength;
			}
			else {
				this.photoIndex--;
			}

		},
		nextPhoto: function() {

			// Check if index is at the maximum, reset to zero
			if (this.photoIndex >= this.albumLength) {
				this.photoIndex = 0;
			}
			else {
				this.photoIndex++;
			}

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

		this.getAlbumData('yunnan');

	}
});
