<template>
  <v-bottom-navigation style="display:grid;" class="nav"
    color="rgb(147, 48, 182)"
  >
    <v-btn to='/'>
      <span>Home</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn :to='"/AddChallennge/"+UserId'>
      <span>Add</span>

      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-btn to="/Profile">
      <span>Profile</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<style>
.nav{
  position:fixed;
  bottom:0pt;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.v-btn{
  color:rgb(147, 48, 182);
}
</style>

<script>

export default ({
    data(){
        return{
            UserId: this.$store.state.loggedInUser._id
        }
    }
  
})
</script>
