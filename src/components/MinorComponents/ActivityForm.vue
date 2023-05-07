<template>
  <div class="activity-form">
    <b>Aktivity:</b>
    <table>
      <tr>
        <th>Název Aktivity</th>
        <th>Popis Aktivity</th>
        <th></th>
      </tr>
      <tr
        v-for="item in activities"
        v-bind:key="item.id"
        style="text-align: left; margin-left: 20em"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.definition }}</td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            @click.prevent="removeActivity(item)"
          >
            Smazat
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" v-model="name" class="form-control" />
        </td>
        <td>
          <textarea v-model="definition" class="form-control"></textarea>
        </td>
        <td>
          <button
            type="submit"
            class="btn btn-primary btn-green"
            @click.prevent="addActivity"
          >
            Přidat
          </button>
        </td>
      </tr>
    </table>
    <span v-if="warningMessage" style="color: red;">{{ warningMessage }}</span>
  </div>
</template>
  
  <script>
export default {
  props: {
    activitiesList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      definition: "",
      activities: this.activitiesList,
      warningMessage: "",
    };
  },
  methods: {
    addActivity() {
      if (this.name.trim() !== "") {
        this.warningMessage = "";
        const newActivity = {
          id: "",
          name: this.name,
          definition: this.definition,
          response: { id: "", response: 0 },
        };
        this.$emit("activity-added", newActivity);
        this.name = "";
        this.definition = "";
      }else{
        this.warningMessage = "Zadejte název aktivity";
      }
    },
    removeActivity(activity) {
      const index = this.activities.findIndex(
        (item) => item.id === activity.id
      );
      if (index !== -1) {
        this.activities.splice(index, 1);
        this.$emit("activity-removed", activity);
      }
    },
  },
};
</script>
  
  <style>
.activity-form {
  margin-top: 25px;
}
.form-group {
  margin-bottom: 1rem;
}
.btn-green {
  background-color: green;
}
.btn-danger {
  background-color: rgb(162, 16, 0);
}
</style>
  