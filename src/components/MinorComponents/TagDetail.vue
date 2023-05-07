<template>
  <div v-if="isLoading" class="loading"></div>
  <div v-else>
    <ul>
      <li>
        <div class="header">
          <h2 style="text-align: left; color: #3498db;">Name:</h2>
          <h2>{{ tag.name }}</h2>
        </div>
        <div class="item-details">
          <p>
            <strong>Color:</strong>
            <span :style="{ backgroundColor: tag.color }"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
          </p>
          <p><strong>Description:</strong> {{ tag.description }}</p>
        </div>
        <div class="header" style="text-align: left; color: #3498db;">
          <h2>Activities</h2>
        </div>
        <div class="body">
          <ul>
            <li v-for="activity in activities" :key="activity.id">
              <h3>{{ activity.name }}</h3>
              <div
                style="background-color: #3498db; height: 5px; width: 100%"
              ></div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <p style="margin-top: 10px">{{ activity.definition }}</p>
                <img
                style="margin-left: 10px"
                :src="
                  getResponseIcon(activity.response.response
                  )
                "
                :width="32"
                :height="32"
              />
              </div>
            </li>
          </ul>
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
    date: {
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
      activities: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchTag();
  },
  methods: {
    async fetchTag() {
      try {
        var response = await Api.getActivityDescription(this.id);

        var _activities = await Api.getActivitySubActivities(this.id, 1, this.date);
        this.isLoading = false;
        this.tag = response.data;
        this.activities = _activities.data;
      } catch (error) {
        console.error(error);
      }
    },
    getResponseIcon(id) {
      if (id === 0) {
        return require("../../assets/q.png");
      } else if (id === 1) {
        return require("../../assets/ok.svg");
      } else if (id === 2) {
        return require("../../assets/nok.svg");
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
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 20px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.item-header h3 {
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>