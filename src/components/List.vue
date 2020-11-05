<template>
  <div>
    <h4 class="pl-3 mt-3">My playlist</h4>
    <ul>
      <li
        class="d-flex justify-space-between align-center"
        v-for="(track, index) in playlist"
        :key="index"
      >
        <button
          @click="playMusic(track)"
          :class="track == music ? 'active' : ''"
        >
          {{ track.title }} - <em>{{ track.artist }}</em>
        </button>
        <!-- <v-btn :to="'/portfolio/' + track.artist">Show</v-btn> -->
        <!-- <v-btn @click="toPortfolio">Show 2</v-btn> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    playlist: Array,
    music: Object,
  },
  methods: {
    playMusic(track) {
      this.$emit("playMusic", track);
    },
    // toPortfolio() {
    //   this.$router.push("/portfolio/Dido");
    // },
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