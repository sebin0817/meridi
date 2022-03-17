<template>
  <section class="form">
    <div v-if="!validemail" class="hero-text container">
      <h4 id="centre">To reset password, enter your email:</h4>
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
      </div>
    </div>
  </section>
</template>

<script>
import { Message } from "@element-plus/icons-vue";
import { doc, getDoc } from "firebase/firestore";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  components: { Message },

  name: "ForgotPasswordForm",
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
  margin-top: 10px;
  justify-content: center;
}
.el-select {
  width: 50ch;
}
button {
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 9px;
  border-radius: 4px;
  margin-top: 10px;
  align-items: center;
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
</style>
