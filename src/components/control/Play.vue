<template>
  <button @click="handleMusic">
    <svg-icon v-if="play" type="mdi" :path="iconPause"></svg-icon>
    <svg-icon v-else type="mdi" :path="iconPlay"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlayCircleOutline } from "@mdi/js";
import { mdiPauseCircleOutline } from "@mdi/js";
export default {
  name: "Play",
  components: {
    SvgIcon,
  },
  props: {
    play: Boolean,
  },
  data() {
    return {
      iconPlay: mdiPlayCircleOutline,
      iconPause: mdiPauseCircleOutline,
    };
  },
  methods: {
    handleMusic() {
      this.$emit("handleMusic");
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