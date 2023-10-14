<template>
  <div style="background-color: white">
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-container class="new-container">
        <v-row dense align="center">
          <v-col cols="12" class="center-horizontal">
            <h1
              class="font-weight-bold mb-5 text-center"
              :class="{
                'text-h1': $vuetify.breakpoint.xs,
                'text-h1': $vuetify.breakpoint.sm,
                'text-large': $vuetify.breakpoint.mdAndUp,
              }"
            >
              Your Successful Future Awaits
            </h1>
            <p
              class="mb-10"
              :class="{
                'text-h4': $vuetify.breakpoint.xs,
                'text-h3': $vuetify.breakpoint.sm,
                'text-h3': $vuetify.breakpoint.mdAndUp,
              }"
            >
              What are you waiting for?
            </p>
            <v-btn
              rounded
              color="white"
              class="font-weight-medium text-none"
              x-large
              to="/register"
              :class="{
                'text-subtitle-1': $vuetify.breakpoint.xs,
                'text-h6': $vuetify.breakpoint.sm,
                'text-h5': $vuetify.breakpoint.mdAndUp,
              }"
              outlined
              >Get Started</v-btn
            >
          </v-col>
          <v-col cols="12" class="center-horizontal mt-5"
            ><v-btn color="white" text @click="scrollto('success-section', 'mycourses-section')"
              ><v-icon size="40" color="white">mdi-chevron-triple-down</v-icon></v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-container>

    <!--Join Now Section-->
    <v-container
      id="success-section"
      class="new-container"
      :class="{
        'mb-0': $vuetify.breakpoint.smAndDown,
        'mt-0': $vuetify.breakpoint.smAndDown,
        'pb-5': $vuetify.breakpoint.mdAndUp,
        'pt-5': $vuetify.breakpoint.mdAndUp,
      }"
    >
      <v-row
        class="mt-10 mb-10"
        :class="{
          'mb-1': $vuetify.breakpoint.smAndDown,
          'mt-1': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-col
          md="6"
          sm="12"
          class="center-vertical"
          :class="{
            'center-horizontal': $vuetify.breakpoint.smAndDown,
            'pr-3': $vuetify.breakpoint.smAndDown,
            'pr-16': $vuetify.breakpoint.mdAndUp,
          }"
        >
          <h2
            class="mb-10 mt-10 font-weight-bold"
            :class="{
              'text-h3': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-h2': $vuetify.breakpoint.md,
              'text-large': $vuetify.breakpoint.lgAndUp,
            }"
          >
            Join the largest educational website
          </h2>
          <p
            class="mb-5 mt-5 font-weight-light"
            :class="{
              'text-subtitle-1': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-h3': $vuetify.breakpoint.mdAndUp,
            }"
          >
            Find great instructors. Enrich your knowlage. Take your future to the next level.
          </p>
          <v-btn
            x-large
            width="200"
            height="80"
            to="/register"
            color="primary"
            class="white--text mb-10 text-h4"
            outlined
            :class="{
              'text-subtitle-1': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
            }"
          >
            Join now
          </v-btn>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" md="6">
          <v-img height="500" src="../../assets/teacher.svg" class="rounded-img"></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!--Goals Section-->
    <v-container fluid class="goals-section pt-10 pb-10">
      <v-container class="new-container">
        <v-row
          justify="center"
          align="center"
          class="mt-3"
          :class="{
            'mb-5': $vuetify.breakpoint.xs,
          }"
        >
          <v-col
            ><h2
              class="text-center font-weight-bold"
              :class="{
                'text-h3': $vuetify.breakpoint.smAndDown,
                'text-large': $vuetify.breakpoint.mdAndUp,
              }"
            >
              A great place to learn
            </h2></v-col
          >
        </v-row>
        <v-row>
          <v-col md="3" sm="6" cols="12">
            <v-card color="rgb(245, 245, 245)" elevation="0" class="text-center pa-5">
              <v-icon size="60" color="primary" class="mb-8">mdi-note-edit</v-icon>
              <h3 class="mb-3 text-h4 font-weight-light">
                Take your quizes online and know your results immediately.
              </h3>
            </v-card>
          </v-col>

          <v-col md="3" sm="6" cols="12">
            <v-card color="rgb(245, 245, 245)" elevation="0" class="text-center pa-5">
              <v-icon size="60" color="primary" class="mb-8">mdi-youtube</v-icon>
              <h3 class="mb-3 text-h4 font-weight-light">
                Watch youtube videos and learn from the best.
              </h3>
            </v-card>
          </v-col>

          <v-col md="3" sm="6" cols="12">
            <v-card color="rgb(245, 245, 245)" elevation="0" class="text-center pa-5">
              <v-icon size="60" color="primary" class="mb-8">mdi-account-question</v-icon>
              <h3 class="mb-3 text-h4 font-weight-light">
                Ask questions and have answers from your instructors.
              </h3>
            </v-card>
          </v-col>

          <v-col md="3" sm="6" cols="12">
            <v-card color="rgb(245, 245, 245)" elevation="0" class="text-center pa-5">
              <v-icon size="60" color="primary" class="mb-8">mdi-lightbulb</v-icon>
              <h3 class="mb-3 text-h4 font-weight-light">Explore different ways to learn</h3>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              x-large
              width="200"
              height="80"
              to="/register"
              color="primary"
              class="white--text text-h4"
              outlined
              :class="{
                'text-subtitle-1': $vuetify.breakpoint.smAndDown,
                'text-center': $vuetify.breakpoint.smAndDown,
              }"
            >
              Start now
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!--Accesible Section-->
    <v-container
      class="new-container"
      :class="{
        'mb-0': $vuetify.breakpoint.smAndDown,
        'mt-0': $vuetify.breakpoint.smAndDown,
        'pb-5': $vuetify.breakpoint.mdAndUp,
        'pt-5': $vuetify.breakpoint.mdAndUp,
      }"
    >
      <v-row
        class="mt-3 mb-3 accessible-section"
        :class="{
          'mb-1': $vuetify.breakpoint.smAndDown,
          'mt-1': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-col
          :class="{
            'col-12': $vuetify.breakpoint.smAndDown,
            'col-6': $vuetify.breakpoint.mdAndUp,
          }"
        >
          <v-row
            class="circles-container center-horizontally"
            :class="{
              'ma-10': $vuetify.breakpoint.lgAndUp,
            }"
          >
            <div id="circle-one-outer">
              <div id="circle-one-inner" class="center-horizontal text-center">
                <div class="text-h2">10000+</div>
                <div class="text-h4">Instructors Enrolled</div>
              </div>
            </div>
            <div id="circle-two-outer">
              <div id="circle-two-inner" class="center-horizontal text-center">
                <div class="text-h2">70+</div>
                <div class="text-h4">Quizes</div>
              </div>
            </div>
            <div id="circle-three-outer">
              <div id="circle-three-inner" class="center-horizontal text-center">
                <div class="text-h2">50+</div>
                <div class="text-h4">Categories</div>
              </div>
            </div>
          </v-row>
        </v-col>
        <v-col
          class="center-vertical"
          :class="{
            'col-12': $vuetify.breakpoint.smAndDown,
            'col-6': $vuetify.breakpoint.mdAndUp,
            'center-horizontal': $vuetify.breakpoint.smAndDown,
            'pa-10': $vuetify.breakpoint.smAndDown,
            'pr-16': $vuetify.breakpoint.mdAndUp,
          }"
        >
          <h2
            class="mb-10 mt-10 font-weight-bold"
            :class="{
              'text-h3': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-large': $vuetify.breakpoint.mdAndUp,
            }"
          >
            Join us now
          </h2>
          <p
            class="text-h3 mb-5 mt-5 font-weight-light"
            :class="{
              'text-h4': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
            }"
          >
            Whatever skill level you have, we have the right course for you.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    scrollto(el, secondaryel) {
      const bodyRect = document.body.getBoundingClientRect().top;
      let element = document.getElementById(el);
      if (element == null) element = document.getElementById(secondaryel);
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData == null) {
      next();
    } else {
      next('/labs');
    }
  },
  computed: {},
  data: () => ({}),
};
</script>

