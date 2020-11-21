<template>
  <div class="timeContainer">
    <v-slider
      class="timeSlider"
      @change="onChange($event)"
      v-model="progressBar"
      min="0"
      max="100"
      step="0.1"
      color="#9ACD32"
      track-color="#fff"
      thumb-color="#9ACD32"
      hide-details
    ></v-slider>
    <div class="d-flex justify-space-between align-center mx-4">
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
    onChange(event) {
      const musicPosition = (this.duration.totalDuration * event) / 100;
      this.$emit("changeTime", musicPosition);
    },
    formatedNumber(n) {
      return n > 9 ? "" + n : "0" + n;
    },
  },
  computed: {
    progressBar: {
      get: function () {
        return (
          (this.duration.currentDuration / this.duration.totalDuration) * 100
        );
      },
      set: function () {
        return 0;
      },
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
span.time {
  font-size: 0.8rem;
}

.timeContainer {
  margin-left: -8px;
  width: calc(100% + 16px);
}

.timeSlider {
  margin: 0;
  padding: 0;
  margin-top: -15px;
}
</style>