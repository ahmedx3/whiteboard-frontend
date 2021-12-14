<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <h1 class="display-3 font-weight-medium my-3 hidden-sm-and-down">All courses</h1>
          <h1 class="display-2 font-weight-medium my-5 hidden-md-and-up">All courses</h1>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="searchText"
            class="my-5"
            outlined
            label="Search for courses"
            append-icon="mdi-magnify"
            flat
            clearable
            dense
            background-color="white"
          ></v-text-field>
        </v-col>
      </v-row>
      <course-card v-for="x in 5" :key="x"></course-card>
    </v-container>
  </div>
</template>

<script>
import CourseCard from '../../components/course/CourseCard.vue';

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: { CourseCard },
};
</script>

<style></style>
