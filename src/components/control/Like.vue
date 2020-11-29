<template>
  <button @click="handleLike(music.id)">
    <svg-icon v-if="music.liked" type="mdi" :path="iconLike"></svg-icon>
    <svg-icon v-else type="mdi" :path="iconNotLike"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHeartPulse, mdiHeartOutline } from "@mdi/js";
import data from "@/../public/data.json";

export default {
  name: "Like",
  components: {
    SvgIcon,
  },
  props: {
    music: Object,
  },
  data() {
    return {
      iconLike: mdiHeartPulse,
      iconNotLike: mdiHeartOutline,
    };
  },
  methods: {
    handleLike(musicId) {
      const position = this.findMusic(musicId);
      this.$store.state.musics[position].liked = !this.$store.state.musics[
        position
      ].liked;

      data.musics = this.$store.state.musics;
      localStorage.setItem("data", JSON.stringify(data));
    },
    findMusic(musicId) {
      return this.$store.state.musics.findIndex(
        (music) => music.id === musicId
      );
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