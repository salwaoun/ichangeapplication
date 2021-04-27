
<template>
<div>
  <v-row dense>
    <v-col cols="12" sm="12"><v-btn  to="/" > <v-icon>mdi-arrow-left</v-icon> </v-btn>
      <v-row dense>
        
        <v-col style="text-align: center" cols="4" sm="4">
          <img
            style="width: 100%; height: auto; max-width: 100pt"
            :src="require(`../assets/${Challeange.ChallengeImg}`)"
          />
        </v-col>
        <v-col cols="8" sm="8">
          <h2 style="color: #9330b6">{{ Challeange.ChallengeName }}</h2>
          <P style="color: gray"> {{ Challeange.ChallengeDescription }}</P>
          <v-btn
            class="ma-2"
            color="#9330b6"
            style="color: white; margin-bottom: 10pt"
            v-on:click="StartChalleange()"
          >
            Start Challeange
          </v-btn>
        </v-col>
      </v-row>

      <v-alert
        v-for="ChalleangeItem in Challeange.ChallengeItems"
        :key="ChalleangeItem"
        border="right"
        :color="'#efd6fd'"
        dark
      >
        <v-card class="d-flex" color="transparent" flat tile>
          <v-card :class="'mr-auto'" tile color="transparent" flat>
            <span style="color: #9330b6; font-weight: bold"
              >{{ ChalleangeItem.title }} - {{ ChalleangeItem.desc }}</span
            >
          </v-card>
          <v-card tile color="transparent" flat>
            <span>
              <v-icon large color="blue-grey darken-2"> mdi-lock </v-icon>
            </span>
          </v-card>
        </v-card>
      </v-alert>
    </v-col>

    <v-col cols="12" sm="12">
      <v-row dense> </v-row>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
      Woho! you have started a new Challeange !

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
  <BottomNav/>
</div>
</template>

<script>
import axios from "axios";
import BottomNav from "../components/BottomNav.vue";
export default {
  components: {
    BottomNav,
  },
  data() {
    return {
      Challeange: {},
      userChalleanges: [],
      snackbar: false,
      timeout: 2000,
    };
  },
  created() {
    let apiURL =
      "http://"+this.$store.state.IP+":4000/api/FindbyId?ChallaeangeId=" +
      this.$route.params.id; //get the challenge details to display in this specific component
    axios
      .get(apiURL)
      .then((res) => {
        this.Challeange = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    StartChalleange() {
      var vm = this;

      let apiURL =
        "http://"+this.$store.state.IP+":4000/api/users/FindbyId?UserId="+this.$store.state.loggedInUser._id;
      let updateapiURL =
        "http://"+this.$store.state.IP+":4000/api/users/update-user?UserId="+this.$store.state.loggedInUser._id;

      axios
        .get(apiURL)
        .then((res) => {
          let user = res.data;                    //get the current user
          vm.userChalleanges = user.Challeanges;  //assign challenges to the user's challenges  
          let newChalleange = vm.Challeange;      //assign the challenge to be added
          vm.userChalleanges.push(newChalleange); //add the new challenge to the challenges array
          user.Challeanges = vm.userChalleanges;  //pass the challenges array to the user's challenges  
          delete user._id;                        // delete the current user id 
          axios                                   //fire a post request that replaces the old user details with the new one
            .post(updateapiURL, user)
            .then((res) => {
              vm.snackbar = true;
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
