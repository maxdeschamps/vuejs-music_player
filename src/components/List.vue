<template>
  <div>
    <h4 class="pl-3 mt-3">My playlist</h4>
    <v-list name="My playlist" class="ma-3">
      <v-item
        class="d-flex justify-space-between align-center"
        v-for="(track, index) in playlist"
        :key="index"
      >
        <button
          @click="playMusic(track)"
          :class="track == music ? 'active' : ''"
        >
          {{ track.title }}&nbsp;-<em class="ml-1">{{ track.artist }}</em>
        </button>
      </v-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    playlist: Array,
    music: Object,
  },
  methods: {
    playMusic(track) {
      this.$emit("playMusic", track);
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