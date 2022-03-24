<template>
  <div class="form">
    <el-form :model="form" @submit.prevent="login">
      <el-form-item>
        <el-input id="email" v-model="email" type="email" placeholder="Email"
          ><template #prefix>
            <el-icon class="el-input__icon"><message /></el-icon> </template
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          show-password
          ><template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <button type="submit">LOGIN</button>
      </el-form-item>
    </el-form>
    <h4 @click="goToSignup()">CREATE NEW ACCOUNT</h4>
    <h4 @click="goToReset()">FORGOT PASSWORD</h4>
  </div>
</template>

<script>
import { Message, Lock } from "@element-plus/icons-vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp)
export default {
    name: 'LoginForm',
    components: { Message, Lock },
    data() { 
      return { 
        tempType: sessionStorage.getItem("tempType"),
        email: '', 
        password: '', 
      }; 
    },
    methods: {
      async login() {
        const auth = getAuth();
        const docRef = doc(db,this.tempType,this.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          signInWithEmailAndPassword(auth,this.email,this.password)
          .then(() => {
            sessionStorage.setItem("useremail", this.email);
            sessionStorage.setItem("usertype", this.tempType);
            if (this.tempType == "Customers") {
              this.$router.push('/Products');
            } else {
              this.$router.push('/ClinicProfile') 
            }
            this.emitter.emit('loginas', {'userType': this.tempType})
            alert('Successfully logged in');
          }).catch(error => {
            alert(error.message);
          });
        } else {
          alert("No such user");
        }  
      },
      goToSignup() {
        if (this.tempType == "Customers") {
          this.$router.push('./Signup')
        } else {
          this.$router.push('./Signup1')
        }
          
      },
      goToReset() {
          this.$router.push('../ForgotPassword')
      }
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 36px;
  text-align: center;
  width: 30%;
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
  width: 30%;
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
h4 {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
h4:hover {
  cursor: pointer;
}
</style>
