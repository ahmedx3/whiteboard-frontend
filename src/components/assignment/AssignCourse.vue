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
                        :items="classes"
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
    course: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      classes: ['class0', 'class1', 'class2'],
      newAssignment: {
        instructorID: 1, //@TODO replace or remove when user accounts are implemented
        courseID: this.course._id, //@TODO read in as a prop from parent component 
        classID: '',
        name: '',
        openDate: '',
        dueDate: null, // initialize due date as null
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
        // console.debug('Assignment creation form passed validation:');
        // console.debug(this.newAssignment);

        // close dialog
        this.dialog = false;

        // reformat submission fields
        // make a copy of the new assignment object
        const newAssignmentFormatted = Object.assign({}, this.newAssignment);
        // console.debug('newAssignment copy');
        // console.debug(newAssignmentFormatted);
        // convert courseID to number
        newAssignmentFormatted.classID = this.classes.indexOf(newAssignmentFormatted.classID);
        // convert open date to UTC
        let openDate = new Date(newAssignmentFormatted.openDate);
        newAssignmentFormatted.openDate = openDate.toISOString();
        // convert due date to UTC
        if (newAssignmentFormatted.dueDate !== "" &&
            newAssignmentFormatted.dueDate !== null) {
          let dueDate = new Date(newAssignmentFormatted.dueDate);
          newAssignmentFormatted.dueDate = dueDate.toISOString();
        } else {
          newAssignmentFormatted.dueDate = null;
        }

        // post new assignment to server
        api.createAssignment(newAssignmentFormatted).then((res) => {
          if (res !== false) {
            // notify user of successful assignment creation
            this.$store.state.snackbarMessage = 'Assignment created';
            this.$store.state.snackbar = true;
            this.$store.state.snackbarColor = 'success';
          }
          else {
            // notify user of unsuccessful assignment creation
            this.$store.state.snackbarMessage = 'Unable to create assignment ';
            this.$store.state.snackbar = true;
            this.$store.state.snackbarColor = 'error';
          }
        });
      }
      else {
        // submission is invalid
        // console.debug('Assignment creation form failed validation:');
        // console.debug(this.newAssignment);
      }
    },
  },
}
</script>
