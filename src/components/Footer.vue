<template>
  <v-footer color="blue darken-2" padless>
    <v-row justify="center" no-gutters>
      <v-btn text rounded color="white" class="my-2">
        github
        <v-icon right>mdi-github</v-icon></v-btn
      >
      <v-btn text rounded color="white" class="my-2"
        >Report<v-icon right>mdi-flag</v-icon></v-btn
      >
      <v-btn text rounded color="white" class="my-2"
        >Contact<v-icon right>mdi-email</v-icon></v-btn
      >
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
