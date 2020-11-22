<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="lighten-2 mb-5" dark v-bind="attrs" v-on="on">
        Search music
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline lighten-2">Search music</v-card-title>

      <hr />

      <v-card-text>
        <v-text-field
          class="mt-2"
          v-model="search"
          outlined
          label="Search musics"
          prepend-icon="mdi-magnify"
        ></v-text-field>

        <List
          @playMusic="playMusic"
          @handleLike="handleLike"
          @onHoldPlaylist="onHoldPlaylist"
          :musics="results"
          :artists="artists"
          :music="music"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import List from "../player/List";

export default {
  name: "Search",
  components: {
    List,
  },
  mounted() {
    this.results = this.searchMusic(this.search);
  },
  props: {
    musics: Array,
    artists: Array,
    music: Object,
  },
  data() {
    return {
      dialog: false,
      search: "",
      results: [],
    };
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
    searchMusic(value) {
      const musicsOrdered = this.musics.slice();
      return musicsOrdered.filter(
        (music) =>
          music.title.startsWith(value) ||
          music.description.includes(value) ||
          this.artists[this.findArtist(music.artist)].name.startsWith(value)
      );
    },
  },
  watch: {
    search(value) {
      this.results = this.searchMusic(value);
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