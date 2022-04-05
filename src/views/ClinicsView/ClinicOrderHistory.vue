<template>
  <section class="hero">
    <div class="hero-text container">
      <OrderHistory v-if="mounted" :orderhistory="orderhistory"/>
    </div>
  </section>
</template>

<script>
import OrderHistory from '@/components/ClinicsOrdersPage/OrderHistory.vue'
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp)

export default {
  name: 'ClinicOrderHistory',
  components: {
    OrderHistory
  },
  data() {
    return {
      orderhistory: null,
      mounted: false,
    }
  },
  async created() {
    const email = sessionStorage.getItem("useremail");
    const docRef = doc(db,"Clinics",email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        this.orderhistory = docSnap.data().orderhistory;
        this.mounted = true;
        }
  },
};
</script>

<style scoped>
.hero {
  background-attachment: fixed;
  position: relative;
}
.hero-text {
  justify-content: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: black;
}
</style>
