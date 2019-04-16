/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';

const photography = new Vue({
  el: '#photography',
  template: `<div id="photography">
      <viewer v-bind:photoData="photoData" v-bind:class="{ loading: loadingPhoto, notice: showingNotice }"></viewer>
      <navigator v-bind:albumList="albumList" v-bind:albumData="albumData" v-bind:selectedAlbum="selectedAlbum" v-bind:photoIndex="photoIndex" v-bind:selectedIndex="selectedIndex"></navigator>
      <sidebar v-bind:albumData="albumData" v-bind:selectedIndex="selectedIndex" v-bind:width="sidebarWidth" v-bind:class="{ loading: loadingAlbum }"></sidebar>
    </div>`,
  data: {
    loadingAlbum: false,
    loadingPhoto: true,
    albumList: null,
    albumData: null,
    selectedAlbum: null,
    photoData: null,
    photoIndex: null,
    selectedIndex: null,
    sidebarWidth: null,
    showingNotice: true,
  },
  methods: {
    getAlbumList() {
      const request = new XMLHttpRequest();
      request.open('GET', '/api/album', true);

      request.onload = () => {
        photography.albumList = JSON.parse(request.responseText); // Store album list data
        photography.loadingPhoto = false; // Hide loading
        if (photography.albumData === null) {
          photography.getAlbumData('portfolio');
        }
      };

      request.send();
    },
    getAlbumData(album) {
      this.loadingAlbum = true;

      const request = new XMLHttpRequest();
      request.open('GET', `/api/album/${album}`, true);

      request.onload = () => {
        photography.albumData = JSON.parse(request.responseText); // Store album photo data
        photography.selectedAlbum = album; // Set the album key for the drop-down selected option
        photography.photoIndex = 0;
        photography.selectedIndex = 0; // Reset the photo and selected indexs to 0
        photography.changePhoto(photography.selectedIndex); // Load the first photo
        photography.resizeSidebar();
        if (photography.selectedAlbum === null) {
          photography.selectedAlbum = 'portfolio';
        } else {
          photography.selectedAlbum = album;
        }
      };

      request.send();
    },
    changeAlbum(key) {
      // Call API to get new album data with an album key
      this.getAlbumData(key);
    },
    changePhoto(index) {
      // Show loading
      this.loadingPhoto = true;

      // Change the selected photo index even if it's loading
      photography.selectedIndex = index;

      // Create a new image object for pre-loading
      const image = new Image();

      image.onload = () => {
        // Once the image has loaded, update the photo index and remove the loading
        photography.photoIndex = index;
        photography.photoData = photography.albumData[photography.photoIndex];
        photography.loadingAlbum = false;
        photography.loadingPhoto = false;
      };

      // Set the image src attribute to the image url to start pre-loading
      const targetUrl = this.albumData[index].image_url;
      image.src = targetUrl;
    },
    prevPhoto() {
      // Hide notice
      this.showingNotice = false;

      let index;

      // Check if index is at the minimum, reset to maximum
      if (this.selectedIndex <= 0) {
        index = this.albumLength;
      } else {
        index = this.selectedIndex - 1;
      }

      this.changePhoto(index);
    },
    nextPhoto() {
      // Hide notice
      this.showingNotice = false;

      let index;

      // Check if index is at the maximum, reset to zero
      if (this.selectedIndex >= this.albumLength) {
        index = 0;
      } else {
        index = this.selectedIndex + 1;
      }

      this.changePhoto(index);
    },
    closeAlbum() {
      // Clear albumData data
      this.albumData = null;
    },
    resizeSidebar() {
      const total = this.albumData.length;
      const width = (50 * total) + (10 * total);
      this.sidebarWidth = width;
    },
  },
  computed: {
    albumLength() {
      return this.albumData.length - 1;
    },
  },
  mounted() {
    this.getAlbumList();

    // Attach key commands to previous and next methods
    document.addEventListener('keydown', ({ keyCode }) => {
      if (photography.albumData !== null) {
        if (keyCode === 37 || keyCode === 38 || keyCode === 80 || keyCode === 65) {
          photography.prevPhoto();
        } else if (keyCode === 39 || keyCode === 40 || keyCode === 78 || keyCode === 68) {
          photography.nextPhoto();
        }
      }
    }, false);
  },
});

