<template>
  <div class="form">
    <el-form :model="form" @submit.prevent="register">
      <el-input
        id="email"
        v-model="email"
        type="email"
        placeholder="Email"
        required="true"
        ><template #prefix>
          <el-icon class="el-input__icon"><message /></el-icon> </template
      ></el-input>
      <el-input
        id="password"
        v-model="password"
        type="password"
        placeholder="Password"
        required="true"
        show-password
        ><template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
      <el-input id="name" v-model="name" type="text" placeholder="Name"
        ><template #prefix>
          <el-icon class="el-input__icon"><avatar /></el-icon> </template
      ></el-input>
      <el-input
        id="postalcode"
        v-model="postalcode"
        type="text"
        placeholder="Postal Code"
        required="true"
        ><template #prefix>
          <el-icon class="el-input__icon"><map-location /></el-icon> </template
      ></el-input>
      <div id="centre">
        <button type="submit">SIGN UP</button>
      </div>
    </el-form>
    <h4 @click="goToLogin()">ALREADY HAVE AN ACCOUNT? LOGIN</h4>
  </div>
</template>

<script>
import { Message, Lock, Avatar, MapLocation } from "@element-plus/icons-vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp);

export default {
  name: "SignupForm",
  components: { Message, Lock, Avatar, MapLocation },
  data() {
    return {
      tempType: sessionStorage.getItem("tempType"),
      email: "",
      name: "",
      postalcode: "",
      password: "",
    };
  },
  methods: {
    register() {
      if (validpassword(this.password)) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            addUsertoFs(this.email, this.name, this.postalcode, this.tempType);
            alert("Successfully registered!");
            sessionStorage.setItem("useremail", this.email);
            sessionStorage.setItem("usertype", this.tempType);
            this.$router.push("/Products");
            this.emitter.emit("loginas", { userType: this.tempType });
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert("Your password should contain 8-20 characters, as well as a mix of letters and numbers")
      }

      function validpassword(password) {
        if (password.length > 8 && password.length < 20 && /\d/.test(password) && /[A-Za-z]/.test(password)) {
          return true
        }
        return false
      }

      async function addUsertoFs(email, name, postalcode, type) {
          try {
          const docRef = await setDoc(doc(db, type, email), {
            email: email,
            name: name,
            postalcode: postalcode,
            cart: { total: 0, products: {} },
            purchasehistory: {},
          });
          console.log(docRef);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    },
    goToLogin() {
      this.$router.replace("./Login");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  text-align: center;
  width: 30%;
}
.el-input,
.el-row {
  margin-bottom: 10px;
  justify-content: center;
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
#centre {
  display: flex;
  justify-content: center;
  align-items: center;
}
h4 {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
h4:hover {
  cursor: pointer;
}
</style>
