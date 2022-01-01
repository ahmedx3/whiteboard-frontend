<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <h1 class="display-3 font-weight-medium my-3 hidden-sm-and-down">Manage Users</h1>
          <h1 class="display-2 font-weight-medium my-5 hidden-md-and-up">Manage Users</h1>
        </v-col>
      </v-row>
      <v-simple-table height="75vh" fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.firstName }} {{ user.lastName }}</td>
              <td>
                <v-switch
                  v-if="user.type === 'instructor'"
                  disabled
                  v-model="switchOn"
                  :label="user.type"
                  color="green"
                ></v-switch>
                <v-switch
                  v-if="user.type === 'learner'"
                  @click="updateUserRole(user.id)"
                  :label="user.type"
                ></v-switch>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import api from '../../api';

export default {
  data() {
    return {
      switchOn: true,
      switchOff: true,
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      api.fetchAllUsers().then((res) => {
        this.users = res.data;
      });
    },
    updateUserRole(id) {
      api.updateUserRole(id).then(() => {
        this.fetchUsers();
      });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style></style>
