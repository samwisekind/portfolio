<template lang="pug">
  #photography
    .viewer
      .notice
        .wrapper
      a.fullscreen(href="#")
      a.arrow.prev(href="#")
      a.arrow.next
      .viewer-photo

    .navigator
      ul.details
        li.title
        li.index Photo {{ current + 1 }} of {{ current.length }}
      select.selector
        optgroup(label="Albums")
          option(v-for="album in photos") {{ album.title }}
        
    .sidebar
      .sidebar-wrapper
        a.sidebar-thumb(href="#" v-for="photo in selected")
</template>

<script>
  import Vue from 'vue';

  export default {
    data: {
      photos: [],
      selected: {},
      current: 0,
    },
    async mounted() {
      const data = await fetch('/api/photos');
      this.photos = await data.json();
      this.selected = this.photos[0];
    }
  };
</script>
