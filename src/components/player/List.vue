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
        <em>{{ $store.state.artists[findArtist(track.artist)].name }}</em>
      </button>

      <div class="d-flex">
        <Like class="mr-1" :music="track" />
        <OnHold class="mr-1" :music="track" />
        <Details :music="track" />
      </div>
    </v-item-group>
  </v-list>
</template>

<script>
import Like from "../control/Like";
import OnHold from "../control/OnHold";
import Details from "../modal/Details";

export default {
  name: "List",
  props: {
    musics: Array,
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
    findArtist(artistId) {
      return this.$store.state.artists.findIndex(
        (artist) => artist.id === artistId
      );
    },
  },
  computed: {
    music() {
      return this.$store.state.musics[this.$store.state.music];
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
