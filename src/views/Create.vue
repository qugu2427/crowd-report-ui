<template>
  <div class="create">
    <!-- Uploading image overlay -->
    <v-overlay :value="uploading">
      <span class="mx-2 font-weight-medium">uploading {{ uploadingFile }}</span>
      <v-progress-circular
        :size="25"
        :width="7"
        color="white"
        class="my-5"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <!-- Publishing loader -->
    <div class="text-center my-5" v-if="publishing">
      <v-progress-circular
        :size="70"
        :width="7"
        color="blue darken-2"
        class="my-5"
        indeterminate
      ></v-progress-circular>
    </div>
    <!-- Main content -->
    <v-container color="white" style="max-width: 700px" v-else>
      <div v-if="signedIn">
        <!-- Preview -->
        <div v-if="preview">
          <v-btn
            depressed
            color="grey lighten-3"
            class="mr-2"
            @click="preview = false"
            block
            >exit preview</v-btn
          >
          <ArticleContent
            :title="title"
            author="Your Name"
            :created="Date.now() + ''"
            :tags="tags"
            :body="body"
          ></ArticleContent>
        </div>
        <!-- Create form -->
        <div v-else>
          <!-- Title input -->
          <v-text-field
            label="title"
            v-model="title"
            outlined
            class="rounded-0"
            :hint="titleHint"
          >
            <template slot="append">
              <v-icon v-if="!titleValid"
                >mdi-checkbox-blank-circle-outline</v-icon
              >
              <v-icon color="success" v-else>mdi-check-circle</v-icon>
            </template>
          </v-text-field>
          <!-- Preview image uplaod -->
          <v-file-input
            label="preview image"
            v-model="prevImage"
            accept="image/*"
            outlined
            prepend-icon=""
            class="rounded-0"
            :hint="prevImageHint"
            truncate-length="15"
          >
            <template slot="append">
              <v-icon v-if="!prevImageValid"
                >mdi-checkbox-blank-circle-outline</v-icon
              >
              <v-icon color="success" v-else>mdi-check-circle</v-icon>
            </template>
          </v-file-input>
          <!-- WYSIWYG editor -->
          <VueEditor
            useCustomImageHandler
            @image-added="handleImageAdded"
            v-model="body"
            :editorToolbar="customToolbar"
          ></VueEditor>
          <template>
            <v-progress-linear
              :value="(body.length / 10000) * 100"
              :color="!bodyValid ? 'blue-grey' : 'success'"
              background-color="#ccc"
              style="margin-top: -1px; margin-bottom: -1px; z-index: 2"
            ></v-progress-linear>
          </template>
          <v-text-field
            v-model="bodyHint"
            dense
            outlined
            class="rounded-0 mb-n5"
            disabled
          >
            <template slot="append">
              <v-icon v-if="!bodyValid"
                >mdi-checkbox-blank-circle-outline</v-icon
              >
              <v-icon color="success" v-else>mdi-check-circle</v-icon>
            </template>
          </v-text-field>
          <!-- Tags select -->
          <v-select
            :items="optionTags"
            v-model="tags"
            chips
            label="tags"
            multiple
            outlined
            class="mt-5 rounded-0"
            :menu-props="{ top: true, offsetY: true }"
            :hint="tagsHint"
          >
            <template slot="append">
              <v-icon v-if="!tagsValid"
                >mdi-checkbox-blank-circle-outline</v-icon
              >
              <v-icon color="success" v-else>mdi-check-circle</v-icon>
            </template>
          </v-select>
          <!-- Captcha -->
          <VueRecaptcha
            sitekey="6Ld0GUMaAAAAAAAtUGrAI3xA0C1CEHHA22y8FByn"
            @verify="verifyHandler"
            @expired="expireHandler"
            class="mb-5"
          ></VueRecaptcha>
          <!-- Publish and preview buttons -->
          <div class="mb-5">
            <v-btn
              depressed
              color="grey lighten-3"
              class="mr-2"
              @click="preview = true"
              >preview</v-btn
            >
            <v-btn
              depressed
              dark
              color="blue darken-2"
              @click="publish"
              id="publish_btn"
              :disabled="!articleValid"
              >publish</v-btn
            >
          </div>
        </div>
      </div>
      <v-alert type="info" tile prominent v-else
        ><strong>You must sign in to create an article.</strong></v-alert
      >
    </v-container>
  </div>
