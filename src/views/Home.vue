<template>
  <div class="home">
    <Spotify />
  </div>
</template>

<script>
import Spotify from "@/components/Spotify.vue";
import data from "../../public/data.json";

export default {
  name: "Home",
  components: {
    Spotify,
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  },
};
</script>

<style scoped>
.home {
  position: relative;
}
</style>