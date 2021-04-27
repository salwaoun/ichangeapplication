<template>
  <v-form v-on:submit.prevent="register" lazy-validation>
    <v-container class="fill-height" fluid mt-n12>
      <v-row class="mx-auto" justify="center">
        <img width="80%" src="../assets/appLogo.png" />
        <v-col cols="12" sm="8" md="4" align="center">
          <v-card class="elevation-12">
            <v-toolbar color="#EFD6FD" flat>
              <v-toolbar-title>Sign Up form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="user.fName"
                  label="fName"
                  name="fName"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="user.lName"
                  label="lName"
                  name="lName"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="user.email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  name="email"
                  prepend-icon="mdi-mail"
                  type="text"
                ></v-text-field>

                <v-text-field
                  id="password"
                  v-model="user.Password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="[rules.required, rules.counter]"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit">Sign Up</v-btn>
            </v-card-actions>
          </v-card></v-col
        ><span style="padding-top: 5%"
          >Already have an account?
          <router-link to="/Login">Login</router-link> Here!
        </span>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
      Unable to Sign up: {{ this.message }}
    </v-snackbar>
    
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      message: "",
      snackbar: false,
      timeout: 5000,
      user: {
        userName: "",
        fName: "",
        lName: "",
        email: "",
        Password: "",
      },
    };
  },
  methods: {
    formValidation() {
      if (
        this.user.fName &&
        this.user.lName &&
        this.user.email &&
        this.user.Password
      )
        return true;
      else {
        this.message = "please fill all the fields"
          this.snackbar = true;
        }
    },
    register() {
      this.formValidation();
      console.log(this.formValidation());
      var newUser = {
        fName: this.user.fName,
        lName: this.user.lName,
        UserName: this.user.fName + " " + this.user.lName,
        email: this.user.email,
        Password: this.user.Password,
        Challeanges: [],
      };
      if (this.formValidation() == true) {
        let apiURL =
        "http://"+this.$store.state.IP+":4000/api/users/FindbyEmail?UserEmail=" +
        newUser.email;
      axios
        .get(apiURL)
        .then((res) => {
          console.log(res.data);
          if (res.data === null) {
            let apiURL = "http://"+this.$store.state.IP+":4000/api/users/create-user";
          axios
            .post(apiURL, newUser)
            .then((response) => {
              alert("Registration successful");
              this.$router.push("/Login");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.message="the email you entered is already taken";
          this.snackbar=true;
        }
        })
        .catch((error) => {
          console.log("the error is: " + error);
        });
          
      }
    },
  },
};
</script>

<style>
</style>
