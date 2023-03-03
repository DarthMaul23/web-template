<template>
  <div>
    <div>
      <div>
        <button @click="decreaseDate" class="button">Předchozí týden</button>
        <label for="date-selector">Date:</label>
        <input type="date" id="date-selector" v-model="selectedDate" @change="onChangeDate" />
        <button @click="increaseDate" class="button">Následující týden</button>
      </div>
      <label for="user-selector">User:</label>
      <select id="user-selector" v-model="selectedUser">
        <option value="">All users</option>
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <button @click="showModal = true" class="button">Nový trénink</button>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div>
          <div><input type="date" id="date-selector-new" v-model="newDate" @change="onChangeDateModal(1)" /></div>
          <div><button @click="closeModal(1)">X</button></div>
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
              <td><button @click="removeRow(1, index)">Delete</button></td>
            </tr>
          </tbody>
        </table>
        <button @click="addRow(1)">Add Row</button>
        <button @click="saveData(1)">Save Data</button>
      </div>
    </div>
    <div v-if="showModal2" class="modal">
      <div class="modal-content">
        <div>
          <div><input type="date" id="date-selector-new" v-model="editDate" @change="onChangeDateModal(2)" /></div>
          <div><button @click="closeModal(2)">X</button></div>
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
            <tr v-for="(row, index) in tableDataEdit" :key="index">
              <td><input type="text" v-model="row.col1"></td>
              <td><input type="text" v-model="row.col2"></td>
              <td><input type="text" v-model="row.col3"></td>
              <td><input type="text" v-model="row.col4"></td>
              <td><button @click="removeRow(2, index)">Delete</button></td>
            </tr>
          </tbody>
        </table>
        <button @click="addRow(2)">Add Row</button>
        <button @click="saveData(2)">Save Data</button>
      </div>
    </div>
    <tbody>
      <div v-for="day in items" :key="day.date">
        <table class="TreninkDay">
          <thead>
            <tr>
              <th colspan="5">{{ getTraningDayHeader(day) }}</th>
              <th><button @click="showEditModal(day.definitionId, day.date)" class="button">Upravit</button></th>
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
            <td :width="40"><img :src="getResponseIcon(day.response?.at(day.definition.indexOf(item)).type)" :width="32"
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
      itemsEdit: [],
      users: [],
      userId: 2,
      editTreninkId: 0,
      editTreninkDate: "",
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedUser: '',
      showModal: false,
      showModal2: false,
      newDate: new Date().toISOString().substr(0, 10),
      editDate: new Date().toISOString().substr(0, 10),
      tableData: [
        { id: 1, col1: "", col2: "", col3: "", col4: "" },
        { id: 2, col1: "", col2: "", col3: "", col4: "" },
        { id: 3, col1: "", col2: "", col3: "", col4: "" },
        { id: 4, col1: "", col2: "", col3: "", col4: "" }
      ],
      tableDataEdit: [],
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
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    this.selectedDate = monday.toISOString().slice(0,10);
  },
  methods: {
    getColor(id) {
      return (id % 2) == 0;
    },
    getTraningDayHeader(day) {
      var weekDays = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
      var months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
      return weekDays.at(day.dayOfWeek - 1) + " " + new Date(day.date).getDate() + ". " + months.at(new Date(day.date).getMonth()) + " " + new Date(day.date).getFullYear();
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
      console.log(this.userId);
      axios.get('https://localhost:7210/get-Training-Week?id=' + this.userId + '&date=' + this.selectedDate).then(response => {
        console.log(response.data);
        this.items = response.data;
        this.itemsEdit = response.data;
      });
    },
    onChangeDateModal(type) {
      if (type === 1) {
        console.log(this.newDate);
      } else
        if (type === 2) {
          console.log(this.editDate);
        }
    },
    addRow(type) {
      if (type === 1) {
        this.tableData.push({ id: this.tableData.length + 1, col1: "", col2: "", col3: "", col4: "" });
      } else
        if (type === 2) {
          this.tableDataEdit.push({ id: this.tableData.length + 1, col1: "", col2: "", col3: "", col4: "" });
        }
    },
    removeRow(type, index) {
      if (type === 1) {
        if (this.tableData.length > 3) {
          this.tableData.splice(index, 1);
        }
      } else
        if (type === 2) {
          this.tableDataEdit.splice(index, 1);
          if (this.tableDataEdit.length === 0) {
            this.tableDataEdit.push({ id: this.tableData.length + 1, col1: "", col2: "", col3: "", col4: "" });
          }
        }
      console.log(index);
    },
    async saveData(type) {
      if (type === 1) {
        let responses = [];

        for (let i = 0; i < this.tableData.length; i++) {
          responses.push({ type: 0 });
        }

        let data = { definitions: this.tableData, responses: responses };
        console.log("Data: " + JSON.stringify(data));

        this.tableData = [
          { id: 0, col1: "", col2: "", col3: "", col4: "" },
          { id: 1, col1: "", col2: "", col3: "", col4: "" },
          { id: 2, col1: "", col2: "", col3: "", col4: "" },
          { id: 3, col1: "", col2: "", col3: "", col4: "" }
        ];
        await axios.post('https://localhost:7210/create-Training', this.userId, this.newDate, 1, JSON.stringify(data));
      } else
        if (type === 2) {
          this.jsonData = JSON.stringify(this.tableDataEdit);
          console.log(this.jsonData);
        }
    },
    showEditModal(treninkId, treninkDate) {
      this.showModal2 = true;
      this.editTreninkId = treninkId;
      this.treninkDate = treninkDate;
      this.editDate = treninkDate;
      this.tableDataEdit = this.itemsEdit.find(x => x.definitionId === treninkId).definition;
    },
    closeModal(type) {
      if (type === 1) {
        this.showModal = false;
      } else
        if (type === 2) {
          this.showModal2 = false;
        }
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

.button {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
}

.button:hover {
  background-color: #0b7dda;
  cursor: pointer;
}

.button:active {
  background-color: #0b7dda;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
