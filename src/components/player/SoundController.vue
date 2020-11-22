<template>
  <div class="d-flex justify-center align-center py-2 soundContainer mx-5">
    <Sound class="mr-4" @handleSound="handleSound" :muted="sound.muted" />
    <knob-control
      @change="onChange($event)"
      v-model="soundVolume"
      :min="0"
      :max="1"
      :stepSize="0.01"
      :size="50"
      :valueDisplayFunction="
        (v) => {
          return v * 100;
        }
      "
      primary-color="#9ACD32"
      secondary-color="#fff"
      text-color="#9ACD32"
    ></knob-control>
  </div>
</template>

<script>
import Vue from "vue";
import KnobControl from "vue-knob-control";
import Sound from "../control/Sound";

Vue.use(KnobControl);

export default {
  name: "SoundController",
  props: {
    sound: Object,
  },
  components: {
    Sound,
    KnobControl,
  },
  data() {
    return {
      soundVolume: "100",
    };
  },
  created() {
    this.soundVolume = this.sound.volume;
  },
  methods: {
    handleSound() {
      this.$emit("handleSound");
    },
  },
  watch: {
    soundVolume(value) {
      this.$emit("changeSound", value);
    },
  },
};
</script>
