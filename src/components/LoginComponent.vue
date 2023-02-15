<template>
  <div class="login">
    <h2 class="login-header">PŘIHLÁŠENÍ</h2>
    <form @submit.prevent="submitForm">
      <label>Username:</label>
      <input type="text" placeholder="Uživatelské jméno" v-model="username" name="name" style="margin-top:10px;margin-bottom:10px;"/>
      <label>Password:</label>
      <input type="password" placeholder="Heslo" v-model="password" name="password" style="margin-top:10px;margin-bottom:10px;"/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
	
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('https://localhost:7210/user-Login', {
          userName: this.username,
          userPassword: this.password
        }).then((response) => {
          console.log(response);
          console.log(response.data.loggedin);
        // Redirect to main page if login is successful
        if (response.data.loggedin === true) {
          localStorage.setItem('user', response.data.userName);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('admin', response.data.admin);
          this.$router.push('/main');
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      })
      } catch (error) {
        this.errorMessage = 'An error occurred';
      }
    }
  }
}
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

body {
  background: lightgrey;
  font-family: 'Open Sans', sans-serif;
}

.login {
  width: 400px;
  margin: 16px auto;
  font-size: 16px;
}

/* Reset top and bottom margins from certain elements */
.login-header,
.login p {
  margin-top: 0;
  margin-bottom: 0;
}

.login-header {
  background: #28d;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.login-container {
  background: #ebebeb;
  padding: 12px;
}

/* Every row inside .login-container is defined with p tags */
.login p {
  padding: 12px;
}

.login input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
}

.login input[type="username"],
.login input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
}

/* Text fields' focus effect */
.login input[type="username"]:focus,
.login input[type="password"]:focus {
  border-color: #888;
}

.login input[type="submit"] {
  background: #28d;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.login input[type="submit"]:hover {
  background: #17c;
}

/* Buttons' focus effect */
.login input[type="submit"]:focus {
  border-color: #05a;
}

</style>
