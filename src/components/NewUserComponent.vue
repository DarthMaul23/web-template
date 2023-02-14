<template>
  <div>
    <form @submit.prevent="saveData">
      <div>
        <label>First Name:</label>
        <input type="text" v-model="formData.firstName" />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" v-model="formData.lastName" />
      </div>
      <div>
        <label>Birth Date:</label>
        <input type="date" v-model="formData.birthDate" />
      </div>
      <div>
        <label>Sex:</label>
        <select v-model="formData.sex">
          <option value="1">Male</option>
          <option value="2">Female</option>
        </select>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="formData.email" />
      </div>
      <div>
        <label>City:</label>
        <input type="text" v-model="formData.city" />
      </div>
      <div>
        <label>Street:</label>
        <input type="text" v-model="formData.street" />
      </div>
      <div>
        <label>House No:</label>
        <input type="text" v-model="formData.houseNo" />
      </div>
      <div>
        <label>Zip Code:</label>
        <input type="text" v-model="formData.zipCode" />
      </div>
      <div>
        <label>User Phone:</label>
        <input type="text" v-model="formData.userPhone" />
      </div>
      <div>
        <label>Father's Phone:</label>
        <input type="text" v-model="formData.fathersPhone" />
      </div>
      <div>
        <label>Mother's Phone:</label>
        <input type="text" v-model="formData.mothersPhone" />
      </div>
      <div>
        <label>Category:</label>
        <select v-model="formData.category">
          <option value="0">Category 1</option>
          <option value="1">Category 2</option>
        </select>
      </div>
      <div>
        <label>Discipline:</label>
        <select v-model="formData.discipline">
          <option value="0">Discipline 1</option>
          <option value="1">Discipline 2</option>
        </select>
      </div>
      <div>
        <label>Height:</label>
        <input type="number" v-model="formData.height" />
      </div>
      <div>
        <label>Weight:</label>
        <input type="number" v-model="formData.weight" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>

// import axios from 'axios';
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        birthDate: '',
        sex: 2,
        email: '',
        adress: {
          city: '',
          street: '',
          houseNo: '',
          zipCode: ''
        },
        phone: {
          userPhone: '',
          fathersPhone: '',
          mothersPhone: ''
        },
        category: 0,
        discipline: 1,
        height: 0,
        weight: 0
      }
    };
  },
  methods: {
    async saveData() {
      const data = JSON.stringify({
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        birthDate: this.formData.birthDate,
        sex: this.formData.sex,
        email: this.formData.email,
        adress: {
          city: this.formData.adress.city,
          street: this.formData.adress.street,
          houseNo: this.formData.adress.houseNo,
          zipCode: this.formData.adress.zipCode
        },
        phone: {
          userPhone: this.formData.phone.userPhone,
          fathersPhone: this.formData.phone.fathersPhone,
          mothersPhone: this.formData.phone.mothersPhone
        },
        category: this.formData.category,
        discipline: this.formData.discipline,
        height: this.formData.height,
        weight: this.formData.weight
      });
      try {
        console.log(data);
        //await axios.post('/api/endpoint', data);
        console.log('Data saved successfully');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
