<template>
  <v-container style="max-width: 700px">
    <nav class="text-center">
      <router-link
        v-for="tag in tags"
        :key="tag"
        :to="'/?search=' + tag"
        class="text-decoration-none"
      >
        <v-chip class="mx-1 my-1" outlined>
          {{ tag }}
        </v-chip>
      </router-link>
    </nav>
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
      default: function() {
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

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";
.articleBody {
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
.articleBody img {
  max-width: 100%;
}
.articleBody iframe {
  width: 100%;
  height: 380px;
}
</style>
