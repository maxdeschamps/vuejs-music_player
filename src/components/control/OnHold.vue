<template>
  <button @click="onHoldPlaylist">
    <svg-icon type="mdi" :path="iconOnHold"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlaylistPlay } from "@mdi/js";
export default {
  name: "OnHold",
  components: {
    SvgIcon,
  },
  data() {
    return {
      iconOnHold: mdiPlaylistPlay,
    };
  },
  methods: {
    onHoldPlaylist() {
      this.$emit("onHoldPlaylist");
    },
  },
};
</script>

<style scoped>
svg {
  width: 20px;
  height: 20px;
}
button {
  font-size: 0;
}
</style>