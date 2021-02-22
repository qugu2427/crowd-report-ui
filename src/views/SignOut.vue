<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$emit("signOut");
    this.$router.push("/");
  },
};
</script>

<style></style>
