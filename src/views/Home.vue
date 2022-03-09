<template>
  <section class="hero">
    <div class="hero-text container">
      <Title :msg="msg" />
      <UserType />
      <!--section>
        
        <img id="logo" src="@/assets/meridi.png" alt="" />
        <div id="slogan">
          TCM at your fingertips
        </div>
        <hr />
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="item">
              <img id="buyer" src="@/assets/buyer.png" alt="" />
              <p>
                Get premier TCM products and quality TCM healthcare services
              </p>
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
      </section-->
    </div>
  </section>
</template>

<script>
import Title from "@/components/Title.vue";
import UserType from "@/components/UserType.vue";
export default {
  name: "Home",
  components: { Title, UserType },
  data() {
    return {
      msg: "TCM at your fingertips",
    };
  },
  /*methods: {
      toCustomerLogin() {
        this.$router.push({
          name: "Login",
          params: {
            id: "Customer"
          }
        })
        console.log("user is a Customer")
      },
      toClinicLogin() {
        this.$router.push({
          name:"Login",
          params: {
            id: "Clinic"
          }
        })
        console.log("user is a Clinic")
      },
  }*/
};
</script>

<style scoped>
.hero {
  background-image: url("../assets/TCM-trans.png");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}
/*#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
#slogan {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
hr {
  border: 1px solid #ffcc00;
  width: 20%;
  margin: auto;
  margin-top: 30px;
}
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
}*/
</style>
