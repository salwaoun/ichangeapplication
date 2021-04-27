import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/CardsDetails/:id',
    name: 'CardsDetails',
    component: () => import('../views/CardsDetails.vue'),
  }
  ,
  {
    path: '/AddChallennge/:Userid',
    name: 'AddChallennge',
    component: () => import('../views/AddChallennge.vue'),
  }
  
  ,
  {
    path: '/CardsDetailsUserChallenge/:id',
    name: 'CardsDetailsUserChallenge',
    component: () => import('../views/CardsDetailsUserChallenge.vue'),
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  
  console.log("from: "+from.name + " path: "+ from.path);
  console.log("to: "+to.name+ " path: "+ to.path);
  store.dispatch('initialiseStore');
  if (to.name !== 'Login' && !store.state.loggedInUser){
    if(to.name=="Signup") next();
    else next({ path: '/Login' })
  }
  else next()
})

export default router;
