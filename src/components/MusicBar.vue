<template>
  <v-main class="spotify">
    <div class="flex-bar">
      <div class="flex-music">
        <figure class="thumbnail-figure">
          <img class="thumbnail-image" :src="require('@/' + music.thumbnail)" />
          <figcaption>
            <Like :music="music" />
          </figcaption>
        </figure>

        <div class="d-flex flex-column text-left ml-4">
          <h3 class="py-0">
            {{ music.title }}
          </h3>

          <em class="py-0">
            <router-link :to="'/artist/' + artist.name.toLowerCase()">
              {{ artist.name }}
            </router-link>
          </em>
        </div>
      </div>

      <div class="flex-controller">
        <div class="flex-button">
          <Play :audio="audio" />
          <Previous @changeMusic="changeMusic" />
          <Next @changeMusic="changeMusic" />
        </div>

        <div class="flex-control-bar">
          <ProgressBar :audio="audio" class="progress-bar" />
          <SoundController :audio="audio" class="sound-bar" />
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import Play from "./control/Play";
import Previous from "./control/Previous";
import Next from "./control/Next";
import Like from "./control/Like";
import ProgressBar from "./player/ProgressBar";
import SoundController from "./player/SoundController";
import data from "@/../public/data.json";

export default {
  name: "MusicBar",
  components: {
    ProgressBar,
    SoundController,
    Play,
    Previous,
    Next,
    Like,
  },
  props: {
    audio: [String, HTMLAudioElement],
  },
  methods: {
    changeMusic(next) {
      this.$emit("changeMusic", next);
    },
    handleLike(musicId) {
      const position = this.findMusic(musicId);
      this.$store.state.musics[position].liked = !this.$store.state.musics[
        position
      ].liked;

      data.musics = this.$store.state.musics;
      localStorage.setItem("data", JSON.stringify(data));
    },
    findMusic(musicId) {
      return this.$store.state.musics.findIndex(
        (music) => music.id === musicId
      );
    },
    findArtist(artistId) {
      return this.$store.state.artists.findIndex(
        (artist) => artist.id === artistId
      );
    },
  },
  computed: {
    music() {
      return this.$store.state.musics[this.$store.state.music];
    },
    artist() {
      return this.$store.state.artists[this.findArtist(this.music.artist)];
    },
  },
};
</script>

<style scoped>
.flex-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.flex-music {
  width: 100%;
  max-width: 200px;
  display: flex;
}

.flex-music > .thumbnail-figure {
  position: relative;
  width: 50px;
  height: 50px;
}

.flex-music > .thumbnail-figure > .thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.flex-music > .thumbnail-figure > figcaption {
  position: absolute;
  top: -5px;
  right: -5px;
}

.flex-controller {
  width: calc(100% - 150px);
  display: flex;
}

.flex-controller > .flex-button {
  display: flex;
}

.flex-control-bar {
  display: flex;
  width: 100%;
  margin-left: 10px;
}

.flex-control-bar > .progress-bar {
  width: 100%;
}

.flex-control-bar > .sound-bar {
  width: 100%;
  max-width: 150px;
}

@media screen and (max-width: 700px) {
  .flex-bar {
    width: 100%;
    flex-direction: column;
  }

  .flex-controller {
    width: 100%;
    flex-direction: column;
  }

  .flex-controller > .flex-button {
    justify-content: center;
    margin-top: 10px;
  }

  .flex-control-bar {
    flex-direction: column;
    margin-left: 0;
  }

  .flex-control-bar > .sound-bar {
    max-width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>
