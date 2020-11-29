<template>
  <button @click="onHoldPlaylist(music.id)">
    <svg-icon
      v-if="music.id == $store.state.music.id"
      type="mdi"
      :path="iconPlay"
    ></svg-icon>
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
    music: Object,
  },
  data() {
    return {
      iconOnHold: mdiPlaylistPlus,
      iconPlay: mdiPlaylistPlay,
    };
  },
  methods: {
    onHoldPlaylist(trackId) {
      if (this.$store.state.playlist[0] != trackId) {
        this.changePlaylist(trackId);
      }
    },
    changePlaylist(trackId) {
      const musicIndex = this.$store.state.playlist.findIndex(
        (music) => music == trackId
      );
      this.$store.state.playlist.splice(musicIndex, 1);

      const currentMusic = this.$store.state.playlist.splice(0, 1);
      currentMusic.push(trackId);

      this.$store.state.playlist.unshift(currentMusic[0], currentMusic[1]);
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