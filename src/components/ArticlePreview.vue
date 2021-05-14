<template>
  <router-link
    :to="'/articles/' + id"
    class="text-decoration-none"
    :aria-label="title"
  >
    <v-card
      class="d-flex flex-column ma-3 rounded"
      tile
      elevation="1"
      max-width="350"
      id="card"
    >
      <v-img
        :src="imageUrl"
        height="200"
        width="350"
        alt="preview image"
      ></v-img>
      <div class="text-left px-2 pb-2" id="preview-info">
        <v-card-title class="font-weight-light pt-0 pl-0 pb-0">{{
          title
        }}</v-card-title>
        <div class="text-no-wrap text-subtitle-2 font-weight-light">
          {{ author }}
        </div>
        <div class="text-no-wrap text-subtitle-2 font-weight-light">
          {{ created }}
        </div>
        <div class="text-subtitle-2 font-weight-light">
          <v-icon>mdi-eye</v-icon>
          {{ views }}
          <v-icon color="pink" class="ml-3">mdi-heart</v-icon>
          {{ hearts }}
        </div>
      </div>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: {
    id: String,
    author: String,
    imageUrl: String,
    title: String,
    tags: Array,
    views: Number,
    hearts: Number,
    created: String,
  },
};
</script>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal;
}
#card {
  transition: 0.4s;
}
#card:hover {
  background-color: rgb(250, 250, 250);
}
</style>
