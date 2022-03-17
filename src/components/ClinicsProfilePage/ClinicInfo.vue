<template>
  <section class="hero">
    <div id="hero-text">
        <h3>{{ name }}</h3>
        <h3>{{ email }}</h3>
        <h3> {{ postalcode }}</h3>
        <button @click='goToEdit()'>EDIT PROFILE</button>
    </div>
  </section>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebase.js"
import { doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    name: 'ClinicInfo',
    props: {
        useremail: String
    },
    data() {
      return {
        name: '',
        email: '',
        postalcode: '',
      }
    },
    methods: {
      goToEdit() {
        this.$router.push('./EditClinicParticulars')
      }
    },
    async created() {
        this.email = this.useremail;
        console.log(this.email)
        const docRef = doc(db,"Clinics",this.useremail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
            const data = docSnap.data();
            this.name = data.name;
            this.postalcode = data.postalcode;
        }
    }
}
</script>
<style scoped>
* {
text-align: center;
}
</style>
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