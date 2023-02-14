<template>
  
</template>

<script>
import ListOfUsers from '@/components/ListOfUsers.vue';

export default {
  name: 'HomeComponent',
  props: {
    msg: String
  },
  components:{
    ListOfUsers
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
