<template>
  <button @click="handleRecord()">
    <svg-icon v-if="recording" type="mdi" :path="iconStop"></svg-icon>
    <svg-icon v-else type="mdi" :path="iconPlay"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlayCircleOutline } from "@mdi/js";
import { mdiStopCircleOutline } from "@mdi/js";
export default {
  name: "Play",
  components: {
    SvgIcon,
  },
  props: {
    recording: Boolean,
  },
  data() {
    return {
      iconPlay: mdiPlayCircleOutline,
      iconStop: mdiStopCircleOutline,
    };
  },
  methods: {
    handleRecord() {
      this.$emit("handleRecord");
    },
  },
};
</script>

<style scoped>
svg {
  width: 40px;
  height: 40px;
  color: white;
}
button {
  font-size: 0;
  width: 40px;
  height: 40px;
}
</style>