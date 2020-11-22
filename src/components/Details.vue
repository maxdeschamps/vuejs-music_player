<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <button class="mt-1" v-bind="attrs" v-on="on">
        <Infos />
      </button>
    </template>

    <v-card>
      <v-card-title class="flex-title headline lighten-2">
        <span>
          {{ music.title }}
          &nbsp;-
          <router-link
            class="router-link ml-1"
            :to="'/artist/' + artist.name.toLowerCase()"
          >
            {{ artist.name }}
          </router-link>
        </span>

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

.flex-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>