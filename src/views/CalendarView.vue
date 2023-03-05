<template>
  <div class="CalendarView">
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
                  <span>Uživatel: <strong></strong></span>
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
          <a class="w3-bar-item w3-button">SEZNAM ATLETŮ</a>
          </router-link>
          <router-link :to="{ name: 'newUser'}">
          <a href="atlet_add.php" class="w3-bar-item w3-button">PŘIDAT ATLETA</a>
        </router-link>
        <router-link :to="{ name: 'trainingWeek'}">
          <a href="atlet_add.php" class="w3-bar-item w3-button w3-padding w3-blue">TRENINKY</a>
        </router-link>
          <!--<a href="athlet_page.php?id=" class="w3-bar-item w3-button w3-padding">INFORMACE</a>
            <a href="treninky.php?id=" class="w3-bar-item w3-button w3-padding">TRENINKY</a>
            <a href="rekordy.php?id=&&jmeno=&&prijmeni="class="w3-bar-item w3-button w3-padding">REKORDY</a>-->
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
            <CalendarComponent :events="this.events"/>
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
import CalendarComponent from '@/components/CalendarComponent.vue';

export default {
  name: 'CalendarView',
  components: {
    CalendarComponent
},mounted() {
  if (localStorage.getItem("user")==null){
    this.$router.push('/login');
  }
},
data() {
    return {
      events: [
      {
          id: 1,
          name: "Event 0",
          start: "2023-03-04T10:00:00Z",
          end: "2023-03-04T10:30:00Z",
        },
      {
          id: 1,
          name: "Event 1",
          start: "2023-03-03T10:00:00Z",
          end: "2023-03-03T10:30:00Z",
        },
        {
          id: 2,
          name: "Event 2",
          start: "2023-03-02T10:00:00Z",
          end: "2023-03-02T10:30:00Z",
        },
        {
          id: 3,
          name: "Event 3",
          start: "2023-03-01T10:00:00Z",
          end: "2023-03-01T10:30:00Z",
        },
        {
          id: 4,
          name: "Event 4",
          start: "2023-02-28T10:00:00Z",
          end: "2023-02-28T10:30:00Z",
        },
        {
          id: 5,
          name: "Event 5",
          start: "2023-02-28T05:00:00Z",
          end: "2023-02-28T07:30:00Z",
        },
        {
          id: 6,
          name: "Event 6",
          start: "2023-02-27T10:00:00Z",
          end: "2023-02-27T10:30:00Z",
        }]};
      }
}
</script>
