<template>
<div>
  <v-row dense>
    <v-col cols="12" sm="12">
      <v-row dense>
        <v-col cols="12" sm="12">
        <v-btn  to="/" > <v-icon>mdi-arrow-left</v-icon> </v-btn>
  
    </v-col><v-col style="text-align: center" cols="2" sm="4">
          <img
            style="width: 100%; height: auto; max-width: 100pt"
            :src="require(`../assets/${Challeange.ChallengeImg}`)"
          />
        </v-col>
        <v-col cols="10" sm="8">
          <h2 style="color: #9330b6">{{ Challeange.ChallengeName }}</h2>
          <P style="color: gray"> {{ Challeange.ChallengeDescription }}</P>
          <v-btn
            depressed
            color="rgb(147, 48, 182)"
            style="color: white; margin-top: 5pt; margin-bottom: 5pt"
            @click="updateTaskCheckbox('', true)"
          >
            Restart
          </v-btn>
        </v-col>
      </v-row>

      <v-alert
        v-for="(ChalleangeItem, index) in Challeange.ChallengeItems"
        :key="index"
        border="right"
        :color="
          index == Completed.length
            ? '#FFFCC5'
            : ChalleangeItem.Completed != null
            ? '#D4FAD8'
            : '#efd6fd'
        "
        dark
      >
        <v-card class="d-flex" color="transparent" flat tile>
          <v-card :class="'mr-auto'" tile color="transparent" flat>
            <span style="color: #9330b6; font-weight: bold font-size: 80%;"
              >{{ ChalleangeItem.title }} - {{ ChalleangeItem.desc }}</span
            >
          </v-card>
          <v-card tile color="transparent" flat>
            <span v-if="index > Completed.length">
              <v-icon large color="blue-grey darken-2"> mdi-lock </v-icon>
            </span>
            <span v-else>
              <v-checkbox
                :readonly="index < Completed.length"
                v-model="Completed"
                style="
                  margin-top: 0px;
                  padding-top: 0px;
                  backgroun-color: transparent;
                "
                color="black"
                :value="ChalleangeItem.title"
                @click="updateTaskCheckbox(ChalleangeItem.title, false)"
                hide-details
              ></v-checkbox>
            </span>
          </v-card>
        </v-card>
      </v-alert>
    </v-col>
    
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
      Woho! you have Completed Today's Task !

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
      Challeange: {},
      userChalleanges: [],
      snackbar: false,
      timeout: 2000,
      Completed: [],
    };
  },
  created() {
    var vm = this;

    let apiURL =
      "http://"+this.$store.state.IP+":4000/api/users/FindbyId?UserId="+this.$store.state.loggedInUser._id;
    axios
      .get(apiURL)
      .then((res) => {
        var CurrentChallenge = res.data.Challeanges.filter((challenge) => {
          return challenge._id === this.$route.params.id;
        });

        vm.Challeange = CurrentChallenge[0];
        vm.userChalleanges = res.data.Challeanges;

        CurrentChallenge[0].ChallengeItems.forEach((CItem) => {
          if (CItem.Completed != null) {
            vm.Completed.push(CItem.title);
          }
        });
        vm.$forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    updateTaskCheckbox(Title, isRestart) {
      var vm = this;

      var CurrentChallenge = vm.userChalleanges.filter((challenge) => {
        return challenge._id === this.$route.params.id;
      });

      var CurrentChallengeIndex = vm.userChalleanges.indexOf(
        CurrentChallenge[0]
      );

      var citems = CurrentChallenge[0].ChallengeItems;

      if (!isRestart) {
        var currentChallengeItem = {};

        for (
          let index = 0;
          index < citems.length;
          index++
        ) {
          const ChallengeItem = CurrentChallenge[0].ChallengeItems[index];
          if (ChallengeItem.title === Title) {
            currentChallengeItem = ChallengeItem;
            break;
          }
        }
        currentChallengeItem.Completed = true;

        var CurrentChallengeItemIndex = CurrentChallenge[0].ChallengeItems.indexOf(
          currentChallengeItem
        );

        console.log(CurrentChallengeItemIndex);
        vm.userChalleanges[CurrentChallengeIndex].ChallengeItems[
          CurrentChallengeItemIndex
        ] = currentChallengeItem;
      } else if (isRestart) {
        for (
          let index = 0;
          index < CurrentChallenge[0].ChallengeItems.length;
          index++
        ) {
          const ChallengeItem = CurrentChallenge[0].ChallengeItems[index];
          vm.userChalleanges[CurrentChallengeIndex].ChallengeItems[
            index
          ].Completed = null;
        }
      }

      let apiURL =
        "http://"+this.$store.state.IP+":4000/api/users/FindbyId?UserId="+this.$store.state.loggedInUser._id;
      let updateapiURL =
        "http://"+this.$store.state.IP+":4000/api/users/update-user?UserId="+this.$store.state.loggedInUser._id;

      axios
        .get(apiURL)
        .then((res) => {
          let user = res.data;
          delete user._id;
          user.Challeanges = vm.userChalleanges;

          axios
            .post(updateapiURL, user)
            .then((res) => {
              if (!isRestart) {vm.snackbar = true;}
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally()
      {
        if (isRestart) {
          vm.Completed = [];
        } else {
          if (!vm.Completed.includes(Title)) vm.Completed.push(Title);
        }
      }
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
<style >
.v-icon.v-icon {
  color: black;
}
</style>
