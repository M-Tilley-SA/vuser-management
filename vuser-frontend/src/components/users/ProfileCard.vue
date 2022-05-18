<template>
  <v-card max-width="500" class="mx-auto mt-5" :loading="requestLoading">
    <v-sheet color="primary" dark>
      <v-container fluid>
        <v-row>
          <v-card-title>
            <div class="text-h5 pl-3">
              {{ isEditing && !this.$route.params.id ? 'Create User' : 'User: '
              }}{{ this.$route.params.id }}
            </div>
          </v-card-title>

          <v-spacer></v-spacer>

          <v-card-title v-if="this.$route.params.id">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  icon
                  class="mr-1"
                  @click="toggleEditing"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-scroll-x-transition leave-absolute>
                    <v-icon :key="isEditing">{{
                      isEditing ? 'mdi-account-cancel' : 'mdi-account-edit'
                    }}</v-icon>
                  </v-scroll-x-transition>
                </v-btn>
              </template>
              <span>{{ isEditing ? 'Cancel update' : 'Edit user details'}}</span>
            </v-tooltip>
          </v-card-title>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- General User Details -->
    <v-list two-line subheader>
      <v-subheader inset>General Details</v-subheader>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary"> mdi-account-details </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <v-text-field
              type="text"
              label="First Name"
              v-model="form.first_name"
              :readonly="!isEditing"
              :outlined="isEditing"
              hide-details="auto"
              :class="{ 'my-2': isEditing }"
            ></v-text-field>
          </v-list-item-title>
          <v-list-item-title>
            <v-text-field
              type="text"
              label="Last Name"
              v-model="form.last_name"
              :readonly="!isEditing"
              :outlined="isEditing"
              hide-details="auto"
              :class="{ 'my-2': isEditing }"
            ></v-text-field>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="mt-8">
          <v-icon color="primary"> mdi-phone </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <v-text-field
              type="phone"
              label="Contact Number"
              v-model="form.contact_number"
              :readonly="!isEditing"
              :outlined="isEditing"
              hide-details="auto"
              :class="{ 'my-2': isEditing }"
            ></v-text-field>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon class="mt-8">
          <v-icon color="primary"> mdi-email </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            ><v-text-field
              type="email"
              label="Email Address"
              v-model="form.email_address"
              :readonly="!isEditing"
              :outlined="isEditing"
              hide-details="auto"
              :class="{ 'my-2': isEditing }"
            ></v-text-field>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon class="mt-8">
          <v-icon color="primary"> mdi-calendar </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.date_of_birth"
                  label="Date of birth"
                  :readonly="!isEditing"
                  :outlined="isEditing"
                  :class="{ 'my-2': isEditing }"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.date_of_birth"
                :active-picker.sync="activePicker"
                :readonly="!isEditing"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <!-- Street, city, postal code, country -->
      <v-subheader inset>Address Details</v-subheader>

      <v-list-item>
        <v-list-item-icon class="mt-8">
          <v-icon color="primary"> mdi-map-marker </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <v-text-field
              type="text"
              label="Street Address"
              v-model="form.address.street_address"
              :readonly="!isEditing"
              :outlined="isEditing"
              hide-details="auto"
              :class="{ 'my-2': isEditing }"
            ></v-text-field>
          </v-list-item-title>
          <v-list-item-title>
            <v-text-field
              type="text"
              label="City"
              v-model="form.address.city"
              :readonly="!isEditing"
              :outlined="isEditing"
              hide-details="auto"
              :class="{ 'my-2': isEditing }"
            ></v-text-field>
          </v-list-item-title>
          <v-list-item-title>
            <v-text-field
              type="text"
              label="Postal Code"
              v-model="form.address.postal_code"
              :readonly="!isEditing"
              :outlined="isEditing"
              hide-details="auto"
              :class="{ 'my-2': isEditing }"
            ></v-text-field>
          </v-list-item-title>
          <v-list-item-title>
            <v-autocomplete
              v-model="form.address.country"
              :items="countries"
              :readonly="!isEditing"
              :outlined="isEditing"
              :label="'Select country'"
              :class="{ 'my-2': isEditing }"
              persistent-hint
            >
            </v-autocomplete>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <!-- Skill names, years of experience and rating -->
      <v-subheader inset>User Skills</v-subheader>

      <v-list-item
        v-for="(skill, index) in form.skills"
        :key="`skill-${index}`"
      >
        <v-list-item-icon class="mt-6">
          <v-icon v-if="index === 0" color="primary">
            mdi-account-school
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <v-text-field
              v-model="skill.skill_name"
              label="Skill Name"
              :readonly="!isEditing"
              :outlined="isEditing"
              :class="{ 'my-2': isEditing }"
              hide-details="auto"
            ></v-text-field>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="skill.years_experience"
                  label="Years Experience"
                  :readonly="!isEditing"
                  :outlined="isEditing"
                  :class="{ 'my-2': isEditing }"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="skill.skill_rating"
                  label="Skill Rating"
                  :readonly="!isEditing"
                  :outlined="isEditing"
                  :class="{ 'my-2': isEditing }"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="isEditing">
          <v-btn
            icon
            color="red"
            @click="removeSkill(index)"
            :disabled="!isEditing"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="isEditing" class="justify-end">
        <v-btn depressed color="primary darken-1" @click="addSkill"
          >Add skill</v-btn
        >
      </v-list-item>
    </v-list>
    <v-list v-if="v$.$errors">
      <v-list-item-content class="px-2">
        <v-alert
          type="warning"
          dense
          v-for="error of v$.$errors"
          :key="error.$uid"
          class="pa-2"
        >
          <small>Field: </small>
          <strong>{{ error.$property }}</strong>
          <small> has an error: </small>
          <strong>{{ error.$message }}</strong>
        </v-alert>
      </v-list-item-content>
    </v-list>
    <v-divider></v-divider>

    <v-card-actions v-if="isEditing" class="justify-end grey lighten-4">
      <template v-if="isEditing && $route.params.id">
        <v-btn
          color="red darken-2"
          dark
          depressed
          @click="toggleEditing"
          :disabled="requestLoading"
          :loading="requestLoading"
        >
          Cancel Update</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          v-if="isEditing && $route.params.id"
          @click="updateUser"
          color="primary"
          depressed
          :disabled="requestLoading"
          :loading="requestLoading"
        >
          <v-icon>mdi-save</v-icon>
          Update
        </v-btn>
      </template>
      <v-btn
        v-if="isEditing && !$route.params.id"
        @click="createUser"
        color="primary"
        depressed
        :disabled="requestLoading"
        :loading="requestLoading"
      >
        <v-icon>mdi-save</v-icon>
        Create User
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
export default {
  data() {
    return {
      isEditing: false,
      activePicker: null,
      menu: false,
      form: {
        first_name: '',
        last_name: '',
        contact_number: '',
        email_address: '',
        date_of_birth: null,
        address: {
          street_address: '',
          city: '',
          postal_code: '',
          country: '',
        },
        skills: [],
        user_id: '',
      },
      countries: [
        'South Africa',
        'Mozambique',
        'Botswana',
        'Spain',
        'Ireland',
        'United Kingdom',
      ],
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      tempEditForm: {},
      form: {
        first_name: { required },
        last_name: { required },
        contact_number: { required, $lazy: true },
        email_address: { required, email },
        date_of_birth: { required },
        address: {
          street_address: { required },
          city: { required },
          postal_code: { required },
          country: { required },
        },
        skills: [
          {
            skill_name: { required },
            years_experience: { required },
            skill_rating: { required },
          },
        ],
      },
    };
  },
  created() {
    this.isEditing = !this.$route.params.id ? true : false;
    this.form.user_id ??= this.$route.params.id;

    if (!this.isEditing) {
      const selectedUserData = this.singleUser;
      this.form = {
        ...this.form,
        ...selectedUserData,
      };
    } else {
      this.form = { ...this.form };
    }
  },
  computed: {
    ...mapGetters({
      getSingleUser: 'getSingleUser',
      requestLoading: 'getRequestLoadingState',
    }),
    singleUser() {
      return this.getSingleUser(this.$route.params.id);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'));
    },
  },
  methods: {
    ...mapActions({
      createUserAction: 'createUser',
      updateUserAction: 'updateUser',
    }),
    toggleEditing() {
      this.isEditing = this.isEditing ? false : true;

      if (this.isEditing) {
        this.tempEditForm = structuredClone(this.form);
      } else {
        this.cancelUpdateUser();
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    async updateUser() {
      const formValid = await this.v$.$validate();
      if (!formValid) return;

      await this.updateUserAction(this.form);
      this.isEditing = false;
      this.$router.push('/');
    },
    async createUser() {
      const formValid = await this.v$.$validate();
      if (!formValid) return;

      await this.createUserAction(this.form);
      this.isEditing = false;
      this.$router.push('/');
    },
    cancelUpdateUser() {
      Object.assign(this.form, this.tempEditForm);
      this.tempEditForm = null;
    },
    addSkill() {
      this.form.skills.push({
        skill_name: '',
        years_experience: '',
        skill_rating: '',
      });
    },
    removeSkill(index) {
      this.form.skills.splice(index, 1);
    },
  },
};
</script>
