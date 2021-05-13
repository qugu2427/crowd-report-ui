<template>
  <router-link
    :to="'/articles/' + id"
    class="text-decoration-none"
    max-width="700"
    :aria-label="title"
  >
    <v-card class="d-flex d-grow-0 mb-3" tile elevation="0" id="card">
      <v-img
        :src="imageUrl"
        height="125"
        width="200"
        max-width="200"
        alt="preview image"
      ></v-img>
      <div class="text-left pl-2 pt-2" id="preview-info">
        <v-card-title class="font-weight-light pt-0 pl-0 pb-0">{{
          title.length > 65 ? title.substring(0, 65) + "..." : title
        }}</v-card-title>
        <div class="text-subtitle-2 font-weight-light">
          {{ author }} - {{ created }}
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
#card {
  transition: 0.4s;
}
#card:hover {
  background-color: rgb(250, 250, 250);
}
</style>
