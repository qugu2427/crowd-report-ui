<template>
  <div>
    <div class="d-flex flex-wrap justify-center align-center">
      <ArticlePreview
        v-for="(article, index) in articles"
        :key="
          `${index}-${article.id}-${Date.now()}-${Math.floor(Math.random())}`
        "
        :id="article.id + ''"
        :author="escapeAuthor(article.author)"
        :title="article.title"
        :tags="article.tags"
        :views="article.views"
        :hearts="article.hearts"
        :imageUrl="article.imageUrl"
        :created="dateAsString(article.created)"
      ></ArticlePreview>
    </div>
    <div class="text-center">
      <v-btn
        text
        block
        tile
        color="blue darken-2"
        v-if="more"
        @click="showMore(limit)"
      >
        <v-icon left>mdi-plus</v-icon>
        show more
      </v-btn>
      <div class="font-italic" v-else-if="articles.length > 0">
        end of results
      </div>
      <div class="font-italic" v-else-if="!loading && articles.length == 0">
        no results
      </div>
    </div>
  </div>
</template>

<script>
import { search } from "@/requester.js";
import { dateAsString, escapeAuthor } from "@/helpers.js";
import ArticlePreview from "@/components/ArticlePreview.vue";
export default {
  name: "ArticleList",
  props: {
    search: { type: String, default: "" },
    sort: { type: String, default: "popular" },
    period: { type: String, default: "week" },
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
    escapeAuthor,
    showMore: async function(limit) {
      let res = await search(
        this.search,
        this.sort,
        this.period,
        this.limit,
        this.articles.length
      );
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
    refreshSearch: async function() {
      this.loading = true;
      this.articles = [];
      this.more = false;
      let res = await search(
        this.search,
        this.sort,
        this.period,
        this.limit,
        this.articles.length
      );
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        if (res.data.count > 0) {
          this.articles = res.data.articles;
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
  async mounted() {
    let res = await search(
      this.search,
      this.sort,
      this.period,
      this.limit,
      this.articles.length
    );
    if (res.err != null) {
      this.$emit("errored", { name: res.err.name, message: res.err.message });
    } else {
      if (res.data.count > 0) {
        this.articles = res.data.articles;
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
      await this.refreshSearch();
    },
    sort: async function() {
      await this.refreshSearch();
    },
    period: async function() {
      await this.refreshSearch();
    },
  },
};
</script>

<style></style>
