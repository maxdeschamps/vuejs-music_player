<template>
  <div>
    <v-img
      class="bodyImage"
      :src="require('@/assets/covers/' + playlist[music].thumbnail)"
    ></v-img>
    <v-main>
      <v-container>
        <Player
          @changeMusic="changeMusic"
          @playMusic="playMusic"
          @handleMusic="handleMusic"
          @changeTime="changeTime"
          @handleSound="handleSound"
          @changeSound="changeSound"
          :music="playlist[music]"
          :play="play"
          :playlist="playlist"
          :duration="duration"
          :sound="sound"
        />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Player from "./Player";
export default {
  name: "Spotify",
  components: {
    Player,
  },
  props: {
    playlist: Array,
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
    };
  },
  methods: {
    changeMusic(next = true) {
      this.deleteMusic();

      const newPosition = next
        ? this.music + 1 == this.playlist.length
          ? 0
          : this.music + 1
        : this.music == 0
        ? this.playlist.length - 1
        : this.music - 1;
      this.music = newPosition;

      this.createMusic();
    },
    playMusic(track) {
      this.play = true;

      const newPostion = this.playlist.indexOf(track);

      if (this.music != newPostion) {
        this.deleteMusic();

        this.music = newPostion;

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
      this.audio = new Audio(
        require("@/assets/musics/" + this.playlist[this.music].url)
      );
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
  },
  mounted() {
    this.createMusic();
  },
  watch: {
    music() {
      this.$emit("backgroundImage", this.playlist[this.music].thumbnail);
    },
    audio() {
      this.duration.totalDuration = this.audio.duration;
    },
  },
};
</script>

<style scoped>
.bodyImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: blur(4px) brightness(0.75);
}
</style>