<template>
  <v-container fluid>
    <Loading v-if="loading"></Loading>
    <template v-else>
      <div class="text-overline my-6 text-center" v-if="!threads.length">
        No Threads at the moment
      </div>
      <div v-else>
        <v-row v-for="(thread, i) in threads" :key="i" no-gutters width="100%" class="mb-6">
          <v-col cols="12">
            <v-card class="border-left-thread mt-2 mb-5" flat color="#f1f2f4" outlined>
              <v-card-title>
                {{ thread.question.user.firstName }} {{ thread.question.user.lastName }}
              </v-card-title>
              <v-card-subtitle class="mt--1 text-h6">
                {{ `${thread.question.createdAt}`.split('T')[0] }}
              </v-card-subtitle>
              <v-card-text>
                {{ thread.question.text }}
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ml-2"
                  fab
                  small
                  outlined
                  icon
                  color="deep-purple"
                  @click="toggleReply(i)"
                >
                  <v-icon>mdi-reply</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Replies -->
          <v-col cols="10" offset="1">
            <v-form
              v-if="openReplies[i]"
              @submit="addThreadReply($event, `reply${i}`, i)"
              :ref="`reply${i}`"
            >
              <v-row no-gutters>
                <v-col cols="12">
                  <v-textarea
                    :rules="[(v) => !!v || 'Required']"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    color="deep-purple lighten-3"
                    label="Reply To Thread"
                    v-model="replyValues[i]"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="text-right mb-2">
                  <v-btn outlined color="deep-purple" type="submit">Add Reply</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-row v-for="(answer, j) in thread.answers" :key="j">
              <v-col cols="12" class="pa-0">
                <v-card class="border-left-answer mt-1" flat color="#f1f2f4" outlined>
                  <v-card-title class="font-weight-medium text-h4 mb-1">
                    {{ answer.user.firstName }} {{ answer.user.lastName }}
                  </v-card-title>
                  <v-card-subtitle class="text-h6">
                    {{ `${answer.createdAt}`.split('T')[0] }}
                  </v-card-subtitle>
                  <v-card-text>
                    {{ answer.text }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-form @submit="addThread" ref="thread" class="mt-8">
        <v-row no-gutters>
          <v-col cols="12">
            <v-textarea
              :rules="[(v) => !!v || 'Required']"
              outlined
              auto-grow
              color="deep-purple"
              label="Add a new Thread"
              v-model="newThread"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn outlined color="deep-purple" type="submit">Add Thread</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import Loading from '@/components/Loading.vue';
import api from '@/api';

export default {
  components: { Loading },
  data() {
    return {
      loading: false,
      threads: [],
      newThread: '',
      openReplies: [],
      replyValues: [],
    };
  },
  methods: {
    toggleReply(i) {
      if (
        this.openReplies[i] === null ||
        this.openReplies[i] === undefined ||
        this.openReplies[i] === false
      ) {
        this.openReplies[i] = true;
      } else {
        this.openReplies[i] = false;
      }
      this.openReplies = [...this.openReplies];
    },
    async getThreads(load) {
      if (load) {
        this.loading = true;
      }
      const { courseId } = this.$route.params;
      const request = await api.fetchCourseThreads(courseId);
      if (request.status === 'success') {
        this.threads = request.data;
        this.loading = false;
      }
    },
    async addThread(e) {
      e.preventDefault();
      if (!this.$refs.thread.validate()) {
        return;
      }

      const response = await api.createThread(this.$route.params.courseId, {
        question: this.newThread,
      });

      if (response.status === 'success') {
        // Alert User that it was created
        this.$store.state.snackbarMessage = 'Thread Added';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'success';

        // Reset Values
        this.$refs.thread.reset();

        // Get the threads again
        await this.getThreads(false);
      } else {
        // Alert User that it was failed
        this.$store.state.snackbarMessage = 'Failed to add Thread';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'error';
      }
    },
    async addThreadReply(e, formRef, index) {
      e.preventDefault();
      if (!this.$refs[formRef][0].validate()) {
        return;
      }

      const replyValue = this.$refs[formRef][0].$children[0].value;

      const response = await api.addThreadAnswer(this.threads[index]._id, {
        answer: replyValue,
      });

      if (response.status === 'success') {
        // Alert User that it was created
        this.$store.state.snackbarMessage = 'Reply Added';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'success';

        // Reset Values
        this.$refs[formRef][0].reset();
        this.toggleReply(index);

        // Get the threads again
        await this.getThreads(false);
      } else {
        // Alert User that it was failed
        this.$store.state.snackbarMessage = 'Failed to add Reply';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'error';
      }
    },
  },
  async mounted() {
    await this.getThreads(true);
  },
};
</script>

<style scoped>
.border-left-thread {
  border-left: 5px solid #3f3d56 !important;
  border-radius: 0px;
}
.border-left-answer {
  border-left: 4px solid #726f97 !important;
  border-radius: 0px;
}
</style>
