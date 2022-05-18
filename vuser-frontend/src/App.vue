<template>
  <v-app>
    <v-app-bar flat app dark color="primary">
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark text @click="$router.push('/')" class="mx-1">
        <span class="mr-2">Manage Users</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn dark text @click="$router.push('/create')" class="mx-1">
        <span class="mr-2">Create User</span>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-fade-transition name="fade-in" mode="out-in" :key="$route.path">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
