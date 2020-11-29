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
      const musicPosition =
        (this.$store.state.duration.totalDuration * event) / 100;
      this.$store.state.audio.currentTime = musicPosition;
    },
    formatedNumber(n) {
      return n > 9 ? "" + n : "0" + n;
    },
    formatedDuration(duration) {
      return duration
        ? this.formatedNumber(Math.floor(duration / 60)) +
            ":" +
            this.formatedNumber(Math.floor(duration % 60))
        : "00:00";
    },
  },
  computed: {
    progressBar: {
      get: function () {
        return (
          (this.$store.state.duration.currentDuration /
            this.$store.state.duration.totalDuration) *
          100
        );
      },
      set: function () {
        return 0;
      },
    },
    formatedCurrentDuration() {
      return this.formatedDuration(this.$store.state.duration.currentDuration);
    },
    formatedTotalDuration() {
      return this.formatedDuration(this.$store.state.duration.totalDuration);
    },
    formatedRestDuration() {
      const restTime =
        this.$store.state.duration.totalDuration -
        this.$store.state.duration.currentDuration;

      return this.formatedDuration(restTime);
    },
  },
};
</script>

<style scoped>
span.time {
  font-size: 0.8rem;
}

.timeContainer {
  width: 100%;
}

.timeSlider {
  margin: 0;
  padding: 0;
}
</style>