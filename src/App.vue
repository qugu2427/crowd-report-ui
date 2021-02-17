<template>
  <v-app>
    <TopBar
      :signedIn="topBar.signedIn"
      :name="topBar.name"
      :picture="topBar.picture"
      :loginUrl="topBar.loginUrl"
      :loading="topBar.loading"
    ></TopBar>
    <v-main>
      <v-alert type="error" prominent tile v-if="error.show">
        <v-row align="center">
          <v-col class="grow">
            <strong>{{ error.name }}</strong> - {{ error.message }}
          </v-col>
          <v-col class="shrink">
            <a href="" class="text-decoration-none">
              <v-btn>Refresh Page</v-btn>
            </a>
          </v-col>
        </v-row>
      </v-alert>
      <router-view
        @errored="handleError"
        @signIn="handleSignIn"
        @signOut="handleSignOut"
        :signedIn="topBar.signedIn"
      ></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { fetchLoginUrl, fetchUserData } from "@/requester.js";
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    TopBar,
    Footer,
  },
  data() {
    return {
      error: {
        show: false,
        name: null,
        message: null,
      },
      topBar: {
        signedIn: false,
        name: "",
        picture: "",
        loginUrl: "#",
        loading: true,
      },
    };
  },
  methods: {
    handleError: function (error) {
      this.error.show = true;
      this.error.name = error.name;
      this.error.message = error.message;
    },
    handleSignIn: async function () {
      this.topBar.loading = true;
      if (this.$cookies.isKey("accessToken")) {
        let res = await fetchUserData(this.$cookies.get("accessToken"));
        if (res.err != null) {
          this.handleError({ name: res.err.name, message: res.err.message });
        } else {
          this.topBar.name = res.data.name;
          this.topBar.picture = res.data.picture;
          this.topBar.signedIn = true;
        }
      }
      this.topBar.loading = false;
    },
    handleSignOut: function () {
      this.topBar.signedIn = false;
    },
  },
  async mounted() {
    // If signed in get user dat
    if (this.$cookies.isKey("accessToken")) {
      let res = await fetchUserData(this.$cookies.get("accessToken"));
      if (res.err != null) {
        console.log("Sign in failed.");
        this.$cookies.remove("accessToken");
      } else {
        // this.signedIn = true
        this.topBar.name = res.data.name;
        this.topBar.picture = res.data.picture;
        this.topBar.signedIn = true;
      }
    }

    // Get login url
    let res = await fetchLoginUrl();
    if (res.err != null) {
      this.handleError({ name: res.err.name, message: res.err.message });
    } else {
      this.topBar.loginUrl = res.data.loginUrl;
    }

    this.topBar.loading = false;
  },
};
</script>
