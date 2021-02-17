<template>
  <div class="search">
    <!-- Search Bar -->
    <v-container style="max-width: 700px">
      <v-form
        @submit.prevent
        @submit="
          home = false;
          currentSearch = search;
        "
        class="d-flex"
      >
        <v-btn
          filled
          fab
          depressed
          color="grey lighten-3"
          class="mr-2"
          @click="home = true"
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
          <h6 class="text-h6">New</h6>
          <ArticleList sort="new" :limit="6"></ArticleList>
          <!-- <Ad></Ad> -->
        </div>
        <div class="text-left" v-else>
          <h6 class="text-h6">Search for "{{ currentSearch }}"</h6>
          <ArticleList :search="currentSearch" :limit="6"></ArticleList>
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
