<template>
  <v-card>
    <v-tabs color="#3f3d56" vertical>
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
              <v-file-input
                v-model="file"
                color="deep-purple accent-4"
                label="File input"
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
              <v-btn class="mx-2" fab dark small color="deep-purple accent-4" @click="uploadPDF">
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
              label="Video Embed Link"
              hint="Example: https://www.youtube.com/embed/YzeRik5yEBY"
              persistent-hint
              v-model="video"
              :rules="[(v) => !!v || 'Link Required']"
            >
            </v-text-field>
          </v-form>
          <v-row justify="center my-3">
            <v-btn class="mx-2" fab dark small color="deep-purple accent-4" @click="uploadVideo">
              <v-icon dark> mdi-upload </v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-tab-item>

      <v-tab-item class="px-3">
        <v-card flat>
          <v-card-text> Quiz </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      video: null,
    };
  },
  methods: {
    uploadPDF() {
      if (!this.$refs.pdf.validate()) {
        return;
      }
      //   Upload
      alert(this.file);
      this.file = null;
    },
    uploadVideo() {
      if (!this.$refs.video.validate()) {
        return;
      }
      //   Upload
      alert(this.video);
      this.video = null;
    },
  },
};
</script>

<style></style>
