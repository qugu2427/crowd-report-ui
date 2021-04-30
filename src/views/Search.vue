<template>
  <div class="search">
    <!-- Search Bar -->
    <v-container style="max-width: 800px">
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
    <v-container
      class="d-flex justify-center flex-wrap mt-n5"
      style="max-width: 800px"
    >
      <div class="flex-grow-1" style="max-width: 600px;">
        <div v-if="home" class="text-left">
          <!-- <h6 class="text-h6">Hot</h6>
          <ArticleList sort="popular" period="month" :limit="3"></ArticleList> -->
          <h6 class="text-h6">New</h6>
          <ArticleList sort="new" period="all time" :limit="3"></ArticleList>
          <!-- <Ad></Ad> -->
        </div>
        <div class="text-left" v-else>
          <h6 class="text-h6">Search for "{{ currentSearch }}"</h6>
          <ArticleList
            :search="currentSearch"
            :sort="sortSelect"
            :period="periodSelect"
            :limit="6"
          ></ArticleList>
        </div>
      </div>

      <!-- Tag List -->
      <div elevation="1" class="px-5 text-left hidden-sm-and-down">
        <h6 class="text-h6">Tags</h6>
        <div v-for="tag in tags" :key="tag">
          <v-chip
            class="my-1"
            outlined
            @click="
              home = false;
              search = tag;
              currentSearch = search;
            "
          >
            {{ tag }}
          </v-chip>
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
