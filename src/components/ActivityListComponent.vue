<template>
  <div>
    <div class="filter">
      <lable>Hledat: </lable>
      <input type="text" v-model="search" />
      <lable>Položek na stránce: </lable>
      <select v-model="itemsPerPage">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <button @click="showModal = true" class="button">Nová Aktivita</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Název</th>
          <th>Popis</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.tags" :key="item.id" class="item.id%2">
          <td>
            {{ (this.currentPage - 1) * 50 + (data.tags.indexOf(item) + 1) }}
          </td>
          <td>
            <a style="background-color: {{ item.color }};">{{ item.name }}</a>
          </td>
          <td>{{ truncatedDescription(item.description) }}</td>
          <td>
            <router-link :to="{ name: 'detail', params: { id: item.id } }">
              <button class="button css-w3-orange">Details</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <a
        v-for="pageNumber in numberOfPages"
        :key="pageNumber"
        @click="currentPage = pageNumber"
        class="pageNo"
      >
        {{ pageNumber }}
    </a>
    </div>
    <ModalComponent
      :show-modal="showModal"
      header-color="#3399ff"
      title="Nová aktivita"
      @close="showModal = false"
    >
      <NewTagFormComponent :list-of-users="listOfUsers" />
    </ModalComponent>
  </div>
</template>

<script>
import axios from "axios";
import ModalComponent from "@/components/ModalComponent.vue";
import NewTagFormComponent from "@/components/NewTagFormComponent.vue";

export default {
  components: {
    ModalComponent,
    NewTagFormComponent,
  },
  data() {
    return {
      showModal: false,
      search: "",
      data: {},
      numberOfPages: 0,
      currentPage: 1,
      itemsPerPage: 50,
      options: [25, 50, 75, 100],
      listOfUsers:[],
    };
  },
  mounted() {
    if (localStorage.getItem("user") == null) {
      this.$router.push("/login");
    }
    console.log(localStorage.user);
    this.getListOfUsers();
    this.getActivities();
    this.getNumberOfPages();
  },
  watch: {
    currentPage() {
      this.getActivities();
    },
    itemsPerPage() {
      this.getActivities();
      this.getNumberOfPages();
    },
    search() {
      this.currentPage = 1;
      this.getActivities();
      this.getNumberOfPages();
    },
    data() {
      this.getNumberOfPages();
    },
  },
  methods: {
    getListOfUsers(){
      axios
        .get(
          `https://localhost:7210/get-Users-For-Trainer?trenerName=${localStorage.user}`
        )
        .then((response) => {
          response.data.forEach(item => {
            this.listOfUsers.push({id: item.id, name: item.userName});
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getActivities() {
      axios
        .get(
          `https://treninkovy-denik-api.azurewebsites.net/get-Activity-List?userId=0&pageNo=${this.currentPage}&itemsPerPage=${this.itemsPerPage}&search=${this.search}`
        )
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getNumberOfPages() {
      if (this.data.noRecords !== undefined) {
        this.numberOfPages = Math.ceil(this.data.noRecords / this.itemsPerPage);
      } else {
        this.numberOfPages = this.itemsPerPage;
      }
    },
    truncatedDescription(description) {
      if (description.length > 50) {
        return `${description.substring(0, 50)}...`;
      } else {
        return description;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter {
  padding: 20px;
  padding-left: 10px;
}

.pagination {
  margin-top: 20px;
}

.pageNo {
  margin-left: 10px;
}

.table {
  text-align: left;
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
  background-color: #2196f3;
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
</style>
