<template>
  <div class="d-flex justify-center align-center py-2 soundContainer mx-5">
    <Sound class="mr-4" @handleSound="handleSound" :muted="sound.muted" />
    <v-slider
      class="soundSlider"
      @change="onChange($event)"
      v-model="sound.volume"
      min="0"
      max="1"
      step="0.01"
      color="#9ACD32"
      track-color="#fff"
      thumb-color="#9ACD32"
    ></v-slider>
  </div>
</template>

<script>
import Sound from "./svg/Sound";
export default {
  name: "SoundController",
  props: {
    sound: Object,
  },
  components: {
    Sound,
  },
  methods: {
    handleSound() {
      this.$emit("handleSound");
    },
    onChange() {
      this.$emit("changeSound", this.sound.volume);
    },
  },
};
</script>

<style scoped>
.soundSlider {
  height: 35px;
}
</style>