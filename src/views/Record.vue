<template>
  <v-item-group class="artist">
    <v-card class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-actions class="d-flex justify-space-between align-center py-2">
        <div class="d-flex">
          <div class="d-flex flex-column text-left">
            <v-card-title class="py-0">Record your music</v-card-title>
          </div>
        </div>
      </v-card-actions>

      <hr />

      <v-card-text>
        <Record @handleRecord="handleRecord" :recording="recording" />
        <br />
      </v-card-text>
    </v-card>

    <v-btn :to="'/'" class="lighten-2 mb-5">Return to playlist</v-btn>
  </v-item-group>
</template>

<script>
import WebAudioRecorder from "web-audio-recorder-js";
import Record from "@/components/control/Record";

export default {
  name: "Artist",
  components: {
    Record,
  },
  props: {
    musics: Array,
    artists: Array,
    // recording: Boolean,
    play: Boolean,
  },
  data() {
    return {
      recording: false,
      recorder: "",
    };
  },
  methods: {
    handleRecord() {
      if (this.play) {
        this.$emit("handleMusic");
      }
      this.recording = !this.recording;
      const constraints = { audio: true, video: false };

      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        const audioContext = new AudioContext();
        const input = audioContext.createMediaStreamSource(stream);

        console.log(input);

        this.recorder = new WebAudioRecorder(input, {
          workerDir: "./records/",
          encoding: "mp3",
          // numChannels: 2,
          // onEncoderLoading: function (recorder, encoding) {
          //   console.log("Loading " + encoding + " encoder...");
          // },
          // onEncoderLoaded: function (recorder, encoding) {
          //   console.log(encoding + " encoder loaded");
          // },
        });

        this.recorder.onComplete = function (recorder, blob) {
          console.log("Encoding complete");
        };

        this.recorder.setOptions({
          timeLimit: 120,
          encodeAfterRecord: true,
          ogg: { quality: 0.5 },
          mp3: { bitRate: 320 },
        });
      });

      //start the recording process
      // this.recorder.startRecording();
      // console.log("Recording started");
    },
  },
};
</script>