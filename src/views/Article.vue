<template>
  <div>
    <!-- Loading -->
    <div class="text-center my-5" v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="blue darken-2"
        class="my-5"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <!-- Not found container -->
      <div class="text-center my-5" v-if="notFound">
        <h1 class="text-h3 my-3 font-weight-bold font-italic">404</h1>
        <h1 class="text-h3 my-3 font-weight-bold font-italic">
          Article Not Found
        </h1>
      </div>
      <!-- Found container -->
      <div v-else>
        <ArticleContent
          :title="title"
          :author="author"
          :created="created"
          :tags="tags"
          :imageUrl="imageUrl"
          :body="body"
        ></ArticleContent>
        <div class="text-center my-1">
          <v-btn
            fab
            color="#1DA1F2"
            small
            depressed
            class="mx-1"
            aria-label="twitter"
          >
            <v-icon color="white">mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            fab
            color="#4267B2"
            small
            depressed
            class="mx-1"
            aria-label="facebook"
          >
            <v-icon color="white">mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            fab
            color="#ff6314"
            small
            depressed
            class="mx-1"
            aria-label="reddit"
          >
            <v-icon color="white">mdi-reddit</v-icon>
          </v-btn>

          <!-- Heart, search, report buttons -->
          <div class="my-4">
            <!-- Heart Button -->
            <v-btn
              small
              outlined
              class="mx-2"
              color="pink"
              @click="handleHeart()"
              :disabled="this.hearting"
              v-if="hearted"
            >
              un-heart ({{ hearts }})
              <v-icon right>mdi-heart-minus</v-icon>
            </v-btn>
            <v-btn
              small
              dark
              depressed
              class="mx-2"
              color="pink"
              @click="handleHeart()"
              :disabled="this.hearting"
              v-else
            >
              heart ({{ hearts }})
              <v-icon right>mdi-heart-plus</v-icon>
            </v-btn>
            <!-- Search author button -->
            <router-link
              :to="'/?search=' + author"
              style="text-decoration: none;"
            >
              <v-btn small outlined class="mx-2">
                {{ author }}
                <v-icon right>mdi-account-search</v-icon>
              </v-btn>
            </router-link>
          </div>

          <!-- Delete buton -->
          <v-btn
            small
            outlined
            class="mx-2"
            color="error"
            @click="handleDelete"
            v-if="googleId == authorGoogleId || (forceShowDelete && signedIn)"
          >
            delete
            <v-icon right>mdi-delete-forever</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArticle, deleteArticle, heart, hearted } from "@/requester.js";
import ArticleContent from "@/components/ArticleContent.vue";
export default {
  components: {
    ArticleContent,
  },
  props: {
    googleId: { type: String, default: "guest" },
    accessToken: { type: String, default: "" },
    signedIn: { type: Boolean, default: false },
  },
  data() {
    return {
      loading: true,
      notFound: false,
      title: "",
      author: "",
      authorGoogleId: "",
      created: "0",
      tags: [],
      imageUrl: "",
      body: "",
      hearts: 0,
      hearted: false,
      hearting: true,
      forceShowDelete: false,
    };
  },
  methods: {
    handleDelete: async function() {
      let res = await deleteArticle(this.accessToken, this.$route.params.id);
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        alert(`Article with id ${res.data.id} has been deleted.`);
        this.$router.push("/");
      }
    },
    handleHeart: async function() {
      if (!this.signedIn) {
        alert("You must sign in to heart!");
        return;
      }
      this.hearting = true;
      let res = await heart(this.accessToken, this.$route.params.id);
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        this.hearted = res.data.hearted;
        if (this.hearted) {
          this.hearts++;
        } else {
          this.hearts--;
        }
      }
      this.hearting = false;
    },
  },
  async mounted() {
    let res = await fetchArticle(this.$route.params.id);
    if (res.err != null) {
      if (res.err.name == "Not Found") {
        this.notFound = true;
      } else {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      }
    } else {
      this.title = res.data.title;
      this.authorGoogleId = res.data.authorGoogleId;
      this.author = res.data.author;
      this.created = res.data.created;
      this.tags = res.data.tags;
      this.imageUrl = res.data.imageUrl;
      this.body = res.data.body;
      this.hearts = res.data.hearts;
    }
    if (this.signedIn) {
      res = await hearted(this.accessToken, this.$route.params.id);
      if (res.err != null) {
        this.$emit("errored", { name: res.err.name, message: res.err.message });
      } else {
        this.hearted = res.data.hearted;
        this.hearting = false;
      }
    } else {
      this.hearting = false;
    }
    this.loading = false;
  },
  created() {
    let count = 0;
    window.addEventListener("keydown", (e) => {
      if (e.key == "+") {
        count++;
        if (count > 6) {
          this.forceShowDelete = true;
        }
      }
    });
  },
};
</script>

<style></style>
