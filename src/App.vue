<template>
  <v-app>
    <div id="nav">
      <MusicBar @changeMusic="changeMusic" :audio="audio" />
    </div>
    <div id="core">
      <v-img class="bodyImage" :src="require('@/' + music.thumbnail)"></v-img>
      <router-view @playMusic="playMusic" />
    </div>
  </v-app>
</template>

<script>
import MusicBar from "@/components/MusicBar";
import data from "@/../public/data.json";
import Shake from "shake.js";

export default {
  name: "App",
  components: {
    MusicBar,
  },
  created() {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(data));
      this.$router.go();
    }
    this.$store.state.playlist = JSON.parse(
      localStorage.getItem("data")
    ).musics.map((music) => {
      return music.id;
    });
    this.$store.state.musics = JSON.parse(localStorage.getItem("data")).musics;
    this.$store.state.artists = JSON.parse(
      localStorage.getItem("data")
    ).artists;
  },
  methods: {
    playMusic(trackId) {
      this.$store.state.play = true;

      if (this.$store.state.playlist[0] != trackId) {
        this.deleteMusic();

        this.moveMusic(trackId);
        this.$store.state.music = this.findMusic(this.$store.state.playlist[0]);

        this.createMusic();
      }
    },
    createMusic() {
      this.$store.state.audio = new Audio(
        require("@/" + this.$store.state.musics[this.$store.state.music].url)
      );

      if (this.$store.state.play) {
        this.$store.state.audio.play();
      }
      this.$store.state.audio.muted = this.$store.state.sound.muted;
      this.$store.state.audio.volume = this.$store.state.sound.volume;

      const localThis = this;
      this.$store.state.audio.addEventListener("loadedmetadata", function () {
        localThis.$store.state.duration.totalDuration = Math.round(
          localThis.$store.state.audio.duration
        );
      });
      this.$store.state.audio.addEventListener("ended", this.changeMusic);
      this.$store.state.audio.addEventListener(
        "timeupdate",
        this.progressMusic
      );
    },
    deleteMusic() {
      this.$store.state.audio.pause();

      this.$store.state.duration.currentDuration = 0;

      this.$store.state.audio.removeEventListener("ended", this.changeMusic);
      this.$store.state.audio.removeEventListener(
        "timeupdate",
        this.progressMusic
      );

      this.$store.state.audio.remove();
    },
    progressMusic() {
      this.$store.state.duration.currentDuration = Math.round(
        this.$store.state.audio.currentTime
      );
      this.$store.state.currentDuration = Math.round(
        this.$store.state.audio.currentTime
      );
    },
    changeMusic(next = true) {
      this.deleteMusic();

      const currentMusic = next
        ? this.$store.state.playlist.splice(0, 1)
        : this.$store.state.playlist.splice(
            this.$store.state.playlist.length - 1,
            1
          );

      next
        ? this.$store.state.playlist.push(currentMusic[0])
        : this.$store.state.playlist.unshift(currentMusic[0]);

      this.$store.state.music = this.findMusic(this.$store.state.playlist[0]);

      this.createMusic();
    },
    moveMusic(trackId) {
      const musicIndex = this.$store.state.playlist.findIndex(
        (music) => music == trackId
      );
      const currentMusics = this.$store.state.playlist.splice(
        musicIndex,
        this.$store.state.playlist.length - musicIndex
      );

      this.$store.state.playlist = currentMusics.concat(
        this.$store.state.playlist
      );
    },
    findMusic(musicId) {
      return this.$store.state.musics.findIndex(
        (music) => music.id === musicId
      );
    },
  },
  mounted() {
    this.createMusic();

    this.$store.state.shake = new Shake();
    var myShakeEvent = new Shake({
      threshold: 10,
      timeout: 5000,
    });
    myShakeEvent.start();

    window.addEventListener("shake", this.changeMusic);
  },
  computed: {
    music() {
      return this.$store.state.musics[this.$store.state.music];
    },
  },
  watch: {
    music() {
      navigator.vibrate([100]);
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

