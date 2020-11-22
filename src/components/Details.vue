<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <button v-bind="attrs" v-on="on">
        <Infos />
      </button>
    </template>

    <v-card>
      <v-card-title class="flex-header headline lighten-2">
        <div class="flex-title">
          <img
            class="thumbnail-image mr-2"
            :src="require('@/' + music.thumbnail)"
          />

          {{ music.title }}
          &nbsp;-
          <router-link
            class="router-link ml-1"
            :to="'/artist/' + artist.name.toLowerCase()"
          >
            {{ artist.name }}
          </router-link>
        </div>

        <Like @handleLike="handleLike(music.id)" :like="music.liked" />
      </v-card-title>
      <hr />
      <v-card-text class="mt-2">
        {{ music.description }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Infos from "./control/Infos";
import Like from "./control/Like";

export default {
  name: "Details",
  props: {
    music: Object,
    artist: Object,
  },
  components: {
    Infos,
    Like,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    handleLike(musicId) {
      this.$emit("handleLike", musicId);
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

a.router-link {
  font-weight: bold;
  color: white;
  text-decoration: none;
}
a.router-link-exact-active {
  color: yellowgreen;
}

.flex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-title {
  display: flex;
  align-items: center;
}

.thumbnail-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  object-position: center;
}
</style>