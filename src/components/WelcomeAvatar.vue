<template>
<div>
<h1 style="color:rgb(147, 48, 182); font-weight:normal; padding-bottom:15pt"> Hi {{username}}!</h1>
</div>
</template>
<script>

export default ({
    data(){
        return{
            username: this.$store.state.loggedInUser.UserName
        }
    }
  
})
</script>

