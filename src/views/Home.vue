<template>
  <v-card class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="require('@/' + music.thumbnail)"></v-img>

    <v-card-actions class="d-flex justify-space-between align-center py-2">
      <div class="d-flex">
        <div class="d-flex flex-column text-left">
          <v-card-title class="py-0"> My playlist</v-card-title>
        </div>
      </div>
    </v-card-actions>

    <hr />

    <List :musics="musics" :music="music" @playMusic="playMusic" />
  </v-card>
</template>

<script>
import List from "@/components/player/List.vue";

export default {
  name: "Home",
  components: {
    List,
  },
  props: {
    music: Object,
  },
  created() {
    this.musics = JSON.parse(localStorage.getItem("data")).musics;
  },
  methods: {
    playMusic(trackId) {
      this.$emit("playMusic", trackId);
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