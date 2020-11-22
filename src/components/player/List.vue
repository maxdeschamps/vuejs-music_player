<template>
  <v-list name="List" class="ma-3">
    <v-item-group
      class="d-flex justify-space-between align-center text-left"
      v-for="track in musics"
      :key="track.id"
    >
      <button
        @click="playMusic(track.id)"
        :class="track.id == music.id ? 'active' : ''"
      >
        <img class="thumbnail-image" :src="require('@/' + track.thumbnail)" />

        {{ track.title }}&nbsp;-
        <em class="ml-1">{{ artists[findArtist(track.artist)].name }}</em>
      </button>

      <Like :like="track.liked" @handleLike="handleLike(track.id)" />
    </v-item-group>
  </v-list>
</template>

<script>
import Like from "../control/Like";

export default {
  name: "List",
  props: {
    musics: Array,
    artists: Array,
    music: Object,
  },
  components: {
    Like,
  },
  methods: {
    playMusic(trackId) {
      this.$emit("playMusic", trackId);
    },
    handleLike(trackId) {
      this.$emit("handleLike", trackId);
    },
    findArtist(artistId) {
      return this.artists.findIndex((artist) => artist.id === artistId);
    },
    findMusic(musicId) {
      return this.musics.findIndex((music) => music.id === musicId);
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

.thumbnail-image {
  position: relative;
  top: 4px;
  width: 20px;
  height: 20px;
  object-fit: cover;
  object-position: center;
}
</style>
