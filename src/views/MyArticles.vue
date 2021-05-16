<template>
  <v-container style="max-width: 800px;">
    <!-- Sort an period selectors -->
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
    <!-- Article list -->
    <div class="text-center text-h4 font-weight-light">
      Your articles
    </div>
    <MyArticleList
      :accessToken="accessToken"
      :sort="sortSelect"
      :period="periodSelect"
      :limit="6"
    ></MyArticleList>
  </v-container>
</template>

<script>
import MyArticleList from "@/components/MyArticleList.vue";
export default {
  components: {
    MyArticleList,
  },
  props: {
    accessToken: String,
    signedIn: { type: Boolean, default: false },
  },
  data() {
    return {
      sort: ["popular", "new", "hearted", "viewed"],
      sortSelect: "popular",
      period: ["day", "week", "month", "year", "all time"],
      periodSelect: "day",
    };
  },
  mounted() {
    // If not signed reditect to home
    if (!this.signedIn) {
      this.$router.push("/");
    }
  },
};
</script>

<style></style>
