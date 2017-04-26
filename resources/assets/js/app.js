window.Vue = require('vue');
window.axios = require('axios');

var viewer = Vue.component('viewer', {
	props: ['photo'],
	template: `<div class="viewer">
			<p v-on:click="prevPhoto">Back</p>
			<p v-if="photo">{{ photo.title }}</p>
			<p v-on:click="nextPhoto">Next</p>
		</div>`,
	methods: {
		prevPhoto: function() {
			photography.prevPhoto();
		},
		nextPhoto: function() {
			photography.nextPhoto();
		}
	}
});

var navigator = Vue.component('navigator', {
	props: ['albumList', 'albumData', 'selectedAlbum'],
	template: `<div class="navigator">
			<select v-if="albumList" v-model="currentAlbum" v-on:change="changeAlbum">
				<option v-for="album in albumList" :key="album" v-bind:value="album.key">{{ album.title }}</option>
			</select>
			<p v-on:click="closeAlbum">Close</p>
		</div>`,
	data: function() {
		return {
			currentAlbum: this.selectedAlbum
		};
	},
	methods: {
		changeAlbum: function() {
			photography.changeAlbum(this.currentAlbum);
		},
		closeAlbum: function() {
			photography.closeAlbum();
		}
	}
});

var sidebar = Vue.component('sidebar', {
	props: ['albumData', 'photoIndex'],
	template: `<div class="sidebar">
			<ul>
				<li v-for="(photo, index) in albumData" :key="index" v-on:click="changePhoto(index)">{{ photo.title }}</li>
			</ul>
		</div>`,
	methods: {
		changePhoto: function(index) {
			photography.changePhoto(index(selector/element));
		}
	}
});

var album = Vue.component('album', {
	props: ['albumList', 'albumData', 'album', 'photoIndex'],
	template: `<div id="album">
			<viewer v-bind:photo="photoData"></viewer>
			<navigator v-bind:photo="photoData" v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:selectedAlbum="album"></navigator>
			<sidebar v-bind:albumData="albumData" v-bind:photoIndex="photoIndex"></sidebar>
		</div>`,
	computed: {
		photoData: function() {
			return this.albumData[this.photoIndex];
		}
	}
});

var photography = new Vue({
	el: '#photography',
	template: `<div id="photography">
			<album v-if="albumData" v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:album="selectedAlbum" v-bind:photoIndex="photoIndex"></album>
			<ul v-if="!albumData">
				<li v-for="album in albumList" v-on:click="getAlbumData(album.key)">{{ album.key }}</li>
			</ul>
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
				.then(function (response) {
					photography.albumList = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});

		},
		getAlbumData: function(album) {

			axios.get('/api/album/' + album)
				.then(function (response) {
					photography.albumData = response.data;
					photography.selectedAlbum = album;
					photography.photoIndex = 0;
				})
				.catch(function (error) {
					console.log(error);
				});

		},
		changeAlbum: function(album) {
			this.getAlbumData(album);
		},
		changePhoto: function(newPhotoIndex) {
			this.photoIndex = newPhotoIndex;
		},
		prevPhoto: function() {

			if (this.photoIndex <= 0) {
				this.photoIndex = this.albumLength;
			}
			else {
				this.photoIndex--;
			}

		},
		nextPhoto: function() {

			if (this.photoIndex >= this.albumLength) {
				this.photoIndex = 0;
			}
			else {
				this.photoIndex++;
			}

		},
		closeAlbum: function() {
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
	}
});