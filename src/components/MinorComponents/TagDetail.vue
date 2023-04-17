<template>
  <div>
    <h2>{{ tag.name }}</h2>
    <ul>
      <li v-for="item in tag.items" :key="item.id">
        <div class="item-header">
          <h3>{{ item.name }}</h3>
          <div class="item-controls">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
        <div class="item-details">
          <p><strong>Description:</strong> {{ item.description }}</p>
          <p>
            <strong>Color:</strong>
            <span :style="{ backgroundColor: item.color }"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
          </p>
          <p><strong>Start Date:</strong> {{ item.start_date }}</p>
          <p><strong>End Date:</strong> {{ item.end_date }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
  
<script>
import * as Api from "../../API/api";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tag: {
        name: "",
        items: [],
      },
    };
  },
  created() {
    this.fetchTag();
  },
  methods: {
    async fetchTag() {
      try {
        var response = await Api.getActivityDetail(this.id);
        this.tag = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
  
  <style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #f2f2f2;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.item-controls button {
  background-color: transparent;
  border: none;
  color: #555;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
}

.item-details p {
  margin: 5px 0;
}

.item-details p strong {
  font-weight: bold;
  margin-right: 5px;
}

.item-details p span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>