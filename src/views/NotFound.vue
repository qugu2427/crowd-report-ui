<template>
  <div class="NotFound">
    <v-container color="white" style="max-width: 700px" class="text-center">
      <div class="text-h2">404 Not Found</div>
      <div class="text-h5">"{{ $route.path }}" is not a valid route</div>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>