<template>
  <section class="hero">
    <div class="hero-text container">
      <h4>Login as a {{ tempType }}</h4>
      <div>   
        <form @submit.prevent="login">     
          <input       
            type="email"       
            placeholder="Email address..."       
            v-model="email"     
            />     
            <input       
            type="password"       
            placeholder="password..."       
            v-model="password"     
            />     
          <button type="submit">
            Login
          </button>   
        </form> 
        <button @click="goToSignup()">CREATE NEW ACCOUNT</button>
        <button @click="goToReset()">FORGOT PASSWORD</button>
        
      </div>
    </div>
  </section>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp)
export default {
    name: 'LoginForm',
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