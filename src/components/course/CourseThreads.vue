<template>
  <v-container fluid>
    <div class="text-overline my-6 text-center" v-if="!threads.length">
      No Threads at the moment
    </div>
    <div v-else>
      <v-row v-for="(thread, i) in threads" :key="i" no-gutters width="100%">
        <v-col cols="12">
          <v-card class="border-left-thread mt-2 mb-7" flat color="#f1f2f4" outlined>
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
              <v-btn class="ml-2" fab small outlined icon color="deep-purple">
                <v-icon>mdi-reply</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- {{ thread }} -->

        <v-col cols="12">
          <v-row v-for="(answer, j) in thread.question.answers" :key="j">
            {{ answer }}
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
            autoGrow
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
  </v-container>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      loading: false,
      threads: [],
      newThread: '',
    };
  },
  methods: {
    async getThreads() {
      this.loading = true;
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
        await this.getThreads();
      } else {
        // Alert User that it was failed
        this.$store.state.snackbarMessage = 'Failed to add Thread';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'error';
      }
    },
  },
  async mounted() {
    await this.getThreads();
  },
};
</script>

<style scoped>
.border-left-thread {
  border-left: 5px solid #3f3d56 !important;
  border-radius: 0px;
}
</style>
