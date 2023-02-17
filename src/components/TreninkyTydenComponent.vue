<template>
  <div>
    <div>
      <div>
        <button @click="decreaseDate">Předchozí týden</button>
        <label for="date-selector">Date:</label>
        <input type="date" id="date-selector" v-model="selectedDate" @change="onChangeDate" />
        <button @click="increaseDate">Následující týden</button>
      </div>
      <label for="user-selector">User:</label>
      <select id="user-selector" v-model="selectedUser">
        <option value="">All users</option>
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <button @click="showModal = true">Nový trénink</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div>
          <div><input type="date" id="date-selector-new" v-model="newDate" @change="onChangeNewDate" /></div>
          <div><button @click="closeModal">X</button></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in tableData" :key="index">
              <td><input type="text" v-model="row.col1"></td>
              <td><input type="text" v-model="row.col2"></td>
              <td><input type="text" v-model="row.col3"></td>
              <td><input type="text" v-model="row.col4"></td>
              <td><button @click="removeRow(index)">Delete</button></td>
            </tr>
          </tbody>
        </table>
        <button @click="addRow">Add Row</button>
        <button @click="saveData">Save Data</button>
      </div>
    </div>

    <tbody>
      <div v-for="day in items" :key="day.date">
        <table class="TreninkDay">
          <thead>
            <tr>
              <th colspan="6">{{ getTraningDayHeader(day) }}</th>
            </tr>
          </thead>
          <tr class="w3-blue">
            <td colspan="6"></td>
          </tr>
          <tr v-for="item in day.definition" :key="item.id" :class="!getColor(item.id) ? 'even' : ''">
            <td :width="20">{{ day.definition.indexOf(item) + 1 }}</td>
            <td>{{ item.col1 }}</td>
            <td>{{ item.col2 }}</td>
            <td>{{ item.col3 }}</td>
            <td>{{ item.col4 }}</td>
            <td :width="40"><img :src="getResponseIcon(day.response.at(day.definition.indexOf(item)).type)" :width="32"
                :height="32" /></td>
          </tr>
        </table>
      </div>
    </tbody>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      users: [],
      userId: 0,
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedUser: '',
      showModal: false,
      newDate: new Date().toISOString().substr(0, 10),
      tableData: [
        { col1: "", col2: "", col3: "", col4: "" },
        { col1: "", col2: "", col3: "", col4: "" },
        { col1: "", col2: "", col3: "", col4: "" },
        { col1: "", col2: "", col3: "", col4: "" }
      ],
      jsonData: []
    };
  },
  computed: {

  },
  mounted() {
    this.getListOfTrainingDays();
    axios.get('/api/users').then(response => {
      this.users = response.data;
    });
  },
  methods: {
    getColor(id) {
      return (id % 2) == 0;
    },
    getTraningDayHeader(day) {
      var weekDays = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
      var months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
      return weekDays.at(day.dayOfWeek - 1) + " " + new Date(day.date).getDay() + ". " + months.at(new Date(day.date).getMonth()) + " " + new Date(day.date).getFullYear();
    },
    onChangeDate() {
      console.log('Selected Date:', this.selectedDate);
      this.getListOfTrainingDays();
    },
    decreaseDate() {
      const currentDate = new Date(this.selectedDate);
      const newDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
      this.selectedDate = newDate.toISOString().substr(0, 10);
      this.getListOfTrainingDays();
    },
    increaseDate() {
      const currentDate = new Date(this.selectedDate);
      const newDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      this.selectedDate = newDate.toISOString().substr(0, 10);
      this.getListOfTrainingDays();
    },
    getListOfTrainingDays() {
      axios.get('https://localhost:7210/get-Training-Week?id=1&date=' + this.selectedDate).then(response => {
        this.items = response.data;
      });
    },
    onChangeNewDate() {
      console.log(this.newDate);
    },
    addRow() {
      this.tableData.push({ col1: "", col2: "", col3: "", col4: "" })
    },
    removeRow(index) {
      if (this.tableData.length > 3) {
        this.tableData.splice(index, 1);
      }
      console.log(index);
    },
    saveData() {
      this.jsonData = JSON.stringify(this.tableData);
      console.log(this.jsonData);
      this.tableData = [
        { col1: "", col2: "", col3: "", col4: "" },
        { col1: "", col2: "", col3: "", col4: "" },
        { col1: "", col2: "", col3: "", col4: "" },
        { col1: "", col2: "", col3: "", col4: "" }
      ];
    },
    closeModal() {
      this.showModal = false;
    },
    getResponseIcon(id) {
      if (id === 0) {
        return require('@/assets/q.png');
      } else
        if (id === 1) {
          return require('@/assets/ok.svg');
        } else
          if (id === 2) {
            return require('@/assets/nok.svg');
          }
    }
  }
};
</script>
<style scoped>
.even {
  background-color: #f3f3f3;
}

.TreninkDay {
  min-width: 800px;
  max-width: 900px;
  margin-top: 50px;
  table-layout: fixed;
}

.modal {
  display: block;
  position: fixed;
  z-index: 4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.close-button {
  position: absolute;
  align: right;
  top: 0;
  right: 0;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #555;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
