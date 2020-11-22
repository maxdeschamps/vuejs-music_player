<template>
  <svg-icon type="mdi" :path="iconInfo"></svg-icon>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiInformationOutline } from "@mdi/js";
export default {
  name: "Infos",
  components: {
    SvgIcon,
  },
  data() {
    return {
      iconInfo: mdiInformationOutline,
    };
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