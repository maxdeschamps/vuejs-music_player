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

    <ProgressBar @changeTime="changeTime" :duration="duration" />

    <v-card-actions class="d-flex justify-space-between align-center py-2">
      <div class="d-flex">
        <Play @handleMusic="handleMusic" :play="play" />

        <div class="d-flex flex-column text-left">
          <v-card-title class="py-0">{{ music.title }}</v-card-title>

          <v-card-text class="py-0">
            <em>{{ music.artist }}</em>
          </v-card-text>
        </div>
      </div>

      <div class="d-flex">
        <Previous @changeMusic="changeMusic" />
        <Next @changeMusic="changeMusic" />
      </div>
    </v-card-actions>

    <SoundController
      @handleSound="handleSound"
      @changeSound="changeSound"
      :sound="sound"
    />

    <hr />

    <List @playMusic="playMusic" :playlist="playlist" :music="music" />
  </v-card>
</template>

<script>
import List from "./List";
import ProgressBar from "./ProgressBar";
import SoundController from "./SoundController";
import Play from "./svg/Play";
import Previous from "./svg/Previous";
import Next from "./svg/Next";
export default {
  name: "Player",
  props: {
    music: Object,
    play: Boolean,
    playlist: Array,
    duration: Object,
    sound: Object,
  },
  components: {
    List,
    ProgressBar,
    SoundController,
    Play,
    Previous,
    Next,
  },
  methods: {
    changeMusic(next = true) {
      this.$emit("changeMusic", next);
    },
    playMusic(track) {
      this.$emit("playMusic", track);
    },
    handleMusic() {
      this.$emit("handleMusic");
    },
    changeTime(time) {
      this.$emit("changeTime", time);
    },
    handleSound() {
      this.$emit("handleSound");
    },
    changeSound(volume) {
      this.$emit("changeSound", volume);
    },
  },
};
</script>

<style scoped>
em {
  font-size: 0.8rem;
}
</style>