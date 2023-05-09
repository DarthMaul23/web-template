<template>
  <div class="listOfUsers">
    <input type="text" v-model="searchTerm" placeholder="Search by name or date">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id" class="item.id%2">
          <td>{{ item.id }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>
            <router-link :to="{ name: 'detail', params: { id: item.id } }">
              <button>Details</button>
            </router-link>
          </td>
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
      items: [],
      searchTerm: ''
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  },
  mounted() {
    axios
      .get('https://localhost:7210/get-User-List?trenerId=0')
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
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
