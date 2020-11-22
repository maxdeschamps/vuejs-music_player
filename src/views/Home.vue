<template>
  <v-item-group>
    <v-card class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="require('@/' + music.thumbnail)"></v-img>

      <v-card-actions class="d-flex justify-space-between align-center py-2">
        <div class="d-flex">
          <div class="d-flex flex-column text-left">
            <v-card-title class="py-0"> My playlist</v-card-title>
          </div>
        </div>
      </v-card-actions>

      <hr />

      <List
        @playMusic="playMusic"
        @handleLike="handleLike"
        @onHoldPlaylist="onHoldPlaylist"
        :musics="musicsOrdered()"
        :artists="artists"
        :music="music"
      />
    </v-card>

    <LikedMusics
      @playMusic="playMusic"
      @handleLike="handleLike"
      @onHoldPlaylist="onHoldPlaylist"
      :musics="musics"
      :artists="artists"
      :music="music"
    />
    &nbsp;
    <Search
      @playMusic="playMusic"
      @handleLike="handleLike"
      @onHoldPlaylist="onHoldPlaylist"
      :musics="musics"
      :artists="artists"
      :music="music"
    />
  </v-item-group>
</template>

<script>
import List from "@/components/player/List";
import LikedMusics from "@/components/modal/LikedMusics";
import Search from "@/components/modal/Search";

export default {
  name: "Home",
  components: {
    List,
    LikedMusics,
    Search,
  },
  props: {
    musics: Array,
    artists: Array,
    music: Object,
    playlist: Array,
  },
  methods: {
    playMusic(trackId) {
      this.$emit("playMusic", trackId);
    },
    handleLike(trackId) {
      this.$emit("handleLike", trackId);
    },
    onHoldPlaylist(trackId) {
      this.$emit("onHoldPlaylist", trackId);
    },
    musicsOrdered() {
      const musicsOrdered = this.playlist.map(
        (musicId) =>
          this.musics[this.musics.findIndex((el) => el.id == musicId)]
      );
      return musicsOrdered;
    },
  },
};
</script>

<style scoped>
ul {
  margin: 4px;
  padding: 8px;
}
.active {
  color: yellowgreen;
}
</style>