<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="9">
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(item, i) in activities"
            :key="i"
            :color="colors[item.type]"
            :icon="icons[item.type]"
            fill-dot
          >
            <v-card :color="colors[item.type]" dark>
              <v-card-title class="text-h3 center-horizontal py-3 px-4">
                {{ item.title }}
              </v-card-title>

              <v-card-text class="white text--primary pa-4 center-horizontal">
                <template v-if="item.type === 'PDF'">
                  <v-btn
                    :color="colors[item.type]"
                    class="mx-auto"
                    outlined
                    @click="downloadPDF(item)"
                    download
                  >
                    Download Pdf
                  </v-btn>
                </template>
                <template v-if="item.type === 'Quiz'">
                  <v-btn
                    :color="colors[item.type]"
                    class="mx-auto"
                    outlined
                    @click="chooseQuiz(item)"
                  >
                    Open Quiz
                  </v-btn>
                </template>
                <template v-if="item.type === 'Video'">
                  <div class="iframe-container">
                    <iframe
                      width="560"
                      height="315"
                      webkitallowfullscreen
                      mozallowfullscreen
                      allowfullscreen
                      :src="item.link.replace('watch?v=', 'embed/')"
                    ></iframe></div
                ></template>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <!-- Quiz Dialog -->
    <v-dialog :value="currentQuiz" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h2">Quiz</span>
        </v-card-title>

        <v-card-text v-if="grade"> Your grade is 10 </v-card-text>
        <v-card-text v-else>
          <v-container>
            <v-form ref="quiz">
              <v-row v-for="(entry, i) in currentQuiz" :key="i">
                <v-col cols="12" class="font-weight-light text-h3">
                  Question {{ i + 1 }} : {{ entry.question }}
                </v-col>
                <v-col cols="12 pt-0 pl-8">
                  <v-radio-group
                    v-model="currentQuizAnswers[i]"
                    column
                    class="mt-0"
                    :rules="[(v) => !!v || 'Answer Required']"
                  >
                    <v-radio v-for="(answer, j) in entry.answers" :key="j" :value="answer">
                      <template v-slot:label>
                        <div class="black--text text-h4">{{ answer }}</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green lighten-1" text @click="closeQuizModal(true)"> Save </v-btn>
          <v-btn color="blue-grey darken-1" text @click="closeQuizModal(false)"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from '@/api';

export default {
  props: {
    activities: [],
  },
  data: () => ({
    currentQuiz: null,
    grade: false,
    currentQuizAnswers: [],
    colors: {
      PDF: 'indigo lighten-2',
      Video: 'blue-grey',
      Quiz: 'teal lighten-3',
    },
    icons: {
      PDF: 'mdi-book-variant',
      Video: 'mdi-video',
      Quiz: 'mdi-pen',
    },
  }),
  methods: {
    chooseQuiz(item) {
      if (item);
      this.currentQuiz = [
        {
          question: 'This is a Question',
          answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        },
        {
          question: 'This is a Question',
          answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        },
        {
          question: 'This is a Question',
          answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        },
        {
          question: 'This is a Question',
          answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        },
      ];
    },
    closeQuizModal(save) {
      if (save) {
        if (!this.$refs.quiz.validate()) {
          return;
        }
        console.log(this.currentQuizAnswers);
      }
      // Reset Quiz data
      this.currentQuiz = null;
      this.currentQuizAnswers = [];
    },
    downloadPDF(item) {
      return api.downloadPDF(item.link);
    },
  },
};
</script>

<style scoped>
.center-horizontal {
  display: flex;
  justify-content: center;
}
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%; /* 16:9*/
  position: relative;
  width: 100%;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
