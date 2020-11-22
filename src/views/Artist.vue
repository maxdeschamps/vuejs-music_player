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

      <List
        :musics="findMusicsByArtist()"
        :music="music"
        @playMusic="playMusic"
      />
    </v-card>

    <v-btn :to="'/'">Return to playlist</v-btn>
  </v-item-group>
</template>

<script>
import List from "@/components/player/List.vue";

export default {
  name: "Artist",
  components: {
    List,
  },
  props: {
    music: Object,
  },
  created() {
    this.musics = JSON.parse(localStorage.getItem("data")).musics;
    this.artists = JSON.parse(localStorage.getItem("data")).artists;
  },
  methods: {
    playMusic(trackId) {
      this.$emit("playMusic", trackId);
    },
    findArtist(artistName) {
      return this.artists.findIndex(
        (artist) => artist.name.toLowerCase() === artistName.toLowerCase()
      );
    },
    findMusicsByArtist() {
      return this.musics.filter((music) => {
        return (
          music.artist ==
          this.artists[this.findArtist(this.$route.params.artist)].id
        );
      });
    },
  },
};
</script>