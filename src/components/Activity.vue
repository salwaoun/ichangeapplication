<template>
  <div>
    <h2 style="color: rgb(147, 48, 182)">Your Challenges</h2>
    <v-list three-line style="width: 100%">
      <v-row v-if="items.length==0">
        Looks like You don't have any challenges started!
      </v-row>
      <template v-else v-for="item in items">
        <v-row style="width: 100% !important" :key="item.ChallengeName">
          <router-link
            style="width: 100% !important"
            :to="'/CardsDetailsUserChallenge/' + item._id"
          >
            <div style="width: 100% !important">
              <v-list-item-content>
                <v-card class="pa-2 ml-4" tile>
                  <v-row style="margin:auto">
                    <v-col cols="4" sm="2">
                      <img
                        style="width: 100%; height: auto"
                        :src="
                          require(`../assets/${item.ChallengeImg.toLowerCase()}`)
                        "
                      />
                    </v-col>
                    <v-col cols="8" sm="10">
                      <h1
                        style="
                          color: rgb(147, 48, 182);
                          padding-bottom: 10pt;
                          font-size: 18pt !important;
                          font-weight: normal;
                        "
                      >
                        <v-list-item-title
                          v-html="item.ChallengeName"
                        ></v-list-item-title>
                      </h1>
                      <v-progress-linear
                        color="rgb(147, 48, 182)"
                        style="color: rgb(147, 48, 182)"
                        :value="item.PercentageOfCompletion"
                        height="30"
                      >
                        <strong style="color: white"
                          >{{ item.PercentageOfCompletion }}%</strong
                        >
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-card>
              </v-list-item-content>
            </div>
          </router-link>
          <v-list-item-avatar style="width: 60pt; height: auto">
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
        </v-row>
      </template>
    </v-list>
    <BottomNav />
  </div>
</template>


<script>
import axios from "axios";
import BottomNav from "./BottomNav.vue";
export default {
  components: {
    BottomNav,
  },

  data: () => ({
    items: [],
  }),
  created() {
    if(this.$store.state.loggedInUser){
      let apiURL =
      "http://"+this.$store.state.IP+":4000/api/users/FindbyId?UserId="+this.$store.state.loggedInUser._id;
    axios
      .get(apiURL)
      .then((res) => {
        res.data.Challeanges.forEach((challeange, index) => {
          let allchalleanges = challeange.ChallengeItems.length;
          let completedChalleanges = 0; 
          challeange.ChallengeItems.forEach((item) => {
            if (item.Completed != null) {
              completedChalleanges = completedChalleanges + 1;
            }
          });
          res.data.Challeanges[index].PercentageOfCompletion = (
            (completedChalleanges / allchalleanges) *
            100
          ).toFixed(0);

          this.items = res.data.Challeanges;
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
};
</script>
