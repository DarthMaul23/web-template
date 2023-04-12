<template>
  <div class="search-dropdown">
    <b><slot></slot></b>
    <input type="text" v-model="searchText" @input="filterOptions" placeholder="Search..." />
    <ul v-show="showOptions" class="options">
      <li v-for="option in filteredOptions" :key="option" @click="selectOption(option)">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchText: "",
      showOptions: false,
      filteredOptions: [],
    };
  },
  methods: {
    filterOptions() {
      this.showOptions = true;
      this.filteredOptions = this.items.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
          !this.selectedItems.includes({id: item.id, name: item.name})
      );
    },
    selectOption(option) {
      console.log(option);
      this.$emit("update:selectedItems", [...this.selectedItems, {id: option.id, name: option.name, repetition:"", dateFrom:"", dateTo:"", column:1 }]);
      this.searchText = "";
      this.showOptions = false;
    },
  },
};
</script>

<style scoped>
.search-dropdown {
  position: relative;
  width: 90%;
  margin-top: 8px;
}

.search-dropdown input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.search-dropdown ul {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
}
.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
}

.options li {
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  display: block;
}

.options li:hover {
  background-color: #f1f1f1;
}
</style>