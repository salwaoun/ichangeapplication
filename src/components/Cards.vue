<template>
  <v-row dense>
    <h2 style="color: rgb(147, 48, 182)">Start a Challenge</h2>
    <v-slide-group>
      <v-slide-item v-for="Challeange in Challeanges" :key="Challeange._id">
        <v-card class="ma-4 pa-1" height="auto" width="200">
          <v-img
            class="white--text align-end"
            width="100%"
            :src="require(`../assets/${Challeange.ChallengeImg.toLowerCase()}`)"
          >
            <v-card-title style="line-height:0">{{
              Challeange.ChallengeName
            }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Level : {{ Challeange.ChallengeLevel }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ Challeange.ChallengeDescription.slice(0, 50) }}...</div>
          </v-card-text>

          <v-card-actions>
            <router-link v-bind:to="'/CardsDetails/' + Challeange._id">
              <v-btn color="rgb(147, 48, 182)" text> More.. </v-btn>
            </router-link>
          </v-card-actions>
          <v-scale-transition>
            
          </v-scale-transition>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-row>
</template>
<style>
.v-card__title {
background-color: rgb(147, 48, 182);
font-size: 100%;
}
.v-application a {
    text-decoration: none;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      Challeanges: [],
    };
  },
  created() {
    let apiURL = "http://"+this.$store.state.IP+":4000/api"; //get the list of challenges from the challenges collection
    axios
      .get(apiURL)
      .then((res) => {
        this.Challeanges = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
