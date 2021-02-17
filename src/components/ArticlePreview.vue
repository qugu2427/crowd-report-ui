<template>
  <router-link
    :to="'/articles/' + id"
    class="text-decoration-none"
    max-width="700"
  >
    <v-card class="d-flex d-grow-0 mb-3" tile>
      <v-img :src="imageUrl" height="125" width="200" max-width="200"></v-img>
      <div class="text-left pl-2 pt-2">
        <v-card-title class="font-weight-light pt-0 pl-0 pb-0">{{
          title.length > 40 ? title.substring(0, 40) + "..." : title
        }}</v-card-title>
        <div class="text-subtitle-2 font-weight-light">{{ created }}</div>
        <div class="text-subtitle-2 font-weight-light">{{ author }}</div>
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
    created: String,
  },
};
</script>

<style></style>
