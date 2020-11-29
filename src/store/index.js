import Vue from 'vue'
import Vuex from 'vuex'
import data from "@/../public/data.json";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music: 0,
    // audio: "",
    shake: "",
    play: false,
    duration: {
      currentDuration: 0,
      totalDuration: 0,
    },
    sound: {
      muted: false,
      volume: 1,
    },
    playlist: [],
    musics: [],
    artists: [],
  },
  actions: {
    // changeMusic(context, { next }) {
    //   context.dispatch("deleteMusic");

    //   const currentMusic = next
    //     ? context.state.playlist.splice(0, 1)
    //     : context.state.playlist.splice(context.state.playlist.length - 1, 1);

    //   next
    //     ? context.state.playlist.push(currentMusic[0])
    //     : context.state.playlist.unshift(currentMusic[0]);

    //   context.state.music = context.dispatch("findMusic", { musicId: context.state.playlist[0] });

    //   context.dispatch("createMusic");
    // },
    // moveMusic(context, { trackId }) {
    //   const musicIndex = context.state.playlist.findIndex((music) => music == trackId);
    //   const currentMusics = context.state.playlist.splice(
    //     musicIndex,
    //     context.state.playlist.length - musicIndex
    //   );

    //   context.state.playlist = currentMusics.concat(context.state.playlist);
    // },
    // changePlaylist(context, { trackId }) {
    //   const musicIndex = context.state.playlist.findIndex((music) => music == trackId);
    //   context.state.playlist.splice(musicIndex, 1);

    //   const currentMusic = context.state.playlist.splice(0, 1);
    //   currentMusic.push(trackId);

    //   context.state.playlist.unshift(currentMusic[0], currentMusic[1]);
    // },
    // playMusic(context, { trackId }) {
    //   context.state.play = true;

    //   if (context.state.playlist[0] != trackId) {
    //     context.dispatch("deleteMusic");

    //     context.dispatch("moveMusic", { trackId: trackId });
    //     context.state.music = context.dispatch("findMusic", { musicId: context.state.playlist[0] });

    //     context.dispatch("createMusic");
    //   }
    // },
    // handleMusic(context) {
    //   context.state.play = !context.state.play;
    //   context.state.play ? context.state.audio.play() : context.state.audio.pause();
    // },
    // changeTime(context, { time }) {
    //   context.state.audio.currentTime = time;
    // },
    // handleSound(context) {
    //   context.state.sound.muted = !context.state.sound.muted;
    //   context.state.audio.muted = context.state.sound.muted;
    // },
    // changeSound(context, { volume }) {
    //   context.state.sound.volume = volume;
    //   context.state.audio.volume = context.state.sound.volume;
    // },
    // progressMusic(context) {
    //   context.state.duration.currentDuration = Math.round(context.state.audio.currentTime);
    //   context.state.currentDuration = Math.round(context.state.audio.currentTime);
    // },
    // deleteMusic(context) {
    //   context.state.audio.pause();

    //   context.state.duration.currentDuration = 0;

    //   context.state.audio.removeEventListener("ended", context.dispatch("changeMusic", { next: true }));
    //   context.state.audio.removeEventListener("timeupdate", context.dispatch("progressMusic"));

    //   context.state.audio.remove();
    // },
    // createMusic(context) {
    //   context.state.audio = new Audio(require("@/" + context.state.musics[context.state.music].url));

    //   if (context.state.play) {
    //     context.state.audio.play();
    //   }
    //   context.state.audio.muted = context.state.sound.muted;
    //   context.state.audio.volume = context.state.sound.volume;

    //   const localThis = context.state;
    //   context.state.audio.addEventListener("loadedmetadata", function () {
    //     localThis.duration.totalDuration = Math.round(localThis.audio.duration);
    //   });
    //   context.state.audio.addEventListener("ended", context.dispatch("changeMusic", { next: true }));
    //   context.state.audio.addEventListener("timeupdate", context.state.progressMusic);
    // },
    // handleLike(context, { trackId }) {
    //   const position = context.dispatch("findMusic", { musicId: trackId });
    //   context.state.musics[position].liked = !context.state.musics[position].liked;

    //   data.musics = context.state.musics;
    //   localStorage.setItem("data", JSON.stringify(data));
    // },
    // onHoldPlaylist(context, { trackId }) {
    //   if (context.state.playlist[0] != trackId) {
    //     context.dispatch("changePlaylist", { trackId: trackId });
    //   }
    // },
    // findMusic(context, { musicId }) {
    //   return context.state.musics.findIndex((music) => music.id === musicId);
    // },
  }
})
