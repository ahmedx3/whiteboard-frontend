<template>
  <div class="single-course-container">
    <!--loader Until request finishes-->
    <Loading v-if="loading"></Loading>

    <!--Single Course Page After Fetching Data-->
    <template v-else>
      <!--Name and Intro section-->
      <v-container fluid class="IntroSection pt-0 pb-0">
        <v-container class="new-container">
          <v-row justify="center" class="mt-5 mb-3">
            <v-col
              :class="{
                'col-4': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'px-10': $vuetify.breakpoint.smAndUp,
              }"
            >
              <v-img :src="image"></v-img>
            </v-col>
            <v-col
              :class="{
                'col-8': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'px-10': $vuetify.breakpoint.smAndUp,
              }"
              class="white--text"
            >
              <v-row>
                <v-col cols="auto">
                  <h2
                    :class="{
                      'mt-5': $vuetify.breakpoint.smAndUp,
                      'mt-0': $vuetify.breakpoint.xs,
                    }"
                    class="font-weight-medium mb-3 text-h1"
                  >
                    {{ course.name }}
                  </h2>
                </v-col>

                <v-col cols="3" class="align-bottom">
                  <div class="text-body font-weight-light mb-3">
                    Created By
                    <span class="text-body white--text font-weight-black mb-3">{{
                      course.instructor
                    }}</span>
                  </div>
                </v-col>
              </v-row>
              <div
                :class="{
                  'text-h4': $vuetify.breakpoint.smAndUp,
                  'text-subtitle-1': $vuetify.breakpoint.xs,
                }"
                class="font-weight-light mb-3 mt-6"
              >
                {{ course.summary }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Content Tabs -->
      <v-tabs centered dark background-color="#3f3d56" v-model="currentTab" fixed-tabs>
        <v-tab key="0">Content</v-tab>
        <v-tab key="1">Threads</v-tab>
        <v-tab key="2" v-if="ownsCourse">Add Activity</v-tab>
      </v-tabs>

      <!-- Content -->

      <v-container class="new-container py-8">
        <template v-if="currentTab == 0">
          <div class="text-h1 text-center">Course Content</div>
          <CourseContent />
        </template>
        <template v-else-if="currentTab == 1">
          <div class="text-h1 text-center">Threads</div>
        </template>
        <template v-else-if="currentTab == 2">
          <div class="text-h1 text-center">Create Activity</div>
          <CreateActivity />
        </template>
      </v-container>
    </template>

    <!--Footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import CourseContent from '@/components/course/courseContent.vue';
import CreateActivity from '@/components/course/createActivity.vue';
import img1 from '@/assets/course_1.svg';
import img2 from '@/assets/course_2.svg';
import img3 from '@/assets/course_3.svg';

export default {
  components: { Loading, CourseContent, CreateActivity },
  data() {
    return {
      loading: true,
      course: null,
      image: null,
      currentTab: null,
      ownsCourse: true,
    };
  },
  computed: {},
  methods: {
    initializeImage() {
      this.image = img2;
      this.image = img3;
      this.image = img1;
    },
  },
  async created() {
    this.initializeImage();
    this.course = {
      name: 'A Very Big Title',
      summary:
        'This is a test summary until the real summary for the course is put here, Please read this summary very well before starting the course.',
      instructor: 'John Doe',
      date: '1/1/2022',
    };
    this.loading = false;
  },
};
</script>

<style scoped>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%; /* 16:9*/
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.border-small {
  border: 1px solid #000;
}
.IntroSection {
  background-color: #3f3d56;
  opacity: 0.95;
}

.align-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
