<template>
  <div>
    <div>
      <div>
        <button @click="decreaseDate" class="button css-w3-blue">
          Předchozí týden
        </button>
        <label for="date-selector">Date:</label>
        <input
          type="date"
          id="date-selector"
          v-model="selectedDate"
          @change="onChangeDate"
        />
        <button @click="increaseDate" class="button css-w3-blue">
          Následující týden
        </button>
        <button
          @click="getTrainingPlanPDF"
          target="_blank"
          class="button css-w3-blue"
          style="align-self: right"
        >
          Tisk
        </button>
      </div>
      <label for="user-selector">User:</label>
      <select id="user-selector" v-model="selectedUser">
        <option value="">All users</option>
        <option v-for="user in users" :value="user.id" :key="user.id">
          {{ user.name }}
        </option>
      </select>
      <button @click="showModal = true" class="button css-w3-blue">
        Nový trénink
      </button>
    </div>
    <ModalComponent
      :show-modal="showModal"
      header-color="#3399ff"
      title="Nový trenink"
      @close="showModal = false"
    >
      <div class="container">
        <input
          class="centered-input"
          type="date"
          id="date-selector-new"
          v-model="newDate"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ index + 1 }}</td>
            <td><input type="text" class="cell-input" v-model="row.col1" /></td>
            <td><input type="text" class="cell-input" v-model="row.col2" /></td>
            <td><input type="text" class="cell-input" v-model="row.col3" /></td>
            <td><input type="text" class="cell-input" v-model="row.col4" /></td>
            <td>
              <button @click="removeRow(1, index)" class="button css-w3-red">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addRow(1)" class="button css-w3-orange">Add Row</button>
      <button @click="saveData(1)" class="button css-w3-green">
        Save Data
      </button>
    </ModalComponent>

    <ModalComponent
      :show-modal="showModal2"
      header-color="#3399ff"
      title="Úprava treninku"
      @close="showModal2 = false"
    >
      <div class="container">
        <input
          class="centered-input"
          type="date"
          id="date-selector-new"
          v-model="editDate"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableDataEdit" :key="index">
            <td>{{ index + 1 }}</td>
            <td><input type="text" class="cell-input" v-model="row.col1" /></td>
            <td><input type="text" class="cell-input" v-model="row.col2" /></td>
            <td><input type="text" class="cell-input" v-model="row.col3" /></td>
            <td><input type="text" class="cell-input" v-model="row.col4" /></td>
            <td>
              <button @click="removeRow(2, index)" class="button css-w3-red">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addRow(2)" class="button css-w3-orange">Add Row</button>
      <button @click="saveData(2)" class="button css-w3-green">
        Save Data
      </button>
    </ModalComponent>
    <ModalComponent
      :show-modal="showModal3"
      header-color="#3399ff"
      title="Detail Aktivity"
      @close="showModal3 = false"
    >
      <tag-detail :id="tagId" :date="tagDate"/>
    </ModalComponent>
    <div v-if="isLoading" class="loading"></div>
    <tbody v-else>
      <div v-for="day in items" :key="day.date">
        <table class="TreninkDay">
          <thead>
            <tr>
              <th colspan="5">{{ getTraningDayHeader(day) }}</th>
              <th>
                <button
                  @click="showEditModal(day.trainingId, day.date)"
                  class="button css-w3-blue"
                >
                  Upravit
                </button>
              </th>
            </tr>
          </thead>
          <tr v-if="day.activity.length > 0" class="w3-blue">
            <td colspan="6"><b>Aktivity</b></td>
          </tr>
          <!--
            <tr v-for="item in day.activity" :key="item.id">
            <td>{{ day.activity.indexOf(item)+1}}</td>
            <td><a class="tag" @click="showDetailModal(item.id)">{{ item.name }}</a></td>
          </tr>
        -->
          <tr v-for="item in day.activity" :key="item.id">
            <td>{{ day.activity.indexOf(item) + 1 }}</td>
            <td colspan="5">
              <a
                class="tag"
                :style="{ backgroundColor: item.color }"
                @click="showDetailModal(item.tagAsociationId, day.date)"
                >{{ item.name }}</a
              >
            </td>
          </tr>
          <tr class="w3-blue" v-if="day.training.definition.length > 0">
            <td colspan="6"><b>Instrukce</b></td>
          </tr>
          <tr
            v-for="item in day.training.definition"
            :key="item.id"
            :class="!getColor(item.id) ? 'even' : ''"
          >
            <td style="width: 30px">
              {{ day.training.definition.indexOf(item) + 1 }}
            </td>
            <td>{{ getTagOrText(item.col1) }}</td>
            <td>{{ getTagOrText(item.col2) }}</td>
            <td>{{ getTagOrText(item.col3) }}</td>
            <td>{{ getTagOrText(item.col4) }}</td>
            <td :width="40">
              <div v-if="isAdmin()">
                <img
                :src="
                  getResponseIcon(
                    day.training.response?.at(
                      day.training.definition.indexOf(item)
                    ).response
                  )
                "
                :width="32"
                :height="32"
              />
              </div>
              <div v-else>
                  <table>
                    <tr>
                      <td>
                        <img
                          style="margin-left: 10px"
                          :src="getResponseIcon(0)"
                          :width="32"
                          :height="32"
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          value="1"
                          :name="item.id"
                          @click="handleResponseClick(item, 0)"
                          v-model="item.response"
                        />
                      </td>
                      </tr>
                      <tr>
                      <td>
                        <img
                          style="margin-left: 10px"
                          :src="getResponseIcon(1)"
                          :width="32"
                          :height="32"
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          value="2"
                          :name="item.id"
                          @click="handleResponseClick(item, 1)"
                          v-model="item.response"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          style="margin-left: 10px"
                          :src="getResponseIcon(2)"
                          :width="32"
                          :height="32"
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          value="3"
                          :name="item.id"
                          @click="handleResponseClick(item, 2)"
                          v-model="item.response"
                        />
                      </td>
                    </tr>
                  </table>
                </div>
            </td>
          </tr>
        </table>
      </div>
    </tbody>
  </div>
