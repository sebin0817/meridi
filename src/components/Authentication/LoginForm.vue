<template>
  <section class="hero">
    <div class="hero-text container">
      <h4>Login as a {{ id }}</h4>
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
        id: "Undefined User",
        email: '', 
        password: '', 
      }; 
    },
    created() {
      this.id = this.$route.params.id;
    },
    methods: {
      async login() {
        const auth = getAuth();
        const docRef = doc(db,this.id + "s",this.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          signInWithEmailAndPassword(auth,this.email,this.password)
          .then(() => {
            sessionStorage.setItem("useremail", this.email);
            sessionStorage.setItem("usertype", this.id + "s");
            if (this.id == "Customer") {
              console.log("success")
              this.$router.push('/Products');
            } else {
              this.$router.push('/ClinicProfile') 
            }
            this.emitter.emit('loginas', {'userType': this.id + "s"})
            alert('Successfully logged in');
          }).catch(error => {
            alert(error.message);
          });
        } else {
          alert("No such user");
        }  
      },
      goToSignup() {
          this.$router.push({
            name: "Signup",
            params: {
              id: this.id + 's'
            }
          })
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