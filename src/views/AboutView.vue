<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
  ,mounted() {
  if (localStorage.getItem("user")==null){
    this.$router.push('/login');
  }
}
}
</script>