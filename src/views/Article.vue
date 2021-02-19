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
        <div class="my-4">
          <v-btn small dark depressed class="mx-2" color="pink">
            heart
            <v-icon right>mdi-heart-plus</v-icon>
          </v-btn>
          <v-btn small outlined class="mx-2">
            {{ author }}
            <v-icon right>mdi-account-search</v-icon>
          </v-btn>
          <v-btn small outlined class="mx-2">
            report article
            <v-icon right>mdi-alert-octagram</v-icon>
          </v-btn>
        </div>
        <div class="my-4" v-if="googleId == authorGoogleId">
          <v-btn small outlined class="mx-2" color="error">
            update and re-publish
            <v-icon right>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            small
            outlined
            class="mx-2"
            color="error"
            @click="handleDelete"
          >
            delete
            <v-icon right>mdi-delete-forever</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArticle, deleteArticle } from "@/requester.js";
import ArticleContent from "@/components/ArticleContent.vue";
export default {
  name: "Home",
  components: {
    ArticleContent,
  },
  props: {
    googleId: { type: String, default: "guest" },
  },
  data() {
    return {
      notFound: false,
      title: "",
      author: "",
      authorGoogleId: "",
      created: "0",
      tags: [],
      imageUrl: "",
      body: "",
    };
  },
  methods: {
    handleDelete: async function() {
      let res = await deleteArticle(
        this.$cookies.get("accessToken"),
        this.$route.params.id
      );
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        alert(`Article with id ${res.data.id} has been deleted.`);
        this.$router.push("/");
      }
    },
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
      this.authorGoogleId = res.data.authorGoogleId;
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