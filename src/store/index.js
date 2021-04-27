import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedInUser: null,
    IP:'192.168.1.124'
  },
  mutations: {
    setLoggedInUser(state, payload) {
      localStorage.setItem('loggedInUser', JSON.stringify(payload));
      state.loggedInUser = payload;
    },
   
  },
  actions: {
    initialiseStore({ commit, state }) {
      if (localStorage.getItem('loggedInUser')!==null) {
      console.log("Local storage has: "+ localStorage.getItem('loggedInUser'));
        commit('setLoggedInUser', JSON.parse(localStorage.getItem("loggedInUser")));
      }
      else{
        console.log("No User is logged in");
      }
    }
  },
  modules: {
  },
});
