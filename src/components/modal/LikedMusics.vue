<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="lighten-2 mb-5" dark v-bind="attrs" v-on="on">
        Liked musics
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline lighten-2">Liked musics</v-card-title>

      <hr />

      <v-card-text>
        <List
          @playMusic="playMusic"
          @handleLike="handleLike"
          @onHoldPlaylist="onHoldPlaylist"
          :musics="findLikedMusics()"
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
  name: "LikedMusics",
  components: {
    List,
  },
  props: {
    musics: Array,
    artists: Array,
    music: Object,
  },
  data() {
    return {
      dialog: false,
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
    findLikedMusics() {
      return this.musics.filter((music) => music.liked);
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