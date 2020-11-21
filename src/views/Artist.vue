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

      <v-img height="250" :src="require('@/' + artists[artist].image)"></v-img>

      <v-card-actions class="d-flex justify-space-between align-center py-2">
        <div class="d-flex">
          <div class="d-flex flex-column text-left">
            <v-card-title class="py-0">{{ artists[artist].name }}</v-card-title>
          </div>
        </div>
      </v-card-actions>

      <hr />

      <!-- <List @playMusic="playMusic" :playlist="playlist" :music="music" /> -->
    </v-card>

    <v-btn :to="'/'">Return to playlist</v-btn>
  </v-item-group>
</template>

<script>
export default {
  name: "Artist",
  created() {
    this.musics = JSON.parse(localStorage.getItem("data")).musics;
    this.artists = JSON.parse(localStorage.getItem("data")).artists;
    this.artist = this.findArtist(this.$route.params.artist);
  },
  methods: {
    findArtist(artistName) {
      return this.artists.findIndex(
        (artist) => artist.name.toLowerCase() === artistName.toLowerCase()
      );
    },
  },
};
</script>