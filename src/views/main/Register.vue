/* eslint-disable implicit-arrow-linebreak */
<template>
  <v-container class="pt-10">
    <!-- Main Form -->
    <v-row justify="center" class="mt-1">
      <v-col cols="auto" class="ma-0 pa-0">
        <v-card color="white" elevation="2" class="pa-5 pt-0" shaped max-width="600px">
          <v-form ref="registerform" v-model="valid">
            <v-row
              no-gutters
              justify="center"
              align="center"
              class="text-h2 font-weight-light ma-5"
            >
              <v-col cols="12" class="text-center">
                <v-avatar height="200" width="200" tile
                  ><v-img src="@/assets/logo.png" height="200" width="200"
                /></v-avatar>
              </v-col>

              <v-col cols="12" class="text-center"> Join Us</v-col>
            </v-row>

            <v-row no-gutters justify="center" align="center" class="px-5 text-h4">
              <v-col cols="10">
                <v-text-field
                  outlined
                  label="First Name"
                  v-model="mainData.firstName"
                  required
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  label="ُLast Name"
                  v-model="mainData.lastName"
                  required
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  label="ُUser Name"
                  v-model="mainData.username"
                  required
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  label="ُEmail"
                  v-model="mainData.email"
                  required
                  :rules="[rules.required, rules.email]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="mainData.birthDate"
                      label="Birthday date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="mainData.birthDate"
                    :active-picker.sync="activePicker"
                    :max="
                      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  label="Password"
                  required
                  v-model="mainData.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.MinPassLen]"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  label="Confirm Password"
                  required
                  v-model="mainData.passwordConfirm"
                  :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[
                    rules.required,
                    rules.passwordMatch(mainData.passwordConfirm, mainData.password),
                  ]"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  @click:append="showPasswordConfirm = !showPasswordConfirm"
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="10" class="text-center">
                <v-radio-group v-model="mainData.type" mandatory column>
                  <template v-slot:label>
                    <div class="text-center">What do you <strong>want</strong> to be?</div>
                  </template>
                  <v-radio value="learner">
                    <template v-slot:label>
                      <div class="text-center">
                        <strong class="success--text">Learner</strong>
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="instructor">
                    <template v-slot:label>
                      <div class="text-center"><strong class="blue--text">Instructor</strong></div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row justify="center" align="center" class="px-5 mt-0 mb-10">
              <v-col cols="10" class="text-center">
                <v-btn
                  @click.prevent="submitFirstForm"
                  width="70%"
                  rounded
                  outlined
                  color="primary"
                  class="text-h4"
                  >Register</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      menu: false,
      tempCategory: '',
      mainData: {
        firstName: '',
        lastName: '',
        username: '',
        birthDate: '',
        email: '',
        type: '',
        password: '',
        passwordConfirm: '',
      },
      valid: true,
      showPassword: false,
      showPasswordConfirm: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Not a valid Email';
        },
        isAYear: (value) => (value >= 1950 && value <= 2025) || 'Must Be between 1960 and 2025',
        hourlyRate: (value) => (value >= 10 && value <= 2000) || 'Must Be between 10 and 2000',
        biggerthanzero: (value) => value > 0 || 'Can not work less than 1 month',
        overviewLength: (v) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          (v.length >= 50 && v.length <= 5000) || 'Min 50 characters, Max 5000 characters',
        emptyArray: (v) => v.length > 0 || 'Min One Skill is needed',
        passwordMatch: (v1, v2) => v1 === v2 || 'Passwords Do not Match',
        MinPassLen: (v) => v.length >= 8 || 'Password min 8 Characters',
      },
      sendRequest: false,
    };
  },
  methods: {
    nextStep(step) {
      this.maxStep = Math.max(this.maxStep, step + 1);
      this.currentStep = step + 1;
    },
    async submitFirstForm() {
      // Validate Input
      if (!this.$refs.registerform.validate()) return;

      // Disable the button
      this.sendRequest = true;

      // Send the request
      const registerResponse = await api.registerUser({
        ...this.mainData,
      });

      // If the request was successful,
      if (registerResponse.status === 201) {
        // Display success and route to home
        this.$store.state.snackbarMessage = 'Registration Complete. You can Login now';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'green accent-4';
        this.$router.push('/login');

        // Reset the Form
        this.$refs.registerform.reset();
        this.mainData = {
          firstName: '',
          lastName: '',
          email: '',
          type: '',
          password: '',
          passwordConfirm: '',
          location: '',
        };
      } else {
        // Display failure
        this.$store.state.snackbarMessage = registerResponse.data.message;
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'red accent-4';
      }
      // Renable the button
      this.sendRequest = false;
    },
  },
};
</script>

<style scoped>
.button-align {
  justify-content: left;
}
.button-active {
  border-left: 5px solid #4caf50 !important;
  font-weight: 700;
  background: #f8f8f8;
  box-shadow: 5px 2px 5px rgba(0, 0, 0, 0.5) !important;
  -webkit-box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.5) !important;
  -moz-box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.5) !important;
}
.border {
  border-top: 1px solid #e0e0e0 !important;
  border-bottom: 1px solid #e0e0e0 !important;
}
</style>