Vue.component('viewer', {
  props: ['photoData'],
  template: `<div class="viewer" v-bind:class="{ full: fullscreen }">
      <div class="notice">
        <span class="wrapper">{{ noticeText }}</span>
      </div>
      <div href="#" class="fullscreen" v-on:click="toggleFullscreen"></div>
      <div href="#" class="arrow prev" v-on:click="prevPhoto"></div>
      <div href="#" class="arrow next" v-on:click="nextPhoto"></div>
      <div v-if="photoData" class="viewer-photo" v-bind:style="{ backgroundImage: backgroundURL }"></div>
    </div>`,
  data() {
    return {
      fullscreen: false,
    };
  },
  methods: {
    toggleFullscreen() {
      // Toggle fullscreen boolean
      this.fullscreen = !this.fullscreen;
    },
    prevPhoto() {
      // Call parent method to show the previous photo
      photography.prevPhoto();
    },
    nextPhoto() {
      // Call parent method to show the next photo
      photography.nextPhoto();
    },
  },
  computed: {
    noticeText() {
      let text = 'Swipe left or right above';
      if (this.fullscreen === false) {
        text += ', or scroll the thumbnails below';
      }
      return text;
    },
    backgroundURL() {
      // Return background image string
      return `url("${this.photoData.image_url}")`;
    },
  },
});

Vue.component('navigator', {
  props: ['albumList', 'albumData', 'photoIndex', 'selectedIndex'],
  template: `<div class="navigator">
      <ul class="details" v-if="showDetails">
        <li class="title">{{ photoTitle }}</li>
        <li class="index">Photo {{ selectedIndex + 1 }} of {{ albumLength }}</li>
      </ul>
      <select v-if="albumList" v-bind:value="selectedValue" v-on:change="changeAlbum" class="selector" ref="selector">
        <optgroup label="Albums">
          <option v-for="album in albumList" :key="album" v-bind:value="album.key">{{ album.title }}</option>
        </optgroup>
      </select>
    </div>`,
  methods: {
    changeAlbum() {
      photography.changeAlbum(this.$refs.selector.value);
    },
    closeAlbum() {
      // Call parent method to close album view
      photography.closeAlbum();
    },
  },
  computed: {
    selectedValue() {
      return photography.selectedAlbum;
    },
    showDetails() {
      // Need to compute the v-if bind as a photo index of 0 behaves the same as false
      return this.selectedIndex !== null;
    },
    photoTitle() {
      // Return the title of currently selected photo by its index
      return this.albumData[this.selectedIndex].title;
    },
    albumLength() {
      // Return the number of photos in the current album
      return this.albumData.length;
    },
  },
});

Vue.component('sidebar', {
  props: ['albumData', 'selectedIndex', 'width'],
  template: `<div class="sidebar" ref="scroll">
      <div class="sidebar-wrapper" v-bind:style="{ width: sidebarWidth }">
        <a href="#" v-for="(photo, index) in albumData" :key="index" v-on:click="changePhoto(index)" v-bind:class="{ current: index === selectedIndex }" v-bind:style="{ backgroundImage: returnBackgroundURL(photo.thumbnail_url) }" class="sidebar-thumb"></a>
      </div>
    </div>`,
  methods: {
    scrollPhotos() {
      const thumbnailSizeLarge = 80;
      const thumbnailMarginLarge = 20;
      const thumbnailPaddingLarge = 20;

      const largeSize = thumbnailSizeLarge + thumbnailMarginLarge;
      let scrollLarge = largeSize * this.selectedIndex;
      scrollLarge -= (this.$refs.scroll.offsetHeight / 2);
      scrollLarge -= (largeSize / 2);
      scrollLarge -= (thumbnailPaddingLarge / 2);

      this.$refs.scroll.scrollTop = scrollLarge;

      const thumbnailSizeSmall = 50;
      const thumbnailMarginSmall = 10;
      const thumbnailPaddingSmall = 10;

      const smallSize = thumbnailSizeSmall + thumbnailMarginSmall;
      let scrollSmall = smallSize * this.selectedIndex;
      scrollSmall -= (window.innerWidth / 2);
      scrollSmall -= (smallSize / 2);
      scrollSmall -= (thumbnailPaddingSmall / 2);

      this.$refs.scroll.scrollLeft = scrollSmall;
    },
    changePhoto(index) {
      // Hide notice
      photography.showingNotice = false;
      // Call parent method to change photo index
      photography.changePhoto(index);
    },
    returnBackgroundURL(url) {
      // Return background image string
      return `url("${url}")`;
    },
  },
  computed: {
    sidebarWidth() {
      if (this.width === null) {
        return null;
      }

      return `${this.width}px`;
    },
  },
  watch: {
    selectedIndex() {
      this.scrollPhotos();
    },
  },
  mounted() {
    const self = this;
    window.onresize = () => {
      setTimeout(() => {
        self.scrollPhotos();
      }, 0);
    };
  },
});
