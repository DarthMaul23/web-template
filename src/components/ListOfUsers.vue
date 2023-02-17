<template>
  <div class="listOfUsers">
    <input type="text" v-model="searchTerm" placeholder="Search by name or date">
    <table>
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
table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
}

thead {
    background: #0088f8;
    font-family: Arial;
    color: #ffffff;
    font-size: 20px;
    padding: 1px 10px 1px 10px;
    text-decoration: none;
}

td {
    display: table-cell;
    vertical-align: inherit;
}

#tbodyA {
    font-size: 20px;
    height: 30px;
    font-family: Arial;
    color: black;
    background-color: #f7f9fc;
}

#tbodyB {
    font-size: 20px;
    height: 30px;
    font-family: Arial;
    color: black;
    background-color: #e3e6ea;
}
</style>
