<template>
  <button @click="onHoldPlaylist">
    <svg-icon v-if="isPlayed" type="mdi" :path="iconPlay"></svg-icon>
    <svg-icon v-else type="mdi" :path="iconOnHold"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlaylistPlus, mdiPlaylistPlay } from "@mdi/js";
export default {
  name: "OnHold",
  components: {
    SvgIcon,
  },
  props: {
    isPlayed: Boolean,
  },
  data() {
    return {
      iconOnHold: mdiPlaylistPlus,
      iconPlay: mdiPlaylistPlay,
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
  width: 20px;
  height: 20px;
}
</style>