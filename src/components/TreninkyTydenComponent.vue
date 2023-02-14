<template>
  <div>
    <div>
      <label for="date-selector">Date:</label>
      <input type="date" id="date-selector" v-model="selectedDate" />
      <label for="user-selector">User:</label>
      <select id="user-selector" v-model="selectedUser">
        <option value="">All users</option>
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.date }}</td>
          <td>{{ item.name }}</td>
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
      users: [],
      selectedDate: '',
      selectedUser: ''
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        if (this.selectedDate && item.date !== this.selectedDate) {
          return false;
        }
        if (this.selectedUser && item.user_id !== this.selectedUser) {
          return false;
        }
        return true;
      });
    }
  },
  mounted() {
    axios.get('/api/items').then(response => {
      this.items = response.data;
    });
    axios.get('/api/users').then(response => {
      this.users = response.data;
    });
  }
};
</script>
