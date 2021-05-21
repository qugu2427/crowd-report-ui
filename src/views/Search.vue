<template>
  <div class="search">
    <!-- Search Bar -->
    <v-container style="max-width: 800px;">
      <div class="d-flex">
        <v-select
          filled
          rounded
          label="sort"
          append-icon="mdi-sort"
          :items="sort"
          v-model="sortSelect"
          class="mr-2"
        ></v-select>
        <v-select
          filled
          rounded
          label="period"
          :items="period"
          v-model="periodSelect"
          append-icon="mdi-clock"
        ></v-select>
      </div>
      <v-form
        @submit.prevent
        @submit="
          home = false;
          currentSearch = search;
        "
        class="d-flex mt-n5"
      >
        <v-btn
          filled
          fab
          depressed
          color="grey lighten-3"
          class="mr-2"
          @click="home = true"
          aria-label="home button"
          ><v-icon>mdi-home</v-icon></v-btn
        >
        <v-text-field
          label="search"
          v-model="search"
          append-icon="mdi-magnify"
          filled
          rounded
        ></v-text-field>
      </v-form>
    </v-container>
    <!-- Article list -->
    <v-container class="mt-n5" style="max-width: 1200px">
      <div v-if="home">
        <!-- <h6 class="text-center text-h4 font-weight-light">Hot</h6>
        <ArticleList sort="popular" period="month" :limit="3"></ArticleList> -->
        <ArticleList sort="new" period="all time" :limit="6"></ArticleList>
      </div>
      <div v-else>
        <div class="text-center text-h4 font-weight-light">
          Search for "{{ currentSearch }}"
        </div>
        <ArticleList
          :search="currentSearch"
          :sort="sortSelect"
          :period="periodSelect"
          :limit="12"
        ></ArticleList>
      </div>
      <!-- Tag List -->
      <div class="my-5 d-flex flex-wrap justify-center align-center">
        <router-link
          v-for="tag in tags"
          :key="tag"
          :to="'/?search=' + tag"
          class="text-decoration-none"
        >
          <v-chip
            @click="
              search = tag;
              currentSearch = tag;
              home = false;
            "
            class="my-1 mx-1"
            outlined
          >
            {{ tag }}
          </v-chip>
        </router-link>
      </div>

      <div class="text-center my-5">
        <div class="text-h5">Got something to report?</div>
        Sign in with your google account and
        <router-link to="/create">create</router-link> an article!
      </div>
    </v-container>
  </div>
</template>

<script>
import { fetchTags } from "@/requester.js";
import ArticleList from "@/components/ArticleList.vue";
export default {
  name: "Search",
  components: {
    ArticleList,
  },
  data() {
    return {
      search: "",
      currentSearch: "",
      tags: [],
      home: true,
      sort: ["popular", "new", "hearted", "viewed"],
      sortSelect: "new",
      period: ["day", "week", "month", "year", "all time"],
      periodSelect: "month",
    };
  },
  async mounted() {
    let res = await fetchTags();
    if (res.err != null) {
      this.$emit("errored", { name: res.err.name, message: res.err.message });
    } else {
      this.tags = res.data.tags;
    }
    if (this.$route.query.search != null) {
      this.home = false;
      this.search = this.$route.query.search;
      this.currentSearch = this.$route.query.search;
    }
  },
};
</script>

<style></style>
