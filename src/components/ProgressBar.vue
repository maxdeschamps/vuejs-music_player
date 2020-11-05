<template>
  <div>
    <div @click="changeTime" class="progressBar">
      <span
        class="progressCurrent"
        :style="{ width: progressBar + '%' }"
      ></span>
    </div>
    <div class="d-flex justify-space-between align-center ma-1">
      <span class="time">{{ formatedCurrentDuration }}</span>
      <span @click="handleRestTime" class="time">
        <span v-if="totalDuration">{{ formatedTotalDuration }}</span>
        <span v-else>{{ formatedRestDuration }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    duration: Object,
  },
  data() {
    return {
      totalDuration: false,
    };
  },
  methods: {
    handleRestTime() {
      this.totalDuration = !this.totalDuration;
    },
    changeTime(event) {
      const parentPosition = this.getPosition(event.target);
      const position = event.clientX - parentPosition.x;
      const widthBar =
        event.target.tagName == "SPAN"
          ? event.target.parentElement.scrollWidth
          : event.target.scrollWidth;

      if (!widthBar || widthBar == 0) {
        return;
      }
      const pourcentage = position / widthBar;

      const musicPosition = this.duration.totalDuration * pourcentage;

      this.$emit("changeTime", musicPosition);
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
    formatedNumber(n) {
      return n > 9 ? "" + n : "0" + n;
    },
  },
  computed: {
    progressBar() {
      if (this.duration.totalDuration) {
        return (
          (this.duration.currentDuration / this.duration.totalDuration) * 100
        );
      }
      return 0;
    },
    formatedCurrentDuration() {
      const formatedCurrentDuration = this.duration.currentDuration
        ? this.formatedNumber(Math.floor(this.duration.currentDuration / 60)) +
          ":" +
          this.formatedNumber(Math.floor(this.duration.currentDuration % 60))
        : "00:00";

      return formatedCurrentDuration;
    },
    formatedTotalDuration() {
      const formatedTotalDuration = this.duration.totalDuration
        ? this.formatedNumber(Math.floor(this.duration.totalDuration / 60)) +
          ":" +
          this.formatedNumber(Math.floor(this.duration.totalDuration % 60))
        : "00:00";

      return formatedTotalDuration;
    },
    formatedRestDuration() {
      const restTime =
        this.duration.totalDuration - this.duration.currentDuration;
      const formatedRestDuration = restTime
        ? this.formatedNumber(Math.floor(restTime / 60)) +
          ":" +
          this.formatedNumber(Math.floor(restTime % 60))
        : "00:00";

      return formatedRestDuration;
    },
  },
};
</script>

<style scoped>
.progressBar {
  position: relative;
  width: 100%;
  height: 6px;
  background-color: white;
  overflow: hidden;
}

.progressCurrent {
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  width: 0;
  height: 100%;
}

span.time {
  font-size: 0.8rem;
}
</style>