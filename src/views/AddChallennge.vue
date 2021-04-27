
<template>
<div>
  <v-row dense>
    <v-col cols="12" sm="12">
      <v-row dense>
        <v-col style="text-align: center" cols="4" sm="4">
          <img
            style="width: 90%; height: auto; max-width: 100pt"
            src="../assets/star.png"
          />
        </v-col>
        <v-col cols="8" sm="8">
          <h2 style="color: #9330b6">
            <v-text-field
              label="Add Title"
              placeholder=""
              color="#9330b6"
              v-model="Challeange.ChallengeName"
            ></v-text-field>
          </h2>
          <P style="color: gray">
            <v-text-field
              label="Add Description"
              v-model="Challeange.ChallengeDescription"
              placeholder=""
              color="#9330b6"
            ></v-text-field>
          </P>

          
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="9" sm="11" class="addchalleange">
          <v-text-field
            solo
            color="red"
            label="Type your task here"
            v-model="Challeange.NewTaskDesc"
          ></v-text-field>
        </v-col>

        <v-col style="text-align: center" cols="3" sm="1">
          <v-btn class="pa-6" color="#efd6fd" v-on:click="AddTask()">
            Add
            <v-icon medium color="blue-grey darken-2"> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-alert
        v-for="ChalleangeItem in Challeange.ChallengeItems"
        :key="ChalleangeItem.title"
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
<v-btn
            depressed
            color="rgb(147, 48, 182)"
            style="color: white; margin-top: 5pt; margin-bottom: 5pt"
            @click="StartChalleange('')"
          >
            Save
          </v-btn>
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
import BottomNav from '../components/BottomNav.vue';
export default {
  components:{
BottomNav
  },
  data() {
    return {
      Challeange: {
        _id: "",
        ChallengeName: "",
        ChallengeLevel: 1,
        ChallengeDescription: "",
        ChallengeDuration: 1,
        ChallengeImg: "star.png",
        ChallengeItems: [],
        NewTaskDesc: "",
      },
      userChalleanges: [],
      snackbar: false,
      timeout: 2000,
      loggedinUser: {},
    };
  },
  created() {
    var vm = this;
    let apiURL =
      "http://"+this.$store.state.IP+":4000/api/users/FindbyId?UserId="+this.$store.state.loggedInUser._id;
    axios
      .get(apiURL)
      .then((res) => {
        vm.loggedinUser = res.data;
        var NewID = vm.makeid(20);
        vm.Challeange._id = NewID;
        vm.loggedinUser.Challeanges;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    AddTask: function () {
      var vm = this;
      vm.Challeange.ChallengeItems.push({
        title: "Day " + (parseInt(vm.Challeange.ChallengeItems.length) + 1),
        desc: vm.Challeange.NewTaskDesc,
      });
      vm.Challeange.NewTaskDesc = "";
      this.$forceUpdate();
    },
    makeid: function (length) {
      var result = [];
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join("");
    },

    StartChalleange: function (item, event) {
      var vm = this;

      let apiURL =
        "http://"+this.$store.state.IP+":4000/api/users/FindbyId?UserId="+this.$store.state.loggedInUser._id;
      let updateapiURL =
        "http://"+this.$store.state.IP+":4000/api/users/update-user?UserId="+this.$store.state.loggedInUser._id;

      axios
        .get(apiURL)
        .then((res) => {
          let user = res.data;

          vm.userChalleanges = user.Challeanges;
          let newChalleange = vm.Challeange;
          vm.userChalleanges.push(newChalleange);
          user.Challeanges = vm.userChalleanges;
          delete user._id;

          axios
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
