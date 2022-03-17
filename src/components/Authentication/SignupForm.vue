<template>
  <section class="hero">
    <div class="hero-text container">
      <div>   
        <form @submit.prevent="register">     
          <input       
            type="email"       
            placeholder="Email address..."       
            v-model="email"     
            />  
          <input       
            type="text"       
            placeholder="Full name..."       
            v-model="name"     
            />
          <input       
            type="text"       
            placeholder="Postal code..."       
            v-model="postalcode"     
            />   
          <input       
            type="password"       
            placeholder="Password..."       
            v-model="password"     
            />     
          <button type="submit">
            SIGN UP
          </button>   
        </form> 
      </div>
    </div>
  </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp)
export default {
    name: 'SignupForm',
    data() { 
      return { 
        id: "Undefined User",
        email: '', 
        name: '',
        postalcode: '',
        password: '', 

      }; 
    },
    created() {
      this.id = this.$route.params.id;
    },
    methods: {
      register() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,this.email,this.password)
          .then(() => {
            addUsertoFs(this.email,this.name,this.postalcode,this.id);
            alert('Successfully registered!');
            sessionStorage.setItem("useremail", this.email);
            sessionStorage.setItem("usertype", this.id);
            if (this.id == "Customer") {
              console.log("success")
              this.$router.push('/Products');
            } else {
              this.$router.push('/Profile')
            }
            this.emitter.emit('loginas', {'userType': this.id})
          })
          .catch(error => {
            alert(error.message);
          });

          async function addUsertoFs(email,name,postalcode,id) {
            try {
              const docRef = await setDoc(doc(db,id,email), {
                email: email, name: name, postalcode: postalcode,
                purchasehistory: {
                  1: {
                    items: {
                      item1: ["item1",1,50],
                      item2: ["item2",1,50]
                    },
                    total: 100
                  },
                  2: {
                    items: {
                      item3: ["item3",1,60],
                      item4: ["item4",1,50]
                    },
                    total: 110
                  },
                }
              })
              console.log(docRef)
            } catch (error) {
              console.error("Error adding document: ", error);
            }
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