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
            <user-item v-for="user in filteredUsers" :key="user._id" :user="user">
            </user-item>
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
import UserItem from '@/components/users/listItems/UserItem.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    UserItem
  },
  data: () => ({
    search: '',
    dialog: false,
    selectedUser: null,
  }),
  created() {
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
    }),
  },
};
</script>
