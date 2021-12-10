<template>
  <v-container class="fill-height">
    <v-row no-gutters justify="center" class="mt-1">
      <v-col cols="auto" class="ma-0 pa-0">
        <v-card color="white" elevation="2">
          <v-form ref="loginform" v-model="valid">
            <v-row no-gutters justify="center" align="center" class="text-h3 font-weight-medium">
              <v-col cols="12" class="text-center">
                <v-avatar height="200" width="200" tile
                  ><v-img src="@/assets/logo.png" height="200" width="200"
                /></v-avatar>
              </v-col>
            </v-row>

            <v-row no-gutters justify="center" align="center" class="px-5 text-h4">
              <v-col cols="9">
                <v-text-field
                  outlined
                  label="Username"
                  v-model="username"
                  required
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  outlined
                  label="Password"
                  required
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  dense
                ></v-text-field
              ></v-col>
            </v-row>

            <v-row justify="center" align="center" class="px-5 mt-0 mb-10">
              <v-col cols="9" class="text-center">
                <v-btn
                  @click.prevent="submitForm"
                  width="70%"
                  rounded
                  outlined
                  color="primary"
                  class="text-h4"
                  >Login</v-btn
                >
              </v-col>
            </v-row>

            <v-row justify="center" align="center" class="text-h3 font-weight-medium" no-gutters>
              <v-col cols="12" class="text-center">
                <v-card color="secondbackground" elevation="0" class="px-5 pt-5 pb-5 border ma-0">
                  <v-row no-gutters justify="center" class="mt-3">
                    <v-col cols="12" class="text-center text-body-2">
                      I Don't Have an Account?</v-col
                    >
                    <v-col cols="9" class="mt-4 mb-3">
                      <v-btn
                        width="70%"
                        to="/register"
                        rounded
                        outlined
                        color="primary"
                        class="text-h4 text-none"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card>
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
      valid: true,
      showPassword: false,
      password: '',
      username: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
      sendRequest: false,
    };
  },
  methods: {
    async submitForm() {
      // Validate Input
      if (!this.$refs.loginform.validate()) return;

      // Disable the button
      this.sendRequest = true;

      // Send the request
      const loginResponse = await api.loginUser({
        username: this.username,
        password: this.password,
      });

      // If the request was successful,
      if (loginResponse.status === 200) {
        // Save the token
        const { token } = loginResponse.data;
        const userdata = loginResponse.data.data;
        localStorage.setItem('userToken', JSON.stringify(token));
        localStorage.setItem('userData', JSON.stringify(userdata.user));

        // Display success and route to home
        this.$store.state.snackbarMessage = 'Welcome to Our Website';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'green darken-2';
        this.$store.state.currentUser = userdata.user;

        // Route to Different Places According to type
        if (userdata.user.type === 'admin') {
          this.$router.push('/admin');
        } else {
          this.$router.push('/feed');
        }
      } else {
        // Display success and route to home
        this.$store.state.snackbarMessage = 'Wrong Username or Password';
        this.$store.state.snackbar = true;
        this.$store.state.snackbarColor = 'red darken-2';
      }
      // Renable the button
      this.sendRequest = false;
      this.$refs.loginform.reset();
    },
  },
};
</script>

<style scoped>
.center-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.border {
  border-top: 1px solid #e0e0e0 !important;
  border-bottom: 1px solid #e0e0e0 !important;
}
.line-heading::before .line-heading::after {
  background-color: #8f8e8e;
  content: '';
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 50%;
}
</style>
