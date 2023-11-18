<template>
  <div>
    <v-container>
      <!-- Assign Course Dialog Modal -->
      <v-row
        align="center"
        justify="center"
        v-if="
          ($store.state.currentUser && $store.state.currentUser.type === 'instructor') ||
          ($store.state.currentUser && $store.state.currentUser.type === 'admin')
        "
      >
        <v-dialog v-model="dialog" max-width="600px">
          <!-- assign course button -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="#b8860b">
              <v-icon left> mdi-plus </v-icon>
              Assign Course
            </v-btn>
          </template>
          <!-- assign course dialog details -->
          <v-card>
            <v-card-title>
              <span class="text-h2 font-weight-normal">New Assignment</span>
            </v-card-title>
            <v-card-text>
              <!-- assign course form fields -->
              <v-container>
                <v-row>
                  <!-- assignment name -->
                  <v-col cols="12">
                    <v-form ref="form1">
                      <v-text-field
                        label="Assignment Name*"
                        placeholder="Assignment Name*"
                        outlined
                        :rules="rules.name"
                        dense
                        v-model="newAssignment.name"
                      ></v-text-field>

                    </v-form>
                  </v-col>
                  <!-- assignment course -->
                  <v-col cols="12">
                    <v-form ref="form2">
                      <v-select
                        label="Class*"
                        :items="['class1', 'class2', 'class3']"
                        outlined
                        :rules="rules.name"
                        dense
                        v-model="newAssignment.classID"
                      ></v-select>
                    </v-form>
                  </v-col>
                  <!-- assignment open date -->                  
                  <v-col cols="12">
                    <v-form ref="form3">
                      <!-- set text field type to datetime-local to get datetime picker
                      and validation -->
                      <v-text-field
                        type="datetime-local"
                        label="Open Date"
                        outlined
                        dense
                        v-model="newAssignment.openDate"
                      ></v-text-field>
                    </v-form>
                  </v-col>
                  <!-- assignment due date -->                  
                  <v-col cols="12">
                    <v-form ref="form4">
                      <!-- set text field type to datetime-local to get datetime picker
                      and validation -->
                      <v-text-field
                        type="datetime-local"
                        label="Due Date"
                        outlined
                        dense
                        v-model="newAssignment.dueDate"
                      ></v-text-field>
                    </v-form>
                  </v-col>
                  
                  <!-- course description -->
                  <!-- <v-col cols="12">
                    <v-form ref="form2">
                      <v-text-field
                        label="Course Description*"
                        placeholder="Course Description*"
                        outlined
                        :rules="rules.name"
                        dense
                        v-model="newAssignment.description"
                      ></v-text-field>
                    </v-form>
                  </v-col> -->
                  
                  <!-- course difficulty -->
                  <!-- <v-col cols="12">
                    <v-form ref="form3">
                      <v-select
                        :items="['Beginner', 'Intermediate', 'Advanced']"
                        label="Difficulty*"
                        outlined
                        dense
                        :rules="rules.name"
                        v-model="newAssignment.difficulty"
                      ></v-select>
                    </v-form>
                  </v-col> -->
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <!-- assign course form submit actions -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" outlined @click="dialog = false"> Close </v-btn>
              <v-btn color="#b8860b" @click="createAssignment()"> Assign </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from '@/api';
export default {
  props: {
    course: Object,
  },
  data() {
    return {
      dialog: false,
      newAssignment: {
        name: '',
        classID: '',
        openDate: '',
        dueDate: '',
      },
      rules: {
        name: [(val) => (val || '').length > 0 || 'This field is required'],
      },
    };
  },
  methods: {
    createAssignment() {
      // post new assignment to server if user submission is valid
      if (
          // validate forms
          this.$refs.form1.validate() &&
          this.$refs.form2.validate() &&
          this.$refs.form3.validate() &&
          this.$refs.form4.validate()
      ) {
        // submission is valid
        console.debug('Assignment creation form passed validation:');
        console.debug(JSON.stringify(this.newAssignment));

        // close dialog
        this.dialog = false;
        // post new assignment to server 
        api.createAssignment(this.newAssignment).then((res) => {
          if (res !== false) {
            // notify user of successful assignment creation
            this.$store.state.snackbarMessage = 'Assignment Created';
            this.$store.state.snackbar = true;
            this.$store.state.snackbarColor = 'success';
          }
          else {
            // notify user of unsuccessful assignment creation
            this.$store.state.snackbarMessage = 'Unable to Create Assignment ';
            this.$store.state.snackbar = true;
            this.$store.state.snackbarColor = 'error';
          }
        });
      }
      else {
        // submission is invalid
        console.debug('Assignment creation form passed validation:');
        console.debug(JSON.stringify(this.newAssignment));
      }
    },
  },
}
</script>
