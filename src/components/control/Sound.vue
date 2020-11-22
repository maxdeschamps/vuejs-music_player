<template>
  <button @click="handleSound">
    <svg-icon v-if="muted" type="mdi" :path="iconSound"></svg-icon>
    <svg-icon v-else type="mdi" :path="iconMute"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMusicCircleOutline } from "@mdi/js";
import { mdiMusicCircle } from "@mdi/js";
export default {
  name: "Sound",
  components: {
    SvgIcon,
  },
  props: {
    muted: Boolean,
  },
  data() {
    return {
      iconSound: mdiMusicCircle,
      iconMute: mdiMusicCircleOutline,
    };
  },
  methods: {
    handleSound() {
      this.$emit("handleSound");
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