<template>
  <v-app>
      <v-container style="min-height:100vh" class="grey lighten-2">
        <v-sheet style="min-height:100%;" >
          <v-row style="padding: 15pt">
            <v-col cols="12" >
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
  </v-app>
</template>
 <style>
.theme--dark.v-label {
  color: #9330b6;
}
button,
input,
select,
textarea {
  border-bottom-color: #9330b6;
}
</style>
