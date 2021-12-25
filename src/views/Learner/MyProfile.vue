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
                  <h1 class="text-h2 font-weight-regular">Ahmed Mostafa</h1>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col class="col-12 col-md-8">
          <v-card class="pa-5">
            <v-form ref="form" lazy-validation>
              <v-text-field label="First Name"></v-text-field>

              <v-text-field label="Last Name"></v-text-field>

              <v-text-field label="E-mail"></v-text-field>

              <v-text-field label="UserName"></v-text-field>

              <v-text-field label="Passowrd" type="password"></v-text-field>

              <v-btn color="primary"> Save </v-btn>
            </v-form></v-card
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.display-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
