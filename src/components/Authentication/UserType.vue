<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="item">
        <img id="buyer" src="@/assets/buyer.png" alt="" />
        <p>Get premier TCM products and quality TCM healthcare services</p>
        <button @click="toCustomerLogin()">LOGIN as a Customer</button>
      </div></el-col
    >
    <el-col :span="6">
      <div class="item">
        <img id="clinic" src="@/assets/hospital.png" alt="" />
        <p>Expand market reach and promote TCM products and services</p>
        <button @click="toClinicLogin()">LOGIN as a Clinic</button>
      </div></el-col
    >
  </el-row>
</template>
<script>
export default {
  name: "UserType",
  methods: {
    toCustomerLogin() {
      this.$router.push('./Login');
      console.log("user is a Customer");
      sessionStorage.setItem("tempType","Customers");
    },
    toClinicLogin() {
      this.$router.push('./Login');
      console.log("user is a Clinic");
      sessionStorage.setItem("tempType","Clinics");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.el-row {
  justify-content: space-evenly;
}
.item {
  text-align: center;
}
#buyer,
#clinic {
  height: 100px;
  width: 100px;
  margin-top: 50px;
  margin-bottom: 10px;
}
button {
  margin: auto;
  margin-top: 10px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}
button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}
</style>