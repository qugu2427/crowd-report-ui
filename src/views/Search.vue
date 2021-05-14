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
      <div v-if="home" class="text-left">
        <!-- <h6 class="text-center text-h4 font-weight-light">Hot</h6>
        <ArticleList sort="popular" period="month" :limit="3"></ArticleList> -->
        <ArticleList sort="new" period="all time" :limit="6"></ArticleList>
        <!-- <Ad></Ad> -->
      </div>
      <div class="text-left" v-else>
        <h6 class="text-center text-h4 font-weight-light">
          Search for "{{ currentSearch }}"
        </h6>
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
          <v-chip class="my-1 mx-1" outlined>
            {{ tag }}
          </v-chip>
        </router-link>
      </div>

      <div class="text-center my-5">
        <div class="text-h5">Got something to report?</div>
        <div>
          Sign in with your google account and create an article!
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { fetchTags } from "@/requester.js";
import ArticleList from "@/components/ArticleList.vue";
// import Ad from "@/components/Ad.vue";
export default {
  name: "Search",
  components: {
    ArticleList,
    // Ad,
  },
  data() {
    return {
      search: "",
      currentSearch: "",
      tags: [],
      home: true,
      sort: ["popular", "new", "hearted", "viewed"],
      sortSelect: "popular",
      period: ["day", "week", "month", "year", "all time"],
      periodSelect: "week",
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
