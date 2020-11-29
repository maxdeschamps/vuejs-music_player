import Vue from 'vue'
import Vuex from 'vuex'
import data from "@/../public/data.json";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music: 0,
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
})
