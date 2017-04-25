window.Vue = require('vue');
window.axios = require('axios');

var sidebar = Vue.component('sidebar', {
	props: ['photos'],
	template: `<ul>
			<li v-for="photo in photos" :key="photo">{{ photo.title }}</li>
		</ul>`
});

var photography = new Vue({
	el: '#photography',
	template: `
		<div>
			<h1>Hello world!</h1>
			<select v-model="selectedAlbum" v-on:input="getAlbumData">
				<option value="portfolio">Portfolio</option>
				<option value="hongkong">Hong Kong</option>
			</select>
			<h2>Select photos:</h2>
			<sidebar v-bind:photos="albumData"></sidebar>
		</div>`,
	data: {
		selectedAlbum: 'portfolio',
		albumData: null
	},
	methods: {
		getAlbumData: function() {

			axios.get('/album/' + this.selectedAlbum)
				.then(function (response) {
					photography.albumData = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});

		}
	}
});