</template>

<script>
import { fetchTags, createArticle, uploadImage } from "@/requester.js";
import ArticleContent from "@/components/ArticleContent.vue";
import { VueEditor } from "vue2-editor";
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "Create",
  props: {
    signedIn: { type: Boolean, default: false },
    accessToken: { type: String, default: "" },
  },
  components: {
    VueEditor,
    ArticleContent,
    VueRecaptcha,
  },
  data() {
    return {
      preview: false,
      title: "",
      prevImage: null,
      body: "",
      optionTags: [],
      tags: [],
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["image", "video"],
      ],
      titleRgx: /^.{15,75}$/,
      imageRgx: /^.{15,75}$/,
      tagsRgx: /^.{1,75}$/,
      bodyRgx: /^.{300,10000}$/,
      captchaResponse: "",
      publishing: false,
      uploading: false,
      uploadingFile: "",
      editID: null,
    };
  },
  computed: {
    // Validators
    titleValid: function() {
      return this.titleRgx.test(this.title);
    },
    prevImageValid: function() {
      return this.prevImage != null && this.prevImage.size < 500000;
    },
    bodyValid: function() {
      return this.bodyRgx.test(this.body);
    },
    tagsValid: function() {
      return this.tagsRgx.test(this.tags.join(","));
    },
    articleValid: function() {
      return (
        this.titleValid &&
        this.prevImageValid &&
        this.bodyValid &&
        this.tagsValid &&
        this.captchaResponse.length > 0
      );
    },
    // Hints
    titleHint: function() {
      if (!this.titleValid) {
        return `Title must be between 20 and 50 characters (${this.title.length})`;
      }
      return "";
    },
    prevImageHint: function() {
      if (!this.prevImageValid) {
        return "Image too large";
      }
      return "";
    },
    tagsHint: function() {
      if (!this.tagsValid) {
        return `Tags must be between 1 and 100 characters (${
          this.tags.join(",").length
        })`;
      }
      return "";
    },
    bodyHint: function() {
      return `Content must be between 3% and 100% full (${(
        (this.body.length / 10000) *
        100
      ).toFixed(1)}%)`;
    },
  },
  methods: {
    publish: async function() {
      this.publishing = true;
      let res = await uploadImage(this.accessToken, this.prevImage);
      if (res.err == null) {
        res = await createArticle(
          this.accessToken,
          res.data.url,
          this.title,
          this.body,
          this.tags,
          this.captchaResponse
        );
        if (res.err != null) {
          alert(res.err.name + "\n" + res.err.message);
        } else {
          this.$router.push(`/articles/${res.data.id}`);
        }
      } else {
        alert(res.err.name + "\n" + res.err.message);
      }
      this.publishing = false;
    },
    handleImageAdded: async function(
      file,
      Editor,
      cursorLocation,
      resetUploader
    ) {
      this.uploading = true;
      this.uploadingFile = file.name;
      let res = await uploadImage(this.accessToken, file);
      if (res.err != null) {
        alert(res.err.name);
      } else {
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
      }
      resetUploader();
      this.uploading = false;
      this.uploadingFile = "";
    },
    verifyHandler: function(response) {
      this.captchaResponse = response;
    },
    expireHandler: function() {
      this.captchaResponse = "";
    },
  },
  async mounted() {
    // Get tags
    let res = await fetchTags();
    if (res.err != null) {
      this.$emit("errored", { name: res.err.name, message: res.err.message });
    } else {
      this.optionTags = res.data.tags;
    }
  },
};
</script>

<style scoped>
.v-input__icon--append .v-icon {
  color: #24b52e;
}
#publish_btn.v-btn--disabled.theme--dark {
  background-color: #90caf9 !important;
}
</style>
