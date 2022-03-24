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
      this.$router.push({
        name: "Login",
        params: {
          id: "Customer",
        },
      });
      console.log("user is a Customer");
    },
    toClinicLogin() {
      this.$router.push({
        name: "Login",
        params: {
          id: "Clinic",
        },
      });
      console.log("user is a Clinic");
    },
  },
};
</script>

<style scoped>
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
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 10px;
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
