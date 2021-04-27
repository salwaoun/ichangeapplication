<template>
  <div style="text-align:center">
    <v-flex xs12 pt-0 pb-0>
  <h1 class="title mb-4" style="color: #9330B6">My Profile</h1>
  <v-avatar
    size="100px"
  >
    <img
      :src="this.selectedAvatar"
      alt="Avatar"
    >
  </v-avatar>
</v-flex>
<v-flex>
  <v-btn
    color="#EFD6FD"
    @click="selectAvatarDialog = true"
  >
    Change avatar
  </v-btn>
</v-flex>
<br>
    <v-card>
      <v-list style="text-align:left">
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title  >First Name</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title style="text-align:left">{{currentUser.fName}}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>

        <v-divider ></v-divider>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Last Name</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>{{currentUser.lName}}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>{{currentUser.email}}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <v-divider></v-divider>
    <br>
    <v-btn color="#EFD6FD" @click="logout()">Logout</v-btn>
    <v-dialog
  v-model="selectAvatarDialog"
  max-width="80%"
>
  <v-card>
    <v-container fluid pa-2>
        <v-layout row wrap align-center justify-center fill-height>
          <v-flex xs6 sm4 md3 lg2 my-2 class="text-xs-center"
          v-for="(avatar,i) in avatars"
          :key="i">
            <v-img
              :src="avatar.src"
              aspect-ratio="1"
              width="100px"
              max-width="100px"
              min-width="100px"
              class="dialog-avatar-img"
              @click="selectAvatar(i)"
            ></v-img>
          </v-flex>
        </v-layout>
      <v-card-actions class="mt-2">
        <v-spacer></v-spacer>

        <v-btn
          @click="selectAvatarDialog = false"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</v-dialog>
    <BottomNav />
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav.vue";

export default {
  data() {
    return {
      currentUser: this.$store.state.loggedInUser,
      selectAvatarDialog: false,
      avatars: [
        {src: require('../assets/avatars/girl.png') },
        {src: require('../assets/avatars/boy.png') }
      ],
      selectedAvatar: require('../assets/avatars/girl.png'),
    };
  },

  components: {
    BottomNav,
  },
  methods: {
    selectAvatar(i){
      this.selectedAvatar = this.avatars[i].src
      console.log('Avatar selected')
    },
    logout() {
      localStorage.removeItem("loggedInUser");
      this.$router.push("/Login");
    },
  },
};
</script>
<style>
.v-list-item{
  margin-top: 10%;
  margin-bottom: 10%;
      display: grid;
    grid-template-columns: 0.5fr 1fr 2fr;
}
.v-list-item-title {
  color: #EFD6FD;
}
</style>