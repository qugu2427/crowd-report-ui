<template>
  <div class="text-center my-5">
    <v-progress-circular
      :size="70"
      :width="7"
      color="blue darken-2"
      class="my-5"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import { fetchAccessToken } from "@/requester.js";
export default {
  async mounted() {
    if (this.$route.query.state != null && this.$route.query.code != null) {
      // Perform sign in
      let res = await fetchAccessToken(
        this.$route.query.state,
        this.$route.query.code
      );
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        this.$emit("signIn", res.data.accessToken);
      }
    }
    this.$router.push("/");
  },
};
</script>

<style></style>
