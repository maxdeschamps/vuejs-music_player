<template>
  <div class="d-flex justify-center align-center py-2">
    <Sound class="mr-4" @handleSound="handleSound" :muted="sound.muted" />
    <div @click="changeSound" class="soundBar">
      <span class="soundCurrent" :style="{ width: soundBar + '%' }"></span>
    </div>
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
  data() {
    return {};
  },
  methods: {
    handleSound() {
      this.$emit("handleSound");
    },
    changeSound(event) {
      const parentPosition = this.getPosition(event.target);
      const position = event.clientX - parentPosition.x;
      const widthBar =
        event.target.tagName == "SPAN"
          ? event.target.parentElement.scrollWidth
          : event.target.scrollWidth;

      if (!widthBar || widthBar == 0) {
        return;
      }
      const sound =
        position >= widthBar ? 1 : position <= 0 ? 0 : position / widthBar;

      this.$emit("changeSound", sound);
    },
    getPosition(el) {
      var xPos = 0;

      while (el) {
        xPos +=
          el.tagName == "BODY"
            ? el.offsetLeft + el.clientLeft
            : el.offsetLeft - el.scrollLeft + el.clientLeft;
        el = el.offsetParent;
      }
      return { x: xPos };
    },
  },
  computed: {
    soundBar() {
      return this.sound.volume * 100;
    },
  },
};
</script>

<style scoped>
.soundBar {
  position: relative;
  width: 60%;
  height: 6px;
  background-color: white;
  overflow: hidden;
}

.soundCurrent {
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  width: 0;
  height: 100%;
}
</style>