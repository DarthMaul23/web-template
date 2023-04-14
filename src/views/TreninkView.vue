<template>
  <div class="NewUserView">
    <title>Atletika-denik</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Raleway"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <body class="w3-light-grey">
      <!-- Top container -->
      <div class="w3-bar w3-top w3-blue w3-large" style="z-index: 4">
        <button
          style="font-size: 23px; margin-top: 3px"
          class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey"
          onclick="w3_open();"
        >
          <i class="fa fa-bars"></i> Menu
        </button>
        <span class="w3-bar-item w3-right" style="background-color: white"
          ><img src="../assets/logo.png" width="150px" height="40px"
        /></span>
      </div>

      <!-- Sidebar/menu -->
      <nav
        class="w3-sidebar w3-collapse w3-white"
        style="z-index: 3; width: 300px"
        id="mySidebar"
      >
        <br />
        <div class="w3-container w3-row">
          <div class="w3-col s8 w3-bar" style="margin-top: 20px">
            <table>
              <tr>
                <td>
                  <span>Uživatel: <strong>{{ getUserName() }}</strong></span>
                </td>
                <td>
                  <a @click.prevent="logout" class="w3-bar-item w3-button"
                    ><i class="fa fa-close"></i
                  ></a>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <hr />
        <div class="w3-container">
          <h5>NABÍDKA</h5>
        </div>
        <div class="w3-bar-block">
          <router-link :to="{ name: 'main' }">
            <a class="w3-bar-item w3-button">SEZNAM ATLETŮ</a>
          </router-link>
          <router-link :to="{ name: 'calendar' }">
            <a class="w3-bar-item w3-button">KALENDÁŘ</a>
          </router-link>
          <router-link :to="{ name: 'newUser' }">
            <a href="atlet_add.php" class="w3-bar-item w3-button"
              >PŘIDAT ATLETA</a
            >
          </router-link>
          <router-link :to="{ name: 'trainingWeek' }">
            <a
              href="atlet_add.php"
              class="w3-bar-item w3-button w3-padding w3-blue"
              >TRENINKY</a
            >
          </router-link>
          <router-link :to="{ name: 'activity' }">
            <a class="w3-bar-item w3-button">Aktivity</a>
          </router-link>
          <!--<a href="athlet_page.php?id=" class="w3-bar-item w3-button w3-padding">INFORMACE</a>
            <a href="treninky.php?id=" class="w3-bar-item w3-button w3-padding">TRENINKY</a>
            <a href="rekordy.php?id=&&jmeno=&&prijmeni="class="w3-bar-item w3-button w3-padding">REKORDY</a>-->
        </div>
      </nav>

      <!-- Overlay effect when opening sidebar on small screens -->
      <div
        class="w3-overlay w3-hide-large w3-animate-opacity"
        onclick="w3_close()"
        style="cursor: pointer"
        title="close side menu"
        id="myOverlay"
      ></div>

      <!-- !PAGE CONTENT! -->
      <div class="w3-main" style="margin-left: 300px; margin-top: 43px">
        <!-- Header -->
        <header class="w3-container" style="padding-top: 22px">
          <div>
            <TreninkyTydenComponent />
          </div>
        </header>

        <hr />

        <!-- Footer -->
        <footer class="w3-container w3-padding-16 w3-DodgerBlue"></footer>

        <!-- End page content -->
      </div>
    </body>
  </div>
</template>
<script>
// @ is an alias to /src
import TreninkyTydenComponent from "@/components/TreninkyTydenComponent.vue";

export default {
  name: "TreninkView",
  components: {
    TreninkyTydenComponent,
  },
  mounted() {
    if (localStorage.getItem("user") == null) {
      this.$router.push("/login");
    }
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    },
    getUserName(){
      return localStorage.getItem("user");
    }
  }
};
</script>
