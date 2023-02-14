<template>
  <TreninkyTydenComponent/>
</template>

<script>
// @ is an alias to /src
import TreninkyTydenComponent from '@/components/TreninkyTydenComponent.vue'

export default {
  name: 'TreninkView',
  components: {
    TreninkyTydenComponent
  },mounted() {
  if (localStorage.getItem("user")==null){
    this.$router.push('/login');
  }
}
}
</script>
