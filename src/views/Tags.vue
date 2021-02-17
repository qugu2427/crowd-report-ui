<template>
  <v-container class="text-center">
    <h6 class="text-h6">Tags</h6>
    <router-link
      v-for="tag in tags"
      :key="tag"
      :to="'/?search=' + tag"
      class="text-decoration-none"
    >
      <v-chip class="my-1" outlined>
        {{ tag }}
      </v-chip>
      <br />
    </router-link>
  </v-container>
</template>

<script>
import { fetchTags } from "@/requester.js";
export default {
  name: "Tags",
  data() {
    return {
      tags: [],
    };
  },
  async mounted() {
    let res = await fetchTags();
    if (res.err != null) {
      this.$emit("errored", { name: res.err.name, message: res.err.message });
    } else {
      this.tags = res.data.tags;
    }
  },
};
</script>

<style></style>
