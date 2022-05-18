const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
});

export default {
  state: {
    users: [],
    errors: [],
    requestLoading: false,
  },
  getters: {
    getUsers: ( state ) => state.users,
    getSingleUser: (state) => (user_id) => state.users && state.users.find(user => user.user_id === user_id),
    getErrors: (state) => state.errors,
    getRequestLoadingState: (state) => state.requestLoading,
  },
  actions: {
    /**
     *
     * @param {string} user_id VC-2221
     */
    async fetchUsers({ commit }, user_id = null) {
      commit('SET_REQUEST_LOADING', true);
      const url = user_id ? `users/${ user_id }` : 'users' // if user_id is null, fetch all users
      return await instance
        .get(url)
        .then((response) => {
          commit('SET_USERS', response.data);
        })
        .finally(() => {
          commit('SET_REQUEST_LOADING', false);
        });
    },

    /**
     *
     * @param {userObject} payload
     */
    async deleteUser ( { commit }, user ) {
      commit('SET_REQUEST_LOADING', true);
      return await instance
        .delete(`users/${user.user_id}`)
        .then(() => {
          commit('DELETE_USER', user.user_id);
        })
        .finally(() => {
          commit('SET_REQUEST_LOADING', false);
        });
    },

    /**
     *
     * @param {userObject} payload
     */
    async createUser ( { commit }, payload ) {
      
      commit( 'SET_REQUEST_LOADING', true );
      
      // Not ideal, should probably be refactored to create these on the server side
      const randomInt = Math.floor(Math.random() * 9999);
      const userId = `${payload.first_name.charAt(0)}${payload.last_name.charAt(0)}-${randomInt}`;

      const formData = {
        user: {
          ...payload,
          user_id: userId,
        },
      };
      return await instance
        .post('users', formData)
        .then(() => {
          // Add the new user to state.users
          commit( 'ADD_USER', formData.user );
        })
        .finally(() => {
          commit('SET_REQUEST_LOADING', false);
        });
    },

    /**
     *
     * @param {userObject} payload
     */
    async updateUser ( { commit }, payload ) {
      commit('SET_REQUEST_LOADING', true);
      const formData = {
        user: payload,
      };
      return await instance
        .patch(`users/${payload.user_id}`, formData)
        .then(() => {
          commit('UPDATE_USER', payload);
        })
        .finally(() => {
          commit('SET_REQUEST_LOADING', false);
        });
    },
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    UPDATE_USER(state, user) {
      const userIndex = state.users.findIndex(
        (curUser) => curUser.user_id === user.user_id
      );
      state.users[userIndex] = user;
    },
    DELETE_USER(state, user_id) {
      const userIndex = state.users.findIndex(
        (user) => user.user_id === user_id
      );
      state.users.splice(userIndex, 1);
    },
    SET_REQUEST_LOADING ( state, requestLoading ) {
      state.requestLoading = requestLoading;
    },
  },
};