</template>
<script>
import axios from "axios";
import ModalComponent from "@/components/ModalComponent.vue";
import TagDetail from "./MinorComponents/TagDetail.vue";
import * as Api from "../API/api";

export default {
  components: {
    ModalComponent,
    TagDetail,
  },
  data() {
    return {
      isLoading: true,
      items: [],
      itemsEdit: [],
      users: [],
      userId: 1,
      tagId: "",
      tagDate: "",
      editTreninkId: 0,
      editTreninkDate: "",
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedUser: "",
      showModal: false,
      showModal2: false,
      showModal3: false,
      newDate: new Date().toISOString().substr(0, 10),
      editDate: new Date().toISOString().substr(0, 10),
      tableData: [{ id: 1, col1: "", col2: "", col3: "", col4: "" }],
      tableDataEdit: [],
      jsonData: [],
    };
  },
  computed: {},
  mounted() {
    this.getListOfTrainingDays();
    /*
    axios.get("/api/users").then((response) => {
      this.users = response.data;
    });
    */
    const today = new Date();
    const monday = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    this.selectedDate = monday.toISOString().slice(0, 10);
  },
  methods: {
    getColor(id) {
      return id % 2 == 0;
    },
    getTraningDayHeader(day) {
      var weekDays = [
        "Pondělí",
        "Úterý",
        "Středa",
        "Čtvrtek",
        "Pátek",
        "Sobota",
        "Neděle",
      ];
      var months = [
        "Leden",
        "Únor",
        "Březen",
        "Duben",
        "Květen",
        "Červen",
        "Červenec",
        "Srpen",
        "Září",
        "Říjen",
        "Listopad",
        "Prosinec",
      ];
      return (
        weekDays.at(day.dayOfWeek - 1) +
        " " +
        new Date(day.date).getDate() +
        ". " +
        months.at(new Date(day.date).getMonth()) +
        " " +
        new Date(day.date).getFullYear()
      );
    },
    onChangeDate() {
      this.isLoading = true;
      this.getListOfTrainingDays();
    },
    decreaseDate() {
      this.isLoading = true;
      const currentDate = new Date(this.selectedDate);
      const newDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
      this.selectedDate = newDate.toISOString().substr(0, 10);
      this.getListOfTrainingDays();
    },
    increaseDate() {
      this.isLoading = true;
      const currentDate = new Date(this.selectedDate);
      const newDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      this.selectedDate = newDate.toISOString().substr(0, 10);
      this.getListOfTrainingDays();
    },
    async getListOfTrainingDays() {
      let data = await Api.getTrainingWeek(this.userId, this.selectedDate);
      this.isLoading = false;
      this.items = data;
      this.itemsEdit = data;
    },
    async getTrainingPlanPDF() {
      await axios
        .get(
          "https://localhost:7210/get-Training-WeekPDF?id=" +
            this.userId +
            "&date=" +
            this.selectedDate,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileWindow = window.open(fileURL);

          if (!fileWindow) {
            alert("Please disable your popup blocker and try again.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to generate PDF file.");
        });
    },
    addRow(type) {
      if (type === 1) {
        this.tableData.push({
          id: this.tableData.length + 1,
          col1: "",
          col2: "",
          col3: "",
          col4: "",
        });
      } else if (type === 2) {
        this.tableDataEdit.push({
          id: this.tableData.length + 1,
          col1: "",
          col2: "",
          col3: "",
          col4: "",
        });
      }
    },
    removeRow(type, index) {
      if (type === 1) {
        if (this.tableData.length > 1) {
          this.tableData.splice(index, 1);
        }
      } else if (type === 2) {
        this.tableDataEdit.splice(index, 1);
        if (this.tableDataEdit.length === 0) {
          this.tableDataEdit.push({
            id: this.tableData.length + 1,
            col1: "",
            col2: "",
            col3: "",
            col4: "",
          });
        }
      }
    },
    async saveData(type) {
      if (type === 1) {
        let _responses = [];

        for (let i = 0; i < this.tableData.length; i++) {
          _responses.push({ response: 0 });
        }

        let data = { definitions: this.tableData, responses: _responses };

        this.tableData = [{ id: 0, col1: "", col2: "", col3: "", col4: "" }];

        await Api.createNewTraining(this.userId, this.newDate, data);
      } else if (type === 2) {
        await this.updateTraining();
      }

      this.getListOfTrainingDays();
    },
    async updateTraining() {
      if (this.showModal2) {
        let responses = [];
        for (let i = 0; i < this.tableDataEdit.length; i++) {
          responses.push({ type: 0 });
        }
        let data = { definitions: this.tableDataEdit, responses: responses };

        await Api.editTraining(this.editTreninkId, data);
      }
    },
    getTagOrText(value) {
      if (this.isGuid(value)) {
        let tag = `<button onclick="openModal('${value}')">Open Modal</button>`;
        return tag.outerHTML;
      }
      return value;
    },
    isGuid(str) {
      const guidRegex =
        /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
      return guidRegex.test(str);
    },
    showEditModal(trainingId, treninkDate) {
      this.showModal2 = true;
      this.editTreninkId = trainingId;
      this.treninkDate = treninkDate;
      this.editDate = treninkDate;
      this.tableDataEdit = this.itemsEdit.find(
        (x) => x.trainingId === trainingId
      ).definition;
    },
    showDetailModal(tagId,date) {
      this.showModal3 = true;
      this.tagId = tagId;
      this.tagDate = date;
    },
    closeModal(type) {
      if (type === 1) {
        this.showModal = false;
        this.tableData = [{ id: 0, col1: "", col2: "", col3: "", col4: "" }];
      } else if (type === 2) {
        this.showModal2 = false;
        this.getListOfTrainingDays();
      }
    },
    getResponseIcon(id) {
      if (id === 0) {
        return require("../assets/q.png");
      } else if (id === 1) {
        return require("../assets/ok.svg");
      } else if (id === 2) {
        return require("../assets/nok.svg");
      }
    },
    isAdmin() {
      if (localStorage.getItem("admin") == "true") {
        return true;
      } else {
        return false;
      }
    },
    handleResponseClick(item, response){
      Api.setTreninkResponse(item.id, response);
    }
  },
};
</script>
<style scoped>
.even {
  background-color: #f3f3f3;
}

.TreninkDay {
  min-width: 450px;
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

.cell-input {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  box-shadow: none;
  font-size: inherit;
}

.container {
  display: flex;
  align-items: center; /* align items vertically */
  justify-content: space-between; /* align items horizontally with space between */
  padding: 10px;
  background-color: #f2f2f2;
}

.centered-input {
  flex: 1; /* take up remaining space */
  text-align: center; /* center the input text */
  margin-right: 10px; /* add some spacing to the right of the input */
}

.right-button {
  background-color: #b3b3b3;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
  background-color: #2196f3;
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

.button:hover {
  background-color: #0b7dda;
  cursor: pointer;
}

.button:active {
  background-color: #0b7dda;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.css-w3-blue {
  background-color: #2196f3;
}

.css-w3-red {
  background-color: #f32c21;
}

.css-w3-red:hover {
  background-color: #d44a43;
}

.css-w3-orange {
  background-color: #f3a710;
}

.css-w3-orange:hover {
  background-color: #b3904a;
}

.css-w3-green {
  background-color: #6ce11e;
}

.css-w3-green:hover {
  background-color: #83bc5c;
}

.tag {
  min-width: 250px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  border-radius: 5px;
}

.tag:hover {
  background-color: rgb(109, 179, 109);
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
