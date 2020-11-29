<template>
  <button @click="changeMusic">
    <svg-icon type="mdi" :path="icon"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiSkipNextCircleOutline } from "@mdi/js";

export default {
  name: "Next",
  components: {
    SvgIcon,
  },
  data() {
    return {
      icon: mdiSkipNextCircleOutline,
    };
  },
  methods: {
    changeMusic() {
      this.$emit("changeMusic", true);
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