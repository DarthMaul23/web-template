<template>
    <div v-if="showModal" class="modalBg">
        <div class="modalWindow">
            <div :style="{ backgroundColor: headerColor }" class="modal-header">
                <h2 class="modal-title">{{ title }}</h2>
                <button @click="closeModal" class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true,
      },
      headerColor: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style>
  .modalBg {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modalWindow{
    min-width: 250px;
    min-height: 900px;
    width: 900px;
    max-width: 80%;
    max-height: 80%;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 100%;
    color: #fff;
  }
  
  .modal-title {
    margin: 0;
    font-size: 20px;
    align-content: center;
  }
  
  .modal-close {
    background-color: transparent;
    color: #fff;
    border: none;
    font-size: 25px;
    cursor: pointer;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
  }
  </style>
  