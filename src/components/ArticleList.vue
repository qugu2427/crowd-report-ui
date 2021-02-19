<template>
  <div class="text-center">
    <ArticlePreview
      v-for="(article, index) in articles"
      :key="`${index}-${article.id}-${Date.now()}-${Math.floor(Math.random())}`"
      :id="article.id + ''"
      :author="article.author"
      :title="article.title"
      :tags="article.tags"
      :views="article.views"
      :imageUrl="article.imageUrl"
      :created="dateAsString(article.created)"
    ></ArticlePreview>
    <v-btn color="blue darken-2" text v-if="more" @click="showMore(3)">
      <v-icon left>mdi-chevron-down</v-icon>
      show more
      <v-icon right>mdi-chevron-down</v-icon>
    </v-btn>
    <div class="font-italic" v-else-if="articles.length > 0">
      end of results
    </div>
    <div class="font-italic" v-else-if="!loading && articles.length == 0">
      no results
    </div>
  </div>
</template>

<script>
import { searchArticles } from "@/requester.js";
import { dateAsString } from "@/helpers.js";
import ArticlePreview from "@/components/ArticlePreview.vue";
export default {
  name: "ArticleList",
  props: {
    search: { type: String, default: "" },
    sort: { type: String, default: "" },
    limit: { type: Number, default: 3 },
  },
  components: {
    ArticlePreview,
  },
  data() {
    return {
      articles: [],
      more: false,
      loading: true,
    };
  },
  methods: {
    dateAsString,
    showMore: async function(limit) {
      let res = await searchArticles(this.search, limit, this.articles.length);
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        if (res.data.count > 0) {
          this.articles = this.articles.concat(res.data.articles);
        }
        if (res.data.count < limit) {
          this.more = false;
        }
      }
    },
  },
  async mounted() {
    let res = await searchArticles(
      this.search,
      this.limit,
      this.articles.length
    );
    if (res.err != null) {
      this.$emit("errored", { name: res.err.name, message: res.err.message });
    } else {
      if (res.data.count > 0) {
        this.articles = this.articles.concat(res.data.articles);
      }
      if (res.data.count < this.limit) {
        this.more = false;
      } else {
        this.more = true;
      }
    }
    this.loading = false;
  },
  watch: {
    search: async function() {
      this.loading = true;
      this.articles = [];
      this.more = false;
      let res = await searchArticles(
        this.search,
        this.limit,
        this.articles.length
      );
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        if (res.data.count > 0) {
          this.articles = this.articles.concat(res.data.articles);
        }
        if (res.data.count < this.limit) {
          this.more = false;
        } else {
          this.more = true;
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
