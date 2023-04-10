<template>
<div>
    <table class="table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>First Name</td>
          <td>{{ info.firstName }}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>{{ info.lastName }}</td>
        </tr>
        <tr>
          <td>Birth Date</td>
          <td>{{ info.birthDate }}</td>
        </tr>
        <tr>
          <td>Sex</td>
          <td>{{ info.sex }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ info.email }}</td>
        </tr>
        <tr>
          <td>City</td>
          <td>{{ info.adress && info.adress.city }}</td>
        </tr>
        <tr>
          <td>Street</td>
          <td>{{ info.adress && info.adress.street }}</td>
        </tr>
        <tr>
          <td>House No.</td>
          <td>{{ info.adress && info.adress.houseNo }}</td>
        </tr>
        <tr>
          <td>Zip Code</td>
          <td>{{ info.adress && info.adress.zipCode }}</td>
        </tr>
        <tr>
          <td>User Phone</td>
          <td>{{ info.phone && info.phone.userPhone }}</td>
        </tr>
        <tr>
          <td>Father's Phone</td>
          <td>{{ info.phone && info.phone.fathersPhone }}</td>
        </tr>
        <tr>
          <td>Mother's Phone</td>
          <td>{{ info.phone && info.phone.mothersPhone }}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>{{ info.category }}</td>
        </tr>
        <tr>
          <td>Discipline</td>
          <td>{{ info.discipline }}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{{ info.height }}</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{{ info.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
	
import axios from 'axios';
export default {
  data() {
    return {
      info: {}
    };
  },
  mounted() {
    if (localStorage.getItem("user") == null) {
      this.$router.push('/login');
    }
    axios
      .get('https://treninkovy-denik-api.azurewebsites.net/get-User-Info-By-Id?userId='+this.$route.params.id)
      .then(response => {
        this.info = response.data.info;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  margin-top: 10px;
  padding-top: 10px;
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.table th {
  background-color: #2196F3;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
  padding: 5px;
}

.table td {
  border: 1px solid #e5e5e5;
  padding: 5px;
}

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

tbody tr:nth-child(odd) {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
