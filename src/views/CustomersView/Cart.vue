<template>
  <section class="hero">
    <div class="hero-text container">
      <CartView v-if="mounted" :cart="cart" @delprod='delprod' :key="refreshComp"/>
    </div>
  </section>
</template>

<script>
import CartView from '@/components/CustomersCartPage/CartView.vue'
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; 
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp)

export default {
 name: 'Cart',
 components: {
   CartView
 },
 data() {
    return {
      cart: null,
      mounted: false,
      email: '',
      refreshComp: 0
    }
  },
  async created() {
    const email = sessionStorage.getItem("useremail");
    this.email = email
    const docRef = doc(db,"Customers",email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
            this.cart = docSnap.data().cart;
            this.mounted = true;
        }
  },
  methods: {
    async delprod(dprod) {
      var prod = this.cart[dprod]
      console.log(prod)
      this.cart.total -= prod.unitprice * prod.quantity
      delete this.cart[dprod]
      const custRef = doc(db, "Customers", this.email)
      await updateDoc(custRef, {
        cart: this.cart
      })
      this.refreshComp += 1;
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
