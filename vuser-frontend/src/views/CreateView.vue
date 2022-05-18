<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <profile-card></profile-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileCard from '@/components/users/ProfileCard.vue';
export default {
  components: {
    ProfileCard,
  },
};
</script>

<style lang="scss" scoped></style>
