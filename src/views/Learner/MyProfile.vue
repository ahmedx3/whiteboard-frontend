<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="display-3 font-weight-medium my-3 hidden-sm-and-down">My Profile</h1>
          <h1 class="display-2 font-weight-medium my-5 hidden-md-and-up">My Profile</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-md-4">
          <v-card class="pa-5">
            <v-container>
              <v-row>
                <v-col class="display-flex">
                  <v-avatar color="topbar" size="128"
                    ><img src="../../assets/avatar.svg" alt="John"
                  /></v-avatar>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="display-flex">
                  <h1 class="text-h2 font-weight-bold">
                    {{ $store.state.currentUser.firstName }} {{ $store.state.currentUser.lastName }}
                  </h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="display-flex">
                  <h1 class="text-h2 font-weight-regular deep-purple--text text--darken-4">
                    My Grades
                  </h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="display-flex">
                  <v-progress-circular
                    :rotate="-90"
                    :size="120"
                    :width="10"
                    :value="gradePercentage"
                    color="#48465E"
                  >
                    {{ minorGrade }}/{{ totalGrade }}
                  </v-progress-circular>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col class="col-12 col-md-8">
          <v-card class="pa-5">
            <v-form ref="form" lazy-validation>
              <v-text-field
                :rules="rules"
                label="First Name"
                v-model="user.firstName"
              ></v-text-field>

              <v-text-field :rules="rules" label="Last Name" v-model="user.lastName"></v-text-field>

              <v-text-field :rules="rules" label="E-mail" v-model="user.email"></v-text-field>

              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="user.birthDate"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="user.birthDate"
                    label="Birthdate"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="user.birthDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(user.birthDate)"> OK </v-btn>
                </v-date-picker>
              </v-menu>
              <v-btn color="primary" @click="updateUserProfile"> Save </v-btn>
            </v-form></v-card
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      menu: false,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
      },
      grades: [],
      minorGrade: 0,
      totalGrade: 0,
      gradePercentage: 0,
      newUserData: {},
      rules: [(v) => !!v || 'Required'],
    };
  },
  methods: {
    fetchUserData() {
      api.fetchUserProfile().then((response) => {
        this.user = response.data;
      });
    },
    fetchCurrentUserGrades() {
      api.fetchCurrentUserGrades().then((response) => {
        this.grades = response.data;
        this.minorGrade = this.grades.reduce((acc, grade) => {
          return acc + grade.grade;
        }, 0);
        this.totalGrade = this.grades.reduce((acc, grade) => {
          return acc + grade.total;
        }, 0);
        this.gradePercentage = Math.round((this.minorGrade / this.totalGrade) * 100);
      });
    },
    updateUserProfile() {
      this.$refs.form.validate();
      api.updateUserProfile(this.user).then((res) => {
        this.$store.state.snackbarMessage = 'Data updated successfully';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'green darken-2';
        this.newUserData = this.$store.state.currentUser;
        this.newUserData.firstName = res.data.user.firstName;
        this.newUserData.lastName = res.data.user.lastName;
        this.newUserData.email = res.data.user.email;
        this.newUserData.username = res.data.user.username;
        localStorage.setItem('userData', JSON.stringify(this.newUserData));
        this.$store.commit('UPDATE_CURRENT_USER', this.newUserData);
      });
    },
  },
  mounted() {
    this.fetchUserData();
    this.fetchCurrentUserGrades();
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem('userData')) {
      next({ name: 'login' });
    } else {
      next();
    }
  },
};
</script>

<style scoped>
.display-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
