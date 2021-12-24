<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary color="topbar">
      <template v-if="$store.state.currentUser !== null">
        <v-list dense nav style="list-style: none" class="mt-3 mb-3 text-center">
          <li class="text-center">
            <v-avatar class="align-self-center" height="100" width="110">
              <v-icon size="50" color="white">mdi-human-child</v-icon>
            </v-avatar>
          </li>
          <li class="text-center text-h3 white--text">
            {{ $store.state.currentUser.firstName }}
          </li>
          <v-list-item
            class="mt-2"
            to="myprofile"
            v-if="$store.state.currentUser && $store.state.currentUser.type === 'learner'"
          >
            <v-list-item-title class="text-subtitle-1 font-weight-light white--text text-center">
              <v-icon color="white" class="mr-5">mdi-account-details</v-icon> My Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logOut" class="mt-2">
            <v-list-item-title class="text-subtitle-1 font-weight-light white--text text-center">
              <v-icon color="white" class="mr-5">mdi-login-variant</v-icon> Log out
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <v-list expand color="topbar" class="mt-5">
        <template v-if="$store.state.currentUser === null">
          <v-list-item v-for="(item, i) in links" class="white--text" :key="i" :to="item.to">
            <v-list-item-title class="text-subtitle-1 font-weight-light white--text text-center">
              <v-icon color="white" class="mr-5">{{ item.icon }}</v-icon> {{ item.title }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="white--text" to="/login">
            <v-list-item-title class="text-subtitle-1 font-weight-light white--text text-center">
              <v-icon color="white" class="mr-5">mdi-login</v-icon> Login
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="white--text" to="/register">
            <v-list-item-title class="text-subtitle-1 font-weight-light white--text text-center">
              <v-icon color="white" class="mr-5">mdi-pencil</v-icon> Register
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="topbar" flat height="70">
      <v-container class="fill-height pa-0">
        <v-row no-gutters justify="space-between" align="center">
          <v-col
            :class="{
              'col-auto': $vuetify.breakpoint.mdAndUp,
              'col-4': $vuetify.breakpoint.sm,
              'col-2': $vuetify.breakpoint.xs,
            }"
            v-if="$vuetify.breakpoint.smAndDown"
          >
            <v-btn icon @click="drawer = !drawer" text color="topbar"
              ><v-icon color="white">mdi-menu</v-icon></v-btn
            >
          </v-col>
          <v-col
            :class="{
              'col-auto': $vuetify.breakpoint.mdAndUp,
              'col-2': $vuetify.breakpoint.smAndDown,
              'pa-1': $vuetify.breakpoint.smAndDown,
              'mx-5': $vuetify.breakpoint.smAndDown,
            }"
          >
            <router-link to="/">
              <v-avatar size="60" tile>
                <v-img height="45" src="@/assets/logo.png"></v-img>
              </v-avatar>
            </router-link>
          </v-col>

          <!-- Register Button & and User menu-->
          <v-col
            cols="auto"
            class="center-horizontally center-vertically"
            v-if="$vuetify.breakpoint.mdAndUp"
          >
            <template v-if="$store.state.currentUser === null">
              <v-btn
                width="150"
                x-large
                rounded
                to="/register"
                class="text-none text-h4"
                color="green accent-4"
              >
                Register
              </v-btn>
              <v-btn x-large rounded outlined to="/login" class="text-none text-h4" color="white">
                Login
              </v-btn>
            </template>
            <v-menu v-else offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="white" outlined v-on="on" class="text-none pl-2 pr-2" x-large
                  ><v-avatar size="30" class="mr-1 ml-0">
                    <v-icon color="white">mdi-human-child</v-icon>
                  </v-avatar>
                  <v-spacer></v-spacer>
                  <div class="mr-5 ml-5 text-subtitle-1 font-weight-medium">
                    {{ $store.state.currentUser.firstName || 'John Doe' }}
                  </div>
                  <v-spacer></v-spacer>
                  <v-avatar size="20" class="mx-1">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-avatar>
                </v-btn>
              </template>

              <v-list dense color="topbar">
                <v-list-item
                  to="myprofile"
                  v-if="$store.state.currentUser && $store.state.currentUser.type === 'learner'"
                >
                  <v-list-item-title class="text-subtitle-1 font-weight-light white--text">
                    My Profile
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="logOut">
                  <v-list-item-title class="text-subtitle-1 font-weight-light white--text">
                    Log out
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: 'Home',
        to: '/',
        icon: 'mdi-home',
      },
    ],
    drawer: false,
  }),
  methods: {
    logOut() {
      localStorage.removeItem('userData');
      localStorage.removeItem('userToken');
      this.$store.state.currentUser = null;
      if (this.$route.name !== 'Home') {
        this.$router.push('/');
      }
    },
  },
  created() {
    this.$store.state.currentUser = JSON.parse(localStorage.getItem('userData'));
  },
};
</script>
