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

        <List @playMusic="playMusic" :musics="results" />
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
    this.results = this.searchMusic(this.search.toLowerCase());
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
    findArtist(artistId) {
      return this.$store.state.artists.findIndex(
        (artist) => artist.id === artistId
      );
    },
    searchMusic(value) {
      const musicsOrdered = this.$store.state.musics.slice();
      return musicsOrdered.filter(
        (music) =>
          music.title.toLowerCase().includes(value) ||
          music.description.toLowerCase().includes(value) ||
          this.$store.state.artists[this.findArtist(music.artist)].name
            .toLowerCase()
            .includes(value)
      );
    },
  },
  watch: {
    search(value) {
      this.results = this.searchMusic(value.toLowerCase());
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