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
			photography.getAlbumData(key);
		}
	}
});

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
			<div v-for="(photo, index) in albumData" :key="index" v-on:click="changePhoto(index)" v-bind:class="{ current: index === photoIndex }" class="sidebar-thumb" style="background-image: url('http://placekitten.com.s3.amazonaws.com/homepage-samples/200/140.jpg');"></div>
		</div>`,
	methods: {
		changePhoto: function(index) {
			photography.changePhoto(index);
		}
	}
});

var album = Vue.component('album', {
	props: ['albumList', 'albumData', 'album', 'photoIndex'],
	template: `<transition>
			<div id="album">
				<viewer v-bind:photo="photoData"></viewer>
				<navigator v-bind:photo="photoData" v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:selectedAlbum="album"></navigator>
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
