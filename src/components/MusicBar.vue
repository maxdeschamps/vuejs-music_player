<template>
  <v-main class="spotify">
    <div class="flex-bar">
      <div class="flex-music">
        <figure class="thumbnail-figure">
          <img
            class="thumbnail-image"
            :src="require('@/' + musics[music].thumbnail)"
          />
          <figcaption>
            <Like
              @handleLike="handleLike(musics[music].id)"
              :like="musics[music].liked"
            />
          </figcaption>
        </figure>

        <div class="d-flex flex-column text-left ml-4">
          <h3 class="py-0">{{ musics[music].title }}</h3>

          <em class="py-0">
            <router-link
              :to="
                '/artist/' +
                artists[findArtist(musics[music].artist)].name.toLowerCase()
              "
            >
              {{ artists[findArtist(musics[music].artist)].name }}
            </router-link>
          </em>
        </div>
      </div>

      <div class="flex-controller">
        <div class="flex-button">
          <Play @handleMusic="handleMusic" :play="play" />
          <Previous @changeMusic="changeMusic" />
          <Next @changeMusic="changeMusic" />
        </div>

        <div class="flex-control-bar">
          <ProgressBar
            class="progress-bar"
            @changeTime="changeTime"
            :duration="duration"
          />
          <SoundController
            class="sound-bar"
            @handleSound="handleSound"
            @changeSound="changeSound"
            :sound="sound"
          />
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

export default {
  name: "MusicBar",
  props: {
    musics: Array,
    artists: Array,
    music: Number,
    play: Boolean,
    duration: Object,
    sound: Object,
  },
  components: {
    ProgressBar,
    SoundController,
    Play,
    Previous,
    Next,
    Like,
  },
  methods: {
    changeMusic(next = true) {
      this.$emit("changeMusic", next);
    },
    handleMusic() {
      this.$emit("handleMusic");
    },
    changeTime(time) {
      this.$emit("changeTime", time);
    },
    handleSound() {
      this.$emit("handleSound");
    },
    changeSound(volume) {
      this.$emit("changeSound", volume);
    },
    handleLike(trackId) {
      this.$emit("handleLike", trackId);
    },
    findArtist(artistId) {
      return this.artists.findIndex((artist) => artist.id === artistId);
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
  width: calc(100% - 200px);
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
  max-width: 250px;
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
