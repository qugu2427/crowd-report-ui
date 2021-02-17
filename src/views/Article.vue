<template>
  <div>
    <div class="text-center my-5" v-if="notFound">
      <h1 class="text-h3 my-3 font-weight-bold font-italic">404</h1>
      <h1 class="text-h3 my-3 font-weight-bold font-italic">
        Article Not Found
      </h1>
    </div>
    <div v-else>
      <ArticleContent
        :title="title"
        :author="author"
        :created="created"
        :tags="tags"
        :imageUrl="imageUrl"
        :body="body"
      ></ArticleContent>
      <div class="text-center my-1">
        <v-btn fab color="#1DA1F2" small depressed class="mx-1">
          <v-icon color="white">mdi-twitter</v-icon>
        </v-btn>
        <v-btn fab color="#4267B2" small depressed class="mx-1">
          <v-icon color="white">mdi-facebook</v-icon>
        </v-btn>
        <v-btn fab color="#ff6314" small depressed class="mx-1">
          <v-icon color="white">mdi-reddit</v-icon>
        </v-btn>
        <v-btn fab color="#0088CC" small depressed class="mx-1">
          <v-icon color="white">mdi-telegram</v-icon>
        </v-btn>
        <v-btn fab color="#25D366" small depressed class="mx-1">
          <v-icon color="white">mdi-whatsapp</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArticle } from "@/requester.js";
import ArticleContent from "@/components/ArticleContent.vue";
export default {
  name: "Home",
  components: {
    ArticleContent,
  },
  data() {
    return {
      notFound: false,
      title: "",
      author: "",
      created: "0",
      tags: [],
      imageUrl: "",
      body: "",
    };
  },
  async mounted() {
    let res = await fetchArticle(this.$route.params.id);
    if (res.err != null) {
      if (res.err.name == "Not Found") {
        this.notFound = true;
      } else {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      }
    } else {
      this.title = res.data.title;
      this.author = res.data.author;
      this.created = res.data.created;
      this.tags = res.data.tags;
      this.imageUrl = res.data.imageUrl;
      this.body = res.data.body;
    }
  },
};
</script>

<style></style>
