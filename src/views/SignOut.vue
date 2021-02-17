<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$cookies.remove("accessToken");
    this.$emit("signOut");
    this.$router.push("/");
  },
};
</script>

<style>
</style>