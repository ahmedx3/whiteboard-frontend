<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" class="pa-0 mt-5">
        <!-- Course Activities -->
        <v-timeline align-top dense>
          <!-- activity list -->
          <v-timeline-item
            v-for="(item, i) in activities"
            :key="i"
            :color="colors[item.type]"
            :icon="icons[item.type]"
            fill-dot
          >
            <!-- activity card -->
            <v-card :color="colors[item.type]" dark>
              <!-- activity title -->
              <v-card-title class="text-h2 py-3 px-4">
                {{ `${i+1}. ` + item.title }}
              </v-card-title>
              <!-- activity details -->
              <v-card-text class="white text--primary pa-4 center-horizontal">
                <!-- PDF activity -->
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
                <!-- Quiz activity -->
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
                <!-- Video Activity -->
                <template v-if="item.type === 'Video'">
                  <div class="iframe-container">
                    <iframe
                      width="560"
                      height="315"
                      webkitallowfullscreen
                      mozallowfullscreen
                      allowfullscreen
                      :src="item.link.replace('watch?v=', 'embed/')"
                    ></iframe>
                  </div>
                </template>
                <!-- Unity activity -->
                <template v-if="item.type === 'Unity'">
                  <!-- Start Lab button -->
                  <v-btn v-if="!unityGame"
                    class="mx-auto"
                    :color="colors[item.type]"
                    outlined
                    @click="loadLab(item)"
                  >
                    {{ !unityGame ? 'Start Lab' : 'Close Lab'}}
                  </v-btn>
                  <!-- Progress Counter (while loading) -->
                  <div v-if="unityGameLoadingProgress && unityGameLoadingProgress < 1"
                    class="mx-auto"
                    >
                    <div class="text-center text-h1">
                      {{ Math.floor(unityGameLoadingProgress * 100) }} %
                    </div>
                  </div>
                  <!-- Unity Game -->
                  <div>
                    <!-- unity-webgl component (doesn't work) -->
                    <!-- <UnityVue :unity="unityGame" /> -->
                    <!-- canvas element for unity-webgl -->
                    <canvas
                      width=1920
                      height=1080
                      style="width: 100%; height: auto;"
                      :style="unityGameCanvasStyle"
                      :id="unityGameCanvasID">
                    </canvas>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <!-- Quiz Dialog -->
    <v-dialog v-if="currentQuiz" :value="currentQuiz" persistent max-width="600px">
      <v-card>
        <Loading v-if="quizLoading" :size="50" type="small"></Loading>
        <template v-else>
          <v-card-title>
            <span class="text-h2">Quiz: {{ currentQuiz.title }}</span>
          </v-card-title>

          <v-card-text v-if="grade != null && user.type != 'instructor'" class="my-6">
            <div class="text-h4 text-center">Your Grade is</div>
            <div class="text-h3 text-center">{{ grade }} / {{ currentQuiz.mcqs.length }}</div>
          </v-card-text>
          <v-card-text v-else>
            <v-container>
              <v-form ref="quiz">
                <v-row v-for="(entry, i) in currentQuiz.mcqs" :key="i">
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
                      <v-radio v-for="(answer, j) in entry.options" :key="j" :value="answer">
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
            <v-btn
              color="green lighten-1"
              v-if="grade == null && user.type !== 'instructor'"
              text
              @click="closeQuizModal(true)"
            >
              Save
            </v-btn>
            <v-btn
              color="green lighten-1"
              v-if="grade != null && user.type !== 'instructor'"
              text
              @click="grade = null"
            >
              Retake
            </v-btn>
            <v-btn color="blue-grey darken-1" text @click="closeQuizModal(false)"> Close </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import UnityWebgl from 'unity-webgl';
// import UnityVue from 'unity-webgl/vue';
import Loading from '@/components/Loading.vue';
import api from '@/api';

export default {
  name: 'CourseContent',
  components: {
    Loading,
    // UnityVue,
  },
  props: {
    activities: [],
  },
  data: () => ({
    currentQuiz: null,
    grade: null,
    quizLoading: false,
    currentQuizAnswers: [],
    user: null,
    unityGame: null,
    unityGameLoadingProgress: null,
    unityGameCanvasID: 'unity-canvas',
    unityGameCanvas: null,
    colors: {
      PDF: 'indigo lighten-2',
      Video: 'blue-grey',
      Quiz: 'teal lighten-3',
      Unity: 'blue-grey',
    },
    icons: {
      PDF: 'mdi-book-variant',
      Video: 'mdi-video',
      Quiz: 'mdi-pen',
      Unity: 'mdi-gamepad-variant',
    },
  }),
  computed: {
    unityGameCanvasStyle() {
      const displayStyle = this.unityGameLoadingProgress < 1 ? 'none' : 'block';
      return {
        display: displayStyle,
      };
    },
  },
  methods: {
    chooseQuiz(item) {
      this.currentQuiz = item;
      this.grade = item.grades.length ? item.grades[item.grades.length - 1].grade : null;
    },
    async closeQuizModal(save) {
      if (save) {
        if (!this.$refs.quiz.validate()) {
          return;
        }

        // Set Loading to true
        this.quizLoading = true;

        // Send Request
        const response = await api.submitQuiz(this.currentQuiz._id, {
          answers: this.currentQuizAnswers,
        });

        if (response.status === 'success') {
          this.quizLoading = false;
          this.grade = response.data.grade;
          this.currentQuizAnswers = [];
        } else {
          // Alert User that it was failed
          this.$store.state.snackbarMessage = 'An error occured';
          this.$store.state.snackbar = true;
          this.$store.state.snackbarColor = 'error';
        }

        // Get content again
        this.$emit('refetch');
      } else {
        // Reset Quiz data
        this.currentQuiz = null;
        this.currentQuizAnswers = [];
        this.quizLoading = false;
        this.grade = null;
      }
    },
    async downloadPDF(item) {
      await api.downloadPDF(item.link);
    },
    /**
     * unload already an loaded unity-webgl instance if
     * already present in {@link CourseContent#unityGame}
     */
    unloadLab() {
      if (this.unityGame) {
        this.unityGame.unload()
          .then(() => {
            console.log('unloading unity-webgl instance');
          })
          .catch(() => console.log('unable to unload unity-webgl instance'))
          .finally(() => {
            this.unityGame = null;
          });
      }
    },
    /**
     * Load a unity game as a UnityWebgl object and set it to the
     * {@link CourseContent#unityGame} property
     * @param {object} item object representing a course activity with properties for
     *  each url to load the unity game
     */
    loadLab(item) {
      // unload lab if already loaded
      this.unloadLab();

      // get unity game asset urls for this activity
      const {
        loaderUrl,
        dataUrl,
        frameworkUrl,
        codeUrl,
      } = item;

      // create unity-webgl instance
      this.unityGame = new UnityWebgl({
        loaderUrl,
        dataUrl,
        frameworkUrl,
        codeUrl,
      });
      // reset loading progress
      this.unityGameLoadingProgress = null;
      // subscribe to progress event and update loading progress
      this.unityGame
        .on('progress', (percent) => {
          this.unityGameLoadingProgress = percent;
          console.log(`Unity progress: ${this.unityGameLoadingProgress}`);
        })
        .on('loaded', (percent) => console.log(`Unity loaded: success ${percent}`))
        .on('created', (percent) => console.log(`Unity created: success ${percent}`));
      // .on('device', () => alert('click device ...'));

      // manually mount unity webgl instance to existing canvas
      this.unityGameCanvas = document.getElementById(this.unityGameCanvasID);
      this.unityGame.create(this.unityGameCanvas);
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('userData'));
  },
  destroyed() {
    this.unloadLab();
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
