<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="9">
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(item, i) in items"
            :key="i"
            :color="colors[item.type]"
            :icon="icons[item.type]"
            fill-dot
          >
            <v-card :color="colors[item.type]" dark>
              <v-card-title class="text-h3 center-horizontal py-3 px-4">
                <span v-if="item.type === 'pdf'"> PDF </span>
                <span v-else-if="item.type === 'video'"> Video </span>
                <span v-else-if="item.type === 'quiz'"> Quiz </span>
              </v-card-title>

              <v-card-text class="white text--primary pa-4 center-horizontal">
                <template v-if="item.type === 'pdf'">
                  <v-btn :color="colors[item.type]" class="mx-auto" outlined> Download Pdf </v-btn>
                </template>
                <template v-if="item.type === 'quiz'">
                  <v-btn :color="colors[item.type]" class="mx-auto" outlined> Open Quiz </v-btn>
                </template>
                <template v-if="item.type === 'video'">
                  <div class="iframe-container">
                    <iframe
                      width="560"
                      height="315"
                      webkitallowfullscreen
                      mozallowfullscreen
                      allowfullscreen
                      src="https://www.youtube.com/embed/YzeRik5yEBY"
                    ></iframe></div
                ></template>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        type: 'video',
      },
      { type: 'pdf' },
      {
        type: 'quiz',
      },
      { type: 'video' },
    ],
    colors: {
      pdf: 'indigo lighten-2',
      video: 'blue-grey',
      quiz: 'teal lighten-3',
    },
    icons: {
      pdf: 'mdi-book-variant',
      video: 'mdi-video',
      quiz: 'mdi-pen',
    },
  }),
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
