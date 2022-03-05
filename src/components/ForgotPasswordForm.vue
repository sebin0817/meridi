<template>
  <section class="hero">
    <div v-if="!validemail" class="hero-text container">
      <h4>Please enter your email address</h4>
      <div>   
        <form id="forgot-password-form" @submit.prevent="forgotpassword">     
          <input       
            type="email"       
            placeholder="Email address..."       
            v-model="email"     
            />     
          <button type="submit">
            RESET
          </button>   
        </form> 
      </div>
    </div>
  </section>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    name: 'ForgotPasswordForm',
    data() { 
      return { 
        email: '', 
        password: '',
      }; 
    },
    methods: {
      async forgotpassword() {
        const userDoc = doc(db,"Customers",this.email);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const auth = getAuth();
          sendPasswordResetEmail(auth,this.email)
          .then(() => {
            alert("A password reset link has been sent to your email.")
            this.$router.push('/');
          })
        } else {
          alert("This email is not registered with meridi. Please try with another email.")
          document.getElementById('forgot-password-form').reset();
        } 
      },
    },
};
</script>

<style scoped>
.hero {
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
</style>