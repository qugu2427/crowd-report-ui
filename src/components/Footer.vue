<template>
  <v-footer color="blue darken-2" padless>
    <v-row justify="center" no-gutters>
      <!-- Github button -->
      <a
        href="https://github.com/qugu2427/crowd-report-api"
        class="text-decoration-none"
      >
        <v-btn text rounded color="white" class="my-2">
          github
          <v-icon right>mdi-github</v-icon></v-btn
        >
      </a>
      <!-- Disclaimer button -->
      <router-link to="/meta" class="text-decoration-none">
        <v-btn text rounded color="white" class="my-2"
          >Privacy<v-icon right>mdi-lock</v-icon></v-btn
        >
      </router-link>
      <!-- Contact Button -->
      <a href="mailto:crowdreport.me@gmail.com" class="text-decoration-none">
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

<script></script>

<style></style>
