<template>
  <v-footer color="blue darken-2" padless>
    <v-row justify="center" no-gutters>
      <!-- Github button -->
      <a href="https://github.com/qugu2427/crowd-report-api">
        <v-btn text rounded color="white" class="my-2">
          github
          <v-icon right>mdi-github</v-icon></v-btn
        >
      </a>
      <!-- Disclaimer button -->
      <router-link to="/disclaimer">
        <v-btn text rounded color="white" class="my-2"
          >Disclaimer<v-icon right>mdi-exclamation-thick</v-icon></v-btn
        >
      </router-link>
      <!-- Contact Button -->
      <a href="mailto:someone@yoursite.com">
        <v-btn text rounded color="white" class="my-2"
          >Contact<v-icon right>mdi-email</v-icon></v-btn
        >
      </a>
      <v-col class="gray lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Crowd Report</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style></style>
