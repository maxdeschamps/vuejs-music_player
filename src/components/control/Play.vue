<template>
  <button @click="handleMusic">
    <svg-icon v-if="$store.state.play" type="mdi" :path="iconPause"></svg-icon>
    <svg-icon v-else type="mdi" :path="iconPlay"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlayCircleOutline, mdiPauseCircleOutline } from "@mdi/js";

export default {
  name: "Play",
  components: {
    SvgIcon,
  },
  data() {
    return {
      iconPlay: mdiPlayCircleOutline,
      iconPause: mdiPauseCircleOutline,
    };
  },
  methods: {
    handleMusic() {
      this.$store.state.play = !this.$store.state.play;
      this.$store.state.play
        ? this.$store.state.audio.play()
        : this.$store.state.audio.pause();
    },
  },
};
</script>

<style scoped>
svg {
  width: 40px;
  height: 40px;
}
button {
  font-size: 0;
  width: 40px;
  height: 40px;
}
</style>