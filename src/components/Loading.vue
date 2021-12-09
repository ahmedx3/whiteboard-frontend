<template>
  <div>
    <v-row dense justify="center" class="pa-10" v-if="type === 'content'">
      <v-col cols="10">
        <v-skeleton-loader type="card-avatar,image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row dense justify="center" class="pa-10" v-else-if="type === 'list'">
      <v-col cols="10">
        <v-skeleton-loader
          type="list-item-avatar-two-line,list-item-avatar-two-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-container v-else class="cover">
      <v-progress-circular :size="300" color="blue darken-3" indeterminate></v-progress-circular>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
};
</script>

<style scoped>
.cover {
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
