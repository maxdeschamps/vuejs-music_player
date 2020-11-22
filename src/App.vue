<template>
  <v-app>
    <div id="nav">
      <Spotify
        @changeMusic="changeMusic"
        @handleMusic="handleMusic"
        @changeTime="changeTime"
        @handleSound="handleSound"
        @changeSound="changeSound"
        @deleteMusic="deleteMusic"
        :music="music"
        :play="play"
        :duration="duration"
        :sound="sound"
      />
    </div>
    <div id="core">
      <v-img
        class="bodyImage"
        :src="require('@/' + musics[music].thumbnail)"
      ></v-img>
      <router-view :music="musics[music]" @playMusic="playMusic" />
    </div>
  </v-app>
</template>

<script>
import Spotify from "@/components/Spotify.vue";
import data from "../public/data.json";

export default {
  name: "App",
  components: {
    Spotify,
  },
  created() {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(data));
    }
    this.musics = JSON.parse(localStorage.getItem("data")).musics;
    this.artists = JSON.parse(localStorage.getItem("data")).artists;
  },
  data() {
    return {
      music: 0,
      audio: "",
      play: false,
      duration: {
        currentDuration: 0,
        totalDuration: 0,
      },
      sound: {
        muted: false,
        volume: 1,
      },
      playlist: [0],
    };
  },
  methods: {
    changeMusic(next = true) {
      this.deleteMusic();

      const newPosition = next
        ? this.music + 1 == this.musics.length
          ? 0
          : this.music + 1
        : this.music == 0
        ? this.musics.length - 1
        : this.music - 1;
      this.music = newPosition;

      this.createMusic();
    },
    playMusic(trackId) {
      this.play = true;
      
      const newPosition = this.findMusic(trackId);

      if (this.music != newPosition) {
        this.deleteMusic();

        this.music = newPosition;

        this.createMusic();
      }
    },
    handleMusic() {
      this.play = !this.play;
      this.play ? this.audio.play() : this.audio.pause();
    },
    changeTime(time) {
      this.audio.currentTime = time;
    },
    handleSound() {
      this.sound.muted = !this.sound.muted;
      this.audio.muted = this.sound.muted;
    },
    changeSound(volume) {
      this.sound.volume = volume;
      this.audio.volume = this.sound.volume;
    },
    progressMusic() {
      this.duration.currentDuration = Math.round(this.audio.currentTime);
      this.currentDuration = Math.round(this.audio.currentTime);
    },
    deleteMusic() {
      this.audio.pause();

      this.duration.currentDuration = 0;

      this.audio.removeEventListener("ended", this.changeMusic);
      this.audio.removeEventListener("timeupdate", this.progressMusic);

      this.audio.remove();
    },
    createMusic() {
      this.audio = new Audio(require("@/" + this.musics[this.music].url));
      if (this.play) {
        this.audio.play();
      }
      this.audio.muted = this.sound.muted;
      this.audio.volume = this.sound.volume;

      const localThis = this;
      this.audio.addEventListener("loadedmetadata", function () {
        localThis.duration.totalDuration = Math.round(localThis.audio.duration);
      });
      this.audio.addEventListener("ended", this.changeMusic);
      this.audio.addEventListener("timeupdate", this.progressMusic);
    },
    findMusic(musicId) {
      return this.musics.findIndex((music) => music.id === musicId);
    },
  },
  mounted() {
    this.createMusic();
  },
  watch: {
    music() {
      // this.$emit("backgroundImage", "@/" + this.musics[this.music].thumbnail);
    },
    audio() {
      this.duration.totalDuration = this.audio.duration;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  color: white;
  background-color: black;
  z-index: 5;
  font-size: 0.9rem;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: yellowgreen;
    }
  }
}

.bodyImage {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: blur(4px) brightness(0.75);
}
</style>

