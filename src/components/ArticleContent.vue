<template>
  <v-container style="max-width: 700px">
    <div class="d-flex flex-wrap justify-center align-center">
      <router-link
        v-for="tag in tags"
        :key="tag"
        :to="'/?search=' + tag"
        class="text-decoration-none"
      >
        <v-chip
          @click="
            {
              //pass
            }
          "
          class="mx-1 my-1"
          outlined
        >
          {{ tag }}
        </v-chip>
      </router-link>
    </div>
    <article>
      <header class="text-center">
        <h1 class="text-h3 my-3 font-weight-bold font-italic">{{ title }}</h1>
        <p class="text-subtitle my-2">by {{ author }}</p>
        <time class="text-subtitle my-2 font-weight-light">{{
          dateAsString(created)
        }}</time>
      </header>
      <p v-html="body" class="articleBody mt-2"></p>
    </article>
  </v-container>
</template>

<script>
import { dateAsString } from "@/helpers.js";
export default {
  props: {
    title: { type: String, default: "" },
    author: { type: String, default: "" },
    created: { type: String, default: "" },
    tags: {
      type: Array,
      default: function () {
        return [];
      },
    },
    imageUrl: { type: String, default: "" },
    body: { type: String, default: "" },
  },
  methods: {
    dateAsString,
  },
};
</script>

<!-- styles cannot be scoped -->
<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";
.articleBody {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.articleBody img {
  max-width: 100%;
  height: auto;
  justify-self: center;
}
.articleBody iframe {
  width: 100%;
  height: 380px;
}
</style>
