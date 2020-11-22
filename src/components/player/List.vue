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
        <img
          class="thumbnail-image mr-1"
          :src="require('@/' + track.thumbnail)"
        />

        {{ track.title }}&nbsp;-
        <em>{{ artists[findArtist(track.artist)].name }}</em>
      </button>

      <div class="d-flex">
        <Like
          class="mr-1"
          @handleLike="handleLike(track.id)"
          :like="track.liked"
        />
        <OnHold class="mr-1" @onHoldPlaylist="onHoldPlaylist(track.id)" />
        <Details
          @handleLike="handleLike"
          :music="track"
          :artist="artists[findArtist(track.artist)]"
        />
      </div>
    </v-item-group>
  </v-list>
</template>

<script>
import Like from "../control/Like";
import OnHold from "../control/OnHold";
import Details from "../Details";

export default {
  name: "List",
  props: {
    musics: Array,
    artists: Array,
    music: Object,
  },
  components: {
    Like,
    OnHold,
    Details,
  },
  methods: {
    playMusic(trackId) {
      this.$emit("playMusic", trackId);
    },
    handleLike(trackId) {
      this.$emit("handleLike", trackId);
    },
    onHoldPlaylist(trackId) {
      this.$emit("onHoldPlaylist", trackId);
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
