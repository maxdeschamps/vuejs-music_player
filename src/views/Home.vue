<template>
  <v-item-group>
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
        :src="require('@/' + $store.state.musics[$store.state.music].thumbnail)"
      ></v-img>

      <v-card-actions class="d-flex justify-space-between align-center py-2">
        <div class="d-flex">
          <div class="d-flex flex-column text-left">
            <v-card-title class="py-0">My playlist</v-card-title>
          </div>
        </div>
      </v-card-actions>

      <hr />

      <List @playMusic="playMusic" :musics="musicsOrdered()" />
    </v-card>

    <LikedMusics @playMusic="playMusic" />
    &nbsp;
    <Search @playMusic="playMusic" :musics="musicsOrdered()" />
  </v-item-group>
</template>

<script>
import List from "@/components/player/List";
import LikedMusics from "@/components/modal/LikedMusics";
import Search from "@/components/modal/Search";

export default {
  name: "Home",
  components: {
    List,
    LikedMusics,
    Search,
  },
  methods: {
    playMusic(trackId) {
      this.$emit("playMusic", trackId);
    },
    musicsOrdered() {
      const musicsOrdered = this.$store.state.playlist.map(
        (musicId) =>
          this.$store.state.musics[
            this.$store.state.musics.findIndex((el) => el.id == musicId)
          ]
      );
      return musicsOrdered;
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