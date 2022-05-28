<template>
  <v-list-item>
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
              :loading="requestLoading"
              :disabled="requestLoading"
              @click="goToUserDetail(user)"
            >
              <v-icon color="grey lighten-1"> mdi-account-edit </v-icon>
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
              :loading="requestLoading"
              :disabled="requestLoading"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      requestLoading: 'getRequestLoadingState',
    }),
  },
  methods: {
    ...mapActions({
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
      this.$root
        .$confirm(
          `Delete User: ${user.first_name}`,
          `Are you sure you want delete this user? This action cannot be undone.`,
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          if (confirm) {
            this.deleteUserFromStore(user);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
