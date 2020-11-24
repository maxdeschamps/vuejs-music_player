<template>
  <v-app>
    <div id="nav">
      <MusicBar
        @changeMusic="changeMusic"
        @handleMusic="handleMusic"
        @changeTime="changeTime"
        @handleSound="handleSound"
        @changeSound="changeSound"
        @deleteMusic="deleteMusic"
        @handleLike="handleLike"
        @onHoldPlaylist="onHoldPlaylist"
        :playlist="playlist"
        :musics="musics"
        :artists="artists"
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
      <router-view
        @playMusic="playMusic"
        @handleLike="handleLike"
        @onHoldPlaylist="onHoldPlaylist"
        :musics="musics"
        :artists="artists"
        :music="musics[music]"
        :playlist="playlist"
      />
    </div>
  </v-app>
</template>

<script>
import MusicBar from "@/components/MusicBar.vue";
import data from "../public/data.json";

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
      playlist: JSON.parse(localStorage.getItem("data")).musics.map((music) => {
        return music.id;
      }),
      musics: JSON.parse(localStorage.getItem("data")).musics,
      artists: JSON.parse(localStorage.getItem("data")).artists,
    };
  },
  methods: {
    changeMusic(next = true) {
      this.deleteMusic();

      const currentMusic = next
        ? this.playlist.splice(0, 1)
        : this.playlist.splice(this.playlist.length - 1, 1);

      next
        ? this.playlist.push(currentMusic[0])
        : this.playlist.unshift(currentMusic[0]);

      this.music = this.findMusic(this.playlist[0]);

      this.createMusic();
    },
    moveMusic(trackId) {
      const musicIndex = this.playlist.findIndex((music) => music == trackId);
      const currentMusics = this.playlist.splice(
        musicIndex,
        this.playlist.length - musicIndex
      );

      this.playlist = currentMusics.concat(this.playlist);
    },
    changePlaylist(trackId) {
      const musicIndex = this.playlist.findIndex((music) => music == trackId);
      this.playlist.splice(musicIndex, 1);

      const currentMusic = this.playlist.splice(0, 1);
      currentMusic.push(trackId);

      this.playlist.unshift(currentMusic[0], currentMusic[1]);
    },
    playMusic(trackId) {
      this.play = true;

      if (this.playlist[0] != trackId) {
        this.deleteMusic();

        this.moveMusic(trackId);
        this.music = this.findMusic(this.playlist[0]);

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
    handleLike(trackId) {
      const position = this.findMusic(trackId);
      this.musics[position].liked = !this.musics[position].liked;

      data.musics = this.musics;
      localStorage.setItem("data", JSON.stringify(data));
    },
    onHoldPlaylist(trackId) {
      if (this.playlist[0] != trackId) {
        this.changePlaylist(trackId);
      }
    },
    findMusic(musicId) {
      return this.musics.findIndex((music) => music.id === musicId);
    },
  },
  mounted() {
    this.createMusic();
  },
  watch: {
    audio() {
      this.duration.totalDuration = this.audio.duration;
    },
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

