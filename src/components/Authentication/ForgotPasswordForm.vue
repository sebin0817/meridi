<template>
  <section class="form">
    <div v-if="!validemail">
      <h4 id="centre">To reset password, please enter your email:</h4>
      <div>
        <form id="forgot-password-form" @submit.prevent="forgotpassword">
          <el-input id="email" v-model="email" type="email" placeholder="Email"
            ><template #prefix>
              <el-icon class="el-input__icon"><message /></el-icon> </template
          ></el-input>
          <div id="centre">
            <button type="submit">RESET</button>
          </div>
        </form>
        <h4 id="login" @click="goToLogin()">BACK TO LOGIN</h4>
      </div>
    </div>
  </section>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Message } from "@element-plus/icons-vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp);
export default {
  name: "ForgotPasswordForm",
  components: { Message },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async forgotpassword() {
      const userDoc = doc(db, "Customers", this.email);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.email).then(() => {
          alert("A password reset link has been sent to your email.");
          this.$router.push("/");
        });
      } else {
        alert(
          "This email is not registered with meridi. Please try with another email."
        );
        document.getElementById("forgot-password-form").reset();
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
.el-select {
  width: 50ch;
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
  font-family: "Nunito Sans", sans-serif;
}
#login {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
#login:hover {
  cursor: pointer;
}
</style>
