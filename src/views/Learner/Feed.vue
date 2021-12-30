<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <h1
            class="display-3 font-weight-medium my-3 hidden-sm-and-down"
            v-if="
              ($store.state.currentUser && $store.state.currentUser.type === 'learner') ||
              ($store.state.currentUser && $store.state.currentUser.type === 'admin')
            "
          >
            All courses
          </h1>
          <h1
            class="display-2 font-weight-medium my-5 hidden-md-and-up"
            v-if="
              ($store.state.currentUser && $store.state.currentUser.type === 'learner') ||
              ($store.state.currentUser && $store.state.currentUser.type === 'admin')
            "
          >
            All courses
          </h1>
          <h1
            class="display-3 font-weight-medium my-3 hidden-sm-and-down"
            v-if="$store.state.currentUser && $store.state.currentUser.type === 'instructor'"
          >
            My Courses
          </h1>
          <h1
            class="display-2 font-weight-medium my-5 hidden-md-and-up"
            v-if="$store.state.currentUser && $store.state.currentUser.type === 'instructor'"
          >
            My Courses
          </h1>
        </v-col>
        <v-col cols="8">
          <v-text-field
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
      <v-row
        align="center"
        justify="center"
        v-if="$store.state.currentUser && $store.state.currentUser.type === 'instructor'"
      >
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="#b8860b">
              <v-icon left> mdi-plus </v-icon>
              Create
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h2 font-weight-normal">New Course</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Course Name*"
                      placeholder="Course Name*"
                      outlined
                      required
                      dense
                      v-model="newCourse.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Course Description*"
                      placeholder="Course Description*"
                      outlined
                      required
                      dense
                      v-model="newCourse.description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="['Beginner', 'Intermediate', 'Advanced']"
                      label="Difficulty*"
                      required
                      outlined
                      dense
                      v-model="newCourse.difficulty"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" outlined @click="dialog = false"> Close </v-btn>
              <v-btn color="#b8860b" @click="createCourse()"> Create </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <course-card v-for="(course, i) in courses" :key="i" :course="course"></course-card>
    </v-container>
  </div>
</template>

<script>
import CourseCard from '../../components/course/CourseCard.vue';
import api from '@/api';

export default {
  data() {
    return {
      dialog: false,
      courses: [],
      newCourse: {
        name: '',
        description: '',
        difficulty: '',
      },
    };
  },
  mounted() {
    // If user is instuctor, get my courses
    if (this.$store.state.currentUser.type === 'instructor') {
      this.fetchMyCourse();
    } else {
      this.fetchAllCourses();
    }
  },
  methods: {
    fetchAllCourses() {
      api.fetchAllCourses().then((res) => {
        this.courses = res.data;
      });
    },
    fetchMyCourse() {
      api.fetchMyCourses().then((res) => {
        this.courses = res.data;
      });
    },
    createCourse() {
      api.createCourse(this.newCourse).then((res) => {
        this.dialog = false;
        this.$router.push({ path: `/course/${res.data.id}` });
        this.$store.state.snackbarMessage = 'Course created successfully';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'primary';
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem('userData')) {
      next({ name: 'login' });
    } else {
      next();
    }
  },
  components: { CourseCard },
};
</script>

<style></style>
