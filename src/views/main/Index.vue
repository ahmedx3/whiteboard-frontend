<template>
  <v-app dark>
    <NavigationBar />
    <v-main class="background">
      <v-fade-transition mode="out-in" :appear="true" :duration="200">
        <router-view></router-view>
      </v-fade-transition>
      <!-- SnackBar to show at success of fail -->
      <v-snackbar
        :value="true"
        centered
        top
        :color="$store.state.snackbarColor"
        elevation="24"
        v-model="$store.state.snackbar"
        :timeout="7000"
      >
        <div class="text-center text-h4">
          {{ $store.state.snackbarMessage }}
        </div>
      </v-snackbar>
    </v-main>
    <DashboardCoreFooter class="grey lighten-4" />
  </v-app>
</template>

<script>
import NavigationBar from '@/components/main/NavigationBar.vue';

export default {
  components: {
    NavigationBar,
    DashboardCoreFooter: () => import('../../components/core/Footer.vue'),
  },
  data: () => ({}),
};
</script>
