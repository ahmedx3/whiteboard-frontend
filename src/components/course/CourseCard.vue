<template>
  <div>
    <v-card max-width="992" class="center my-6 pa-10" elevation="2" :to="'/courses/' + _id">
      <v-container>
        <v-row>
          <v-col class="pa-0">
            <v-chip color="#f1e9f5" filter pill>Intermediate</v-chip>
          </v-col>
          <v-col class="pa-0">
            <v-rating
              readonly
              background-color="orange lighten-3"
              color="orange"
              class="px-5"
            ></v-rating
          ></v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 mt-3">
            <h1 class="font-weight-medium">Advanced Programming in C++</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0">
            <h1 class="text-caption font-weight-bold">By Ahmed Mostafa</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 my-6">
            <p class="text-body-1">
              Learn the advanced programming topics in the C++ programming language, including
              functions, computation complexity, arrays and strings.
            </p>
          </v-col>
          <v-col class="display-flex hidden-sm-and-down">
            <v-btn large color="#017A9B">Learn More</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0">
            <span class="mr-5">2h 3m</span>
            <v-icon>mdi-clock</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 mt-6 hidden-md-and-up">
            <v-btn large color="#017A9B" block>Learn More</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
.center {
  margin: auto;
  padding: 10px;
}

.v-chip__content {
  font-size: 1em;
  font-weight: bold;
  color: #2e3d54;
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
