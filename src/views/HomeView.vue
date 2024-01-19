<template>
  <div class="HomeComponent">
    <title>Atletika-denik</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <body class="w3-light-grey">

      <!-- Top container -->
      <div class="w3-bar w3-top w3-blue w3-large" style="z-index:4">
        <button style="Font-size:23px;margin-top:3px;"
          class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();"><i
            class="fa fa-bars"></i> Menu</button>
        <span class="w3-bar-item w3-right" style="background-color:white;"><img src="../assets/logo.png" width="150px"
            height="40px" /></span>
      </div>

      <!-- Sidebar/menu -->
      <nav class="w3-sidebar w3-collapse w3-white" style="z-index:3;width:300px;" id="mySidebar"><br>
        <div class="w3-container w3-row">
          <div class="w3-col s8 w3-bar" style="margin-top:20px;">
            <table>
              <tr>
                <td>
                  <span>Uživatel: <strong>{{ getUserName() }}</strong></span>
                </td>
                <td>
                  <a @click.prevent="logout" class="w3-bar-item w3-button "><i class="fa fa-close"></i></a>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <hr>
        <div class="w3-container">
          <h5>NABÍDKA</h5>
        </div>
        <div class="w3-bar-block">
          <router-link :to="{ name: 'main'}">
          <a class="w3-bar-item w3-button w3-padding w3-blue">SEZNAM ATLETŮ</a>
          </router-link>
          <router-link :to="{ name: 'newUser'}">
          <a href="atlet_add.php" class="w3-bar-item w3-button">PŘIDAT ATLETA</a>
        </router-link>
        </div>
      </nav>


      <!-- Overlay effect when opening sidebar on small screens -->
      <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer"
        title="close side menu" id="myOverlay"></div>

      <!-- !PAGE CONTENT! -->
      <div class="w3-main" style="margin-left:300px;margin-top:43px;">

        <!-- Header -->
        <header class="w3-container" style="padding-top:22px">
          <div>
            <ListOfUsers/>
          </div>
        </header>

        <hr>

        <!-- Footer -->
        <footer class="w3-container w3-padding-16 w3-DodgerBlue">

        </footer>

        <!-- End page content -->
      </div>
      </body>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
  }, mounted() {
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    },
    getUserName(){
      console.log(localStorage.getItem("user"));
      return localStorage.getItem("user");
    }
  }
}
</script>
<style>
html,
body,
h1,
h2,
h3,
h4,
h5 {
  font-family: "Raleway", sans-serif
}

#vyhledavac1 {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  /* background-image: url('logo/icon-search.png');v*/
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 40px;

}

#vyhledavac1:focus {
  border: 3px solid blue;
}

#vysledky {
  margin-left: 200px;
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