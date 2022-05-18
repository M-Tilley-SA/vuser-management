<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card max-width="700" class="mx-auto" :loading="requestLoading">
          <v-sheet class="pa-4 primary lighten-2">
            <v-text-field
              v-model="search"
              label="Search Users"
              dark
              flat
              solo-inverted
              hide-details
              clearable
              clear-icon="mdi-close-circle-outline"
            ></v-text-field>
          </v-sheet>
          <v-slide-y-transition class="py-0" group>
            <v-list-item v-for="user in filteredUsers" :key="user._id">
              <v-list-item-action>
                <v-chip x-small color="primary">
                  {{ user.user_id }}
                </v-chip></v-list-item-action
              >
              <v-list-item-content>
                <v-list-item-title>
                  {{ user.first_name }}
                  {{ user.last_name }}</v-list-item-title
                >

                <v-list-item-subtitle>
                  {{ user.email_address }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-flex>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="goToUserDetail(user)"
                      >
                        <v-icon color="grey lighten-1">
                          mdi-account-edit
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Edit user details for: {{ user.first_name }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="deleteUser(user)"
                      >
                        <v-icon color="red darken-1"> mdi-delete </v-icon>
                      </v-btn>
                    </template>
                    <span>Delete user: {{ user.first_name }}</span>
                  </v-tooltip>
                </v-flex>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              v-if="!filteredUsers.length"
              :key="filteredUsers.length"
              >No results found, please try adjusting your search
              criteria</v-list-item
            >
          </v-slide-y-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    loading: false,
    search: '',
    dialog: false,
    selectedUser: null,
  }),
  created() {
    this.loading = true;
    this.fetchUsers();
  },
  computed: {
    ...mapGetters({
      usersStore: 'getUsers',
      requestLoading: 'getRequestLoadingState',
    }),
    filteredUsers: function () {
      if (this.search) {
        const pattern = new RegExp(this.search, 'i');
        return this.usersStore.filter((user) =>
          pattern.test(user.first_name + user.last_name + user.email_address)
        );
      }

      return this.usersStore;
    },
  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUsers',
      deleteUserFromStore: 'deleteUser',
    }),
    goToUserDetail(user) {
      this.$router.push({
        name: 'singleUser',
        params: {
          id: user.user_id,
        },
      });
    },
    deleteUser(user) {
      user && this.deleteUserFromStore(user);
    },
  },
};
</script>
