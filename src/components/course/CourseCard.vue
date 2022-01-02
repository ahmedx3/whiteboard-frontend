<template>
  <div>
    <v-card max-width="992" class="center my-6 pa-10" elevation="2" :to="'/course/' + course._id">
      <v-container>
        <v-row>
          <v-col class="pa-0">
            <v-chip
              color="#f1e9f5"
              text-color="#2e3d54"
              filter
              pill
              v-if="course.difficulty == 'Beginner'"
              >Beginner</v-chip
            >
            <v-chip
              color="#E5F1F5"
              text-color="#017a9b"
              filter
              pill
              v-if="course.difficulty == 'Intermediate'"
              >Intermediate</v-chip
            >
            <v-chip
              color="#E7F3ED"
              text-color="#0f854a"
              filter
              pill
              v-if="course.difficulty == 'Advanced'"
              >Advanced</v-chip
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 mt-3">
            <h1 class="font-weight-medium">{{ course.name }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0">
            <h1 class="text-caption font-weight-bold">
              By {{ course.instructor.firstName }} {{ course.instructor.lastName }}
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 my-6">
            <p class="text-body-1">
              {{ course.description }}
            </p>
          </v-col>
          <v-col class="display-flex hidden-sm-and-down">
            <v-btn large color="#3f3d56">Learn More</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pa-0 mt-6 hidden-md-and-up">
            <v-btn large color="#3f3d56" block>Learn More</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.center {
  margin: auto;
  padding: 10px;
}

.v-chip__content {
  font-size: 1em;
  font-weight: bold;
}

.v-rating {
  float: right;
}

.display-flex {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
