<template>

  <div class="home">
    <WelcomeAvatar/>
    <Activity/>
    <Cards/>
    <BottomNav/>
    
      

  
  </div>
</template>

<script>

import WelcomeAvatar from '../components/WelcomeAvatar.vue';
import Activity from '../components/Activity.vue';
import Cards from '../components/Cards.vue';
import BottomNav from '../components/BottomNav.vue';

export default {
  name: 'App',
  components: {
    WelcomeAvatar,
    Activity,
    Cards,
    BottomNav
  },
};

</script>
