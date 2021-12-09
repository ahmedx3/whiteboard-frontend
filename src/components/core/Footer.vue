<template>
  <v-footer id="dashboard-core-footer" height="80">
    <v-container>
      <v-row align="center" no-gutters>
        <v-col v-for="(link, i) in links" :key="i" class="text-center mb-sm-0 mb-5" cols="auto">
          <a
            :href="link.href"
            class="ma-5 grey--text text--darken-3"
            rel="noopener"
            v-text="link.text"
          />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col cols="12" md="auto">
          <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
            Made for a College Project &copy; 2022
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'DashboardCoreFooter',

  data: () => ({
    links: [],
  }),
};
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
