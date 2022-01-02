<template>
  <v-card>
    <v-tabs color="#3f3d56" :vertical="!$vuetify.breakpoint.xs">
      <v-tab>
        <v-icon left> mdi-book-variant </v-icon>
        Upload PDF
      </v-tab>
      <v-tab>
        <v-icon left> mdi-video </v-icon>
        Add Video Link
      </v-tab>
      <v-tab>
        <v-icon left> mdi-pen </v-icon>
        Create Quiz
      </v-tab>

      <v-tab-item class="px-3">
        <v-card flat>
          <v-card-text>
            <v-form ref="pdf">
              <v-text-field
                color="deep-purple"
                label="Title"
                v-model="pdfName"
                :rules="[(v) => !!v || 'Title Required']"
                class="mb-3"
              >
              </v-text-field>
              <v-file-input
                v-model="file"
                color="deep-purple accent-4"
                label="PDF"
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                accept="application/pdf"
                hint="Only Accepts PDF files"
                persistent-hint
                :show-size="1000"
                :rules="[(v) => !!v || 'File Required']"
              >
                <template v-slot:selection="{ text }">
                  <v-chip color="deep-purple accent-4" dark label small>
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-form>
            <v-row justify="center">
              <v-btn
                class="mx-2 my-4"
                fab
                dark
                small
                color="deep-purple accent-4"
                @click="uploadPDF"
              >
                <v-icon dark> mdi-upload </v-icon>
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item class="px-5">
        <v-card flat>
          <v-form ref="video">
            <v-text-field
              color="deep-purple"
              label="Title"
              v-model="videoName"
              :rules="[(v) => !!v || 'Title Required']"
            >
            </v-text-field>
            <v-text-field
              color="deep-purple"
              label="Video Embed Link"
              hint="Example: https://www.youtube.com/embed/YzeRik5yEBY"
              persistent-hint
              v-model="video"
              :rules="[(v) => !!v || 'Link Required']"
            >
            </v-text-field>
          </v-form>
          <v-row justify="center">
            <v-btn
              class="mx-2 my-4"
              fab
              dark
              small
              color="deep-purple accent-4"
              @click="uploadVideo"
            >
              <v-icon dark> mdi-upload </v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="text-center text-h3"> New Quiz</v-col>
            </v-row>

            <v-form ref="quiz" lazy-validation>
              <v-row class="mx-5">
                <v-col cols="12">
                  <v-text-field
                    color="deep-purple"
                    label="Quiz Name"
                    v-model="quiz.name"
                    :rules="[(v) => !!v || 'Required']"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row class="mx-5" :key="i" v-for="(question, i) in quiz.questions">
                <v-col cols="12">
                  <v-text-field
                    color="deep-purple"
                    :label="`Question ${i + 1}`"
                    v-model="question.question"
                    outlined
                    :rules="[(v) => !!v || 'Required']"
                    @click:append-outer="removeQuestion(i)"
                    :append-outer-icon="
                      i === 0 && quiz.questions.length === 1 ? '' : 'mdi-minus-circle'
                    "
                  >
                  </v-text-field>
                  <v-select
                    color="deep-purple"
                    label="Correct Choice"
                    :items="[1, 2, 3, 4]"
                    v-model="question.correctAns"
                    :rules="[(v) => !!v || 'Required']"
                  >
                  </v-select>
                  <v-text-field
                    v-for="j in 4"
                    :key="j"
                    color="deep-purple"
                    :label="`Answer ${j}`"
                    v-model="question.options[j - 1]"
                    :rules="[(v) => !!v || 'Required']"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-row class="mb-6">
              <v-col cols="12" class="text-center">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="deep-purple accent-4"
                  @click="addQuestion"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn class="mx-2" outlined dark color="deep-purple accent-4" @click="addQuiz">
                Add Quiz
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      file: null,
      pdfName: null,
      video: null,
      videoName: null,
      quiz: {
        name: null,
        questions: [
          {
            question: null,
            options: [],
            correctAns: null,
          },
        ],
      },
    };
  },
  methods: {
    async uploadPDF() {
      if (!this.$refs.pdf.validate()) {
        return;
      }
      const response = await api.addPDFtoCourse(this.$route.params.courseId, {
        title: this.pdfName,
        pdf: this.file,
      });

      if (response.status === 'success') {
        // Alert User that it was created
        this.$store.state.snackbarMessage = 'PDF Added to Content';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'success';

        // Fetch the course again
        this.$emit('refetch');

        //   Reset Values
        this.file = null;
        this.pdfName = null;
      } else {
        // Alert User that it was failed
        this.$store.state.snackbarMessage = 'Failed to add PDF';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'error';
      }
    },
    async uploadVideo() {
      if (!this.$refs.video.validate()) {
        return;
      }
      //   Upload
      const response = await api.addVideotoCourse(this.$route.params.courseId, {
        title: this.videoName,
        link: this.video,
      });

      if (response.status === 'success') {
        // Alert User that it was created
        this.$store.state.snackbarMessage = 'Video Added to Content';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'success';

        // Fetch the course again
        this.$emit('refetch');

        // Reset Values
        this.video = null;
        this.videoName = null;
      } else {
        // Alert User that it was failed
        this.$store.state.snackbarMessage = 'Failed to add Video';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'error';
      }
    },
    addQuestion() {
      this.quiz.questions.push({
        question: null,
        options: [],
        correctAns: null,
      });
    },
    removeQuestion(index) {
      this.quiz.questions.splice(index, 1);
    },
    async addQuiz() {
      if (!this.$refs.quiz.validate()) {
        return;
      }
      //   Upload
      const response = await api.addQuiztoCourse(this.$route.params.courseId, {
        title: this.quiz.name,
        mcqs: this.quiz.questions.map((question) => ({
          ...question,
          correctAns: question.options[question.correctAns - 1],
        })),
      });

      if (response.status === 'success') {
        // Alert User that it was created
        this.$store.state.snackbarMessage = 'Quiz Added to Content';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'success';

        // Fetch the course again
        this.$emit('refetch');

        // Reset Values
        this.quiz = {
          name: null,
          questions: [
            {
              question: null,
              options: [],
              correctAns: null,
            },
          ],
        };
      } else {
        // Alert User that it was failed
        this.$store.state.snackbarMessage = 'Failed to add Quiz';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'error';
      }
    },
  },
};
</script>

<style></style>
