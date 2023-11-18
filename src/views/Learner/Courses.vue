<template>
  <div>
    <v-container>
      <!-- Page title -->
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
      </v-row>
      <!-- Create Course Dialog Modal -->
      <v-row
        align="center"
        justify="center"
        v-if="
          ($store.state.currentUser && $store.state.currentUser.type === 'instructor') ||
          ($store.state.currentUser && $store.state.currentUser.type === 'admin')
        "
      >
        <v-dialog v-model="dialog" max-width="600px">
          <!-- create course button -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="#b8860b">
              <v-icon left> mdi-plus </v-icon>
              Create Course
            </v-btn>
          </template>
          <!-- create course dialog details -->
          <v-card>
            <v-card-title>
              <span class="text-h2 font-weight-normal">New Course</span>
            </v-card-title>
            <v-card-text>
              <!-- create course form fields -->
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-form ref="form1">
                      <v-text-field
                        label="Course Name*"
                        placeholder="Course Name*"
                        outlined
                        :rules="rules.name"
                        dense
                        v-model="newCourse.name"
                      ></v-text-field>
                    </v-form>
                  </v-col>
                  <v-col cols="12">
                    <v-form ref="form2">
                      <v-text-field
                        label="Course Description*"
                        placeholder="Course Description*"
                        outlined
                        :rules="rules.name"
                        dense
                        v-model="newCourse.description"
                      ></v-text-field>
                    </v-form>
                  </v-col>
                  <v-col cols="12">
                    <v-form ref="form3">
                      <v-select
                        :items="['Beginner', 'Intermediate', 'Advanced']"
                        label="Difficulty*"
                        outlined
                        dense
                        :rules="rules.name"
                        v-model="newCourse.difficulty"
                      ></v-select>
                    </v-form>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <!-- create course form submit actions -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" outlined @click="dialog = false"> Close </v-btn>
              <v-btn color="#b8860b" @click="createCourse()"> Create </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Course Cards List -->
      <CourseBrowser :courses="courses"></CourseBrowser>
    </v-container>
  </div>
</template>

<script>
import CourseBrowser from '../../components/course/CourseBrowser.vue';
import api from '@/api';

export default {
  components: {
    CourseBrowser,
  },
  data() {
    return {
      dialog: false,
      courses: [],
      newCourse: {
        name: '',
        description: '',
        difficulty: '',
      },
      rules: {
        name: [(val) => (val || '').length > 0 || 'This field is required'],
      },
    };
  },
  mounted() {
    // log contents of store
    // console.log(`[/labs] JSON.stringify(this.$store.state) :
    // ${JSON.stringify(this.$store.state)}`);

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
        console.log(`[/labs] JSON.stringify(this.courses) :
        ${JSON.stringify(this.courses)}`);
      });
    },
    fetchMyCourse() {
      api.fetchMyCourses().then((res) => {
        this.courses = res.data;
      });
    },
    createCourse() {
      api.createCourse(this.newCourse).then((res) => {
        if (
          this.$refs.form1.validate() &&
          this.$refs.form2.validate() &&
          this.$refs.form3.validate()
        ) {
          this.dialog = false;
          this.$router.push({ path: `/course/${res.data.id}` });
          this.$store.state.snackbarMessage = 'Course created successfully';
          this.$store.state.snackbar = true;
          this.$store.state.snackbarColor = 'primary';
        }
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
};
</script>

<style></style>
