<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card max-width="400" class="mx-auto text-center">
          <v-img src="@/assets/icon.jpg" height="300px" dark> </v-img>
          <v-card-title class="justify-center">
            Page not found
          </v-card-title>
          <v-card-text>
            <p>The page you are looking for does not exist.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style lang="scss" scoped></style>
