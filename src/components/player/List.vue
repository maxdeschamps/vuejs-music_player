<template>
  <div>
    <h4 class="pl-3 mt-3">My playlist</h4>
    <v-list name="My playlist" class="ma-3">
      <v-item
        class="d-flex justify-space-between align-center"
        v-for="(track, index) in musics"
        :key="index"
      >
        <button
          @click="playMusic(track)"
          :class="track == music ? 'active' : ''"
        >
          {{ track.title }}&nbsp;-<em class="ml-1">{{
            artists[findArtist(track.artist)].name
          }}</em>
        </button>
      </v-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    musics: Array,
    artists: Array,
    music: Object,
  },
  methods: {
    playMusic(track) {
      this.$emit("playMusic", track);
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