<style scoped>
.courses-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  margin-top: 30px;
}
.courses-container {
  background-color: rgb(245, 245, 245);
}
.hero-container {
  background: url(../../assets/img-home.jpg) center center/cover no-repeat;
  height: calc(100vh - 70px);
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-horizontally {
  text-align: center;
  margin: auto;
}
.center-horizontal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-large {
  font-size: 5.5rem;
  line-height: 5.5rem;
}
.center-horizontally {
  text-align: center;
  margin: auto;
}
.center-horizontal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-large {
  font-size: 5.5rem;
  line-height: 5.5rem;
}
.goals-section {
  background-color: rgb(245, 245, 245);
}
.circles-container {
  position: relative;
  overflow: hidden;
  height: 400px;
  max-width: 500px;
}
#circle-one-outer {
  position: absolute;
  top: 0;
  left: 50%;
}
#circle-one-inner {
  position: relative;
  left: -50%;
  border: 5px solid #546e7a;
  color: #546e7a;
  font-size: 32px;
  font-weight: 500;
  border-radius: 50%;
  width: 270px;
  height: 270px;
  z-index: 2;
  background-color: #ffffff;
}
#circle-two-outer {
  position: absolute;
  bottom: 0;
  left: 25%;
}
#circle-two-inner {
  position: relative;
  left: -50%;
  border: 5px solid #546e7a;
  color: #546e7a;
  font-size: 26px;
  font-weight: 500;
  border-radius: 50%;
  width: 230px;
  height: 230px;
  z-index: 1;
  background-color: #ffffff;
}
#circle-three-outer {
  position: absolute;
  bottom: 5%;
  left: 75%;
}
#circle-three-inner {
  position: relative;
  left: -50%;
  border: 5px solid #546e7a;
  color: #546e7a;
  font-size: 22px;
  font-weight: 500;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  z-index: 3;
  background-color: #ffffff;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
@media (max-width: 600px) {
  .circles-container {
    height: auto;
    max-width: 500px;
    display: flex;
    justify-content: center;
  }
  #circle-one-outer {
    position: static;
    margin-bottom: 5px;
  }
  #circle-one-inner {
    position: static;
    width: 220px;
    height: 220px;
  }
  #circle-two-outer {
    position: static;
    margin-bottom: 5px;
  }
  #circle-two-inner {
    position: static;
    width: 220px;
    height: 220px;
  }
  #circle-three-inner {
    position: static;
    width: 220px;
    height: 220px;
  }
  #circle-three-outer {
    position: static;
  }
}
</style>
