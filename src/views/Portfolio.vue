<template>
  <div class="portfolio">
    <h1>This is a portfolio of {{ $route.params.artist }}</h1>
    <v-btn @click="showComments">Chargement des commentaires</v-btn>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Portfolio",
  created() {
    console.log(this.$route.params);
  },
  methods: {
    showComments() {
      this.$router.push({
        name: "comments",
        params: { prenom: this.$route.params.prenom },
      });
    },
  },
};
</script>