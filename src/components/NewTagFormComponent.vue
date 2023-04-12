<template>
  <div>
    <form @submit.prevent="submitForm">
      <table>
        <tr>
          <th>Název Aktivity</th>
          <th>Barva</th>
          <th>Popis</th>
        </tr>
        <tr>
          <td>
            <input id="name" type="text" v-model="form.name" />
          </td>
          <td>
            <input id="color-picker" type="color" v-model="form.color" />
          </td>
          <td>
            <textarea id="description" v-model="form.description"></textarea>
          </td>
        </tr>
      </table>
      <div style="width:100%; align-content: center; margin-top: 15px; margin-bottom: 5px;">
          <SearchDropdown
            :label="test"
            :items="users"
            :selectedItems="form.selectedUsers"
            @update:selectedItems="updateSelectedItems"
            >Přidat uživatele:</SearchDropdown>
      </div>
      <div style="margin-top: 15px;">
        <b style="left:0;">Uživatele v aktivitě:</b>
        <table>
          <tr>
            <th>Id</th>
            <th>Uživatel</th>
            <th>Opakování:</th>
            <th>Od:</th>
            <th>Do:</th>
            <th>Sloupec</th>
            <th>Smazat</th>
          </tr>
          <tr v-for="(item, index) in form.selectedUsers" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <select id="repetition" v-model="item.repetition">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Every two weeks</option>
                <option value="monthly">Monthly</option>
              </select>
            </td>
            <td>
              <input id="date-from" type="date" v-model="item.dateFrom" />
            </td>
            <td>
              <input id="date-to" type="date" v-model="item.dateTo" />
            </td>
            <td>
              <select id="column" v-model="item.column">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </td>
            <td>
              <button @click="removeUser(item)" class="button css-w3-red">
                Delete
              </button>
            </td>
          </tr>
        </table>
      </div>
      <button id="save_button" type="submit" class="button css-w3-orange">
        Save
      </button>
    </form>
  </div>
  <!--
      <ul>
        <li v-for="item in form.selectedUsers" :key="item.id">{{ item.name }}<button @click="removeUser(item)">X</button></li>
      </ul> -->
</template>

<script>
import SearchDropdown from "@/components/MinorComponents/SearchDropdown.vue";

export default {
  components: {
    SearchDropdown,
  },
  data() {
    return {
      form: {
        name: "",
        color: "#ffffff",
        from: "",
        to: "",
        repetition: "daily",
        description: "",
        selectedUsers: [],
      },
      users: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
        { id: 3, name: "User 3" },
        { id: 4, name: "User 4" },
        { id: 5, name: "User 5" },
      ],
      search: "",
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
      // Handle form submission here
    },
    updateSelectedItems(newSelectedItems) {
      this.form.selectedUsers = newSelectedItems;
    },
    removeUser(item) {
      const index = this.form.selectedUsers.findIndex((u) => u.id === item.id);
      if (index !== -1) {
        this.form.selectedUsers.splice(index, 1);
      }
    },
  },
};
</script>
<style>
.selected-users {
  margin-top: 16px;
  text-align: center;
}

.element1 {
  display: inline-block;
  align: right;
}
.element2 {
  display: inline-block;
  vertical-align: middle; /* To vertically align the elements within the wrapper */
}

.element1 {
  float: right;
  width: 30%; /* You can adjust the width of the elements as per your requirement */
}

.element2 {
  float: left;
  width: 70%; /* You can adjust the width of the elements as per your requirement */
}

.selected-users ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selected-users li {
  display: inline-block;
  margin-right: 8px;
  padding: 4px 8px;
  background-color: #ccc;
  border-radius: 4px;
  color: #eb8b24;
  font-size: 14px;
}

button {
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
}

#save_button {
  margin-top: 20px;
}

.css-w3-red {
  background-color: #f32c21;
}

.css-w3-red:hover {
  background-color: #d44a43;
}

.css-w3-orange {
  background-color: #f3d021;
}

.css-w3-orange:hover {
  background-color: #d4b243;
}
</style>