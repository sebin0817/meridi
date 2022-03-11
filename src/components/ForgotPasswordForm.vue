<template>
  <section class="hero">
    <div v-if="!validemail" class="hero-text container">
      <img id="logo" src="@/assets/meridi.png" alt="" />
      <div id="slogan">TCM at your fingertips</div>
      <hr />
      <h4 id="centre">To reset password, enter your email address:</h4>
      <div>
        <form id="forgot-password-form" @submit.prevent="forgotpassword">
          <el-input
            type="email"
            placeholder="Email address..."
            v-model="email"
          />
          <div id="centre">
            <button type="submit">RESET</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
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
  width: 50ch;
}
#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 54%;
}
#slogan {
  text-align: center;
  font-size: 29.8px;
  font-weight: bold;
}
hr {
  border: 1px solid #ffcc00;
  width: 55%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 30px;
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
