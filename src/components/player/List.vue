<template>
  <v-list name="My playlist" class="ma-3">
    <v-item
      class="d-flex justify-space-between align-center"
      v-for="track in musics"
      :key="track.id"
    >
      <button
        @click="playMusic(track.id)"
        :class="track.id == music.id ? 'active' : ''"
      >
        {{ track.title }}&nbsp;-
        <em class="ml-1">{{ artists[findArtist(track.artist)].name }}</em>
      </button>
    </v-item>
  </v-list>
</template>

<script>
export default {
  name: "List",
  props: {
    musics: Array,
    music: Object,
  },
  created() {
    this.artists = JSON.parse(localStorage.getItem("data")).artists;
  },
  methods: {
    playMusic(trackId) {
      this.$emit("playMusic", trackId);
    },
    findArtist(artistId) {
      return this.artists.findIndex((artist) => artist.id === artistId);
    },
  },
};
</script>

<style scoped>
ul {
  margin: 4px;
  padding: 8px;
}
.active {
  color: yellowgreen;
}
</style>