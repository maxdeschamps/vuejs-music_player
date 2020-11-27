<template>
  <v-item-group class="artist">
    <v-card class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        :src="
          require('@/' + artists[findArtist(this.$route.params.artist)].image)
        "
      ></v-img>

      <v-card-actions class="d-flex justify-space-between align-center py-2">
        <div class="d-flex">
          <div class="d-flex flex-column text-left">
            <v-card-title class="py-0">{{
              artists[findArtist(this.$route.params.artist)].name
            }}</v-card-title>
          </div>
        </div>
      </v-card-actions>

      <hr />

      <v-card-text>
        {{ artists[findArtist(this.$route.params.artist)].description }}
      </v-card-text>

      <hr />

      <List
        @playMusic="playMusic"
        @handleLike="handleLike"
        @onHoldPlaylist="onHoldPlaylist"
        :musics="findMusicsByArtist()"
        :artists="artists"
        :music="music"
      />
    </v-card>

    <v-btn to="/" class="lighten-2 mb-5">Return to playlist</v-btn>
  </v-item-group>
</template>

<script>
import List from "@/components/player/List";

export default {
  name: "Artist",
  components: {
    List,
  },
  props: {
    musics: Array,
    artists: Array,
    music: Object,
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
    findArtist(artistName) {
      return this.artists.findIndex(
        (artist) => artist.name.toLowerCase() === artistName.toLowerCase()
      );
    },
    findMusicsByArtist() {
      return this.musics.filter(
        (music) =>
          music.artist ==
          this.artists[this.findArtist(this.$route.params.artist)].id
      );
    },
  },
};
</script>