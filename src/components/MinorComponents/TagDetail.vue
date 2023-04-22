<template>
  <div v-if="isLoading" class="loading"></div>
  <div v-else>
    <ul>
      <li>
        <div class="item-header">
          <h3>{{ tag.name }}</h3>
          <div class="item-controls">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
        <div class="item-details">
          <p>
            <strong>Color:</strong>
            <span :style="{ backgroundColor: tag.color }"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
          </p>
          <p><strong>Description:</strong> {{ tag.description }}</p>
          <p><strong>Start Date:</strong> {{ tag.start_date }}</p>
          <p><strong>End Date:</strong> {{ tag.end_date }}</p>
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
      isLoading: true,
    };
  },
  created() {
    this.fetchTag();
  },
  methods: {
    async fetchTag() {
      try {
        var response = await Api.getActivityDetail(this.id);
        this.isLoading = false;
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

.item-header h3{
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>