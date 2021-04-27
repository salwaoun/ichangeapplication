<template>
  <v-form v-on:submit.prevent="loginUser">
    <v-container class="fill-height" fluid>
      <v-row class="mx-auto"  justify="center">
        <img width="80%" src="../assets/appLogo.png" />
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" style="text-align:center">
            <v-toolbar color="#EFD6FD" flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text >
              <v-text-field
                v-model="login.email"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                v-model="login.pass"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit">Login</v-btn>
            </v-card-actions><br>
            
          </v-card> </v-col
        ><span style="padding-top: 5%">
          Don't have an account
          <router-link to="/Signup">signup</router-link> Now!
        </span>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
      Email/Password is incorrect!


    </v-snackbar>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      login: {
        email: "",
        pass: "",
      },
      snackbar: false,
      timeout: 3500,
    };
  },
  methods: {
    setLoggedIn(user) {
      this.$store.commit("setLoggedInUser", user);
    },
    //login user
    loginUser() {
      let apiURL = "http://"+this.$store.state.IP+":4000/api/users/";
      axios
        .get(apiURL)
        .then((response) => {
          var users = response.data;
          for (var i = 0; i < users.length; i++) {
            console.log(users[i]);
            if (
              users[i].email == this.login.email &&
              users[i].Password == this.login.pass
            ) {
              this.setLoggedIn(users[i]);
              this.$router.push("/");
            } else {
              this.snackbar=true;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>

