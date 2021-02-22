<template>
  <div>
    <v-app-bar
      color="blue darken-2"
      :dense="!$vuetify.breakpoint.mobile"
      flat
      dark
    >
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
        aria-label="navigate button"
      ></v-app-bar-nav-icon>

      <router-link to="/" class="text-decoration-none">
        <v-btn text class="hidden-sm-and-down">
          <v-icon left>mdi-magnify</v-icon>
          Search
        </v-btn>
      </router-link>

      <router-link to="/tags" class="text-decoration-none">
        <v-btn text class="hidden-sm-and-down">
          <v-icon left>mdi-tag-multiple</v-icon>
          Tags
        </v-btn>
      </router-link>

      <router-link to="/create" class="text-decoration-none">
        <v-btn text class="hidden-sm-and-down">
          <v-icon left>mdi-pencil</v-icon>
          Create
        </v-btn>
      </router-link>

      <router-link to="/meta" class="text-decoration-none">
        <v-btn text class="hidden-sm-and-down">
          <v-icon left>mdi-information-variant</v-icon>
          Meta
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <div class="text-h5 font-italic font-weight-black">Crowd Report</div>

      <v-spacer></v-spacer>

      <v-menu offset-y v-if="signedIn && !loading">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" aria-label="profile button">
            <v-avatar size="36" class="mx-2">
              <img :src="picture" alt="avatar" />
            </v-avatar>
            {{ name }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="$router.push('/create')">
            <v-icon left>mdi-pencil</v-icon>
            Create
          </v-list-item>
          <v-list-item link>
            <v-icon left>mdi-newspaper-variant-multiple</v-icon>
            My Articles
          </v-list-item>
          <v-list-item link @click="$router.push('/signOut')">
            <v-icon left>mdi-logout</v-icon>
            Sign Out
          </v-list-item>
        </v-list>
      </v-menu>
      <a :href="loginUrl" style="text-decoration: none" v-else-if="!loading">
        <v-btn text> Sign In </v-btn>
      </a>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <router-link to="/" class="text-decoration-none">
            <v-list-item>
              <v-list-item-title>
                <v-icon left>mdi-magnify</v-icon>
                Search
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/tags" class="text-decoration-none">
            <v-list-item>
              <v-list-item-title>
                <v-icon left>mdi-tag-multiple</v-icon>
                Tags
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/create" class="text-decoration-none">
            <v-list-item>
              <v-list-item-title>
                <v-icon left>mdi-pencil</v-icon>
                Create
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/meta" class="text-decoration-none">
            <v-list-item>
              <v-list-item-title>
                <v-icon left>mdi-information-variant</v-icon>
                Meta
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  props: {
    signedIn: { type: Boolean, default: false },
    name: { type: String, default: "" },
    picture: { type: String, default: "" },
    loginUrl: { type: String, default: "" },
    loading: { type: Boolean, default: true },
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  mounted() {
    if (this.name.length > 15) {
      this.name = this.name.substring(0, 14);
    }
  },
};
</script>

<style></style>
