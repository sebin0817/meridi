<template>
  <section class="hero">
    <div class="hero-text container">
      <form @submit.prevent="update">        
            <input       
            v-model="name"   
            />   
            <input
            v-model="postalcode"   
            />    
          <button type="submit">
            SAVE CHANGE
          </button>   
        </form> 
    </div>
  </section>
</template>

<script> 
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; 
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp)
export default {
    name: 'EditParticularsForm',
    data() {
        return {
          name: '',
          email: '',
          postalcode: '',
        }
    },
    methods: {
      async update() {
        await setDoc(doc(db, "Customers", this.email), {
          name: this.name,
          email: this.email,
          postalcode: this.postalcode,
        });   
        alert("Profile successfully updated");
        this.$router.push('./Profile');
      }
    },
    async created() {
        this.email = sessionStorage.getItem("useremail");
        const docRef = doc(db,"Customers",this.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
            const data = docSnap.data();
            this.name = data.name;
            this.postalcode = data.postalcode;
        }
    }
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