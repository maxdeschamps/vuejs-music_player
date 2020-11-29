<template>
  <button @click="handleSound">
    <svg-icon
      v-if="$store.state.sound.muted"
      type="mdi"
      :path="iconSound"
    ></svg-icon>
    <svg-icon v-else type="mdi" :path="iconMute"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMusicCircleOutline, mdiMusicCircle } from "@mdi/js";

export default {
  name: "Sound",
  components: {
    SvgIcon,
  },
  props: {
    audio: [String, HTMLAudioElement],
  },
  data() {
    return {
      iconSound: mdiMusicCircle,
      iconMute: mdiMusicCircleOutline,
    };
  },
  methods: {
    handleSound() {
      this.$store.state.sound.muted = !this.$store.state.sound.muted;
      this.audio.muted = this.$store.state.sound.muted;
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