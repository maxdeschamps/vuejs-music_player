<template>
  <button @click="handleLike">
    <svg-icon v-if="like" type="mdi" :path="iconLike"></svg-icon>
    <svg-icon v-else type="mdi" :path="iconNotLike"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHeartPulse } from "@mdi/js";
import { mdiHeartOutline } from "@mdi/js";
export default {
  name: "Like",
  components: {
    SvgIcon,
  },
  props: {
    like: Boolean,
  },
  data() {
    return {
      iconLike: mdiHeartPulse,
      iconNotLike: mdiHeartOutline,
    };
  },
  methods: {
    handleLike() {
      this.$emit("handleLike");
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