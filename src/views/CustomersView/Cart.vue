<template>
  <section class="hero">
    <div class="hero-text container">
      <div class="parent">
        <div class="left">
          <CartView
            v-if="mounted"
            :cart="cart"
            @delprod="delprod"
            :key="refreshComp"
          />
        </div>
        <div class="right">
          <Payment :cart="cart" @commitpurchase="commitpurchase" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CartView from "@/components/CustomersCartPage/CartView.vue";
import Payment from "@/components/CustomersCartPage/Payment.vue";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp);

export default {
  name: "Cart",
  components: {
    CartView,
    Payment,
  },
  data() {
    return {
      cart: null,
      purchasehistory: null,
      name: null,
      mounted: false,
      email: "",

      refreshComp: 0,
    };
  },
  async created() {
    const email = sessionStorage.getItem("useremail");
    this.email = email;
    const docRef = doc(db, "Customers", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      this.purchasehistory = docSnap.data().purchasehistory;
      this.cart = docSnap.data().cart;
      this.name = docSnap.data().name;
      this.mounted = true;
    }
  },
  methods: {
    async delprod(dprod) {
      var prod = this.cart.products[dprod];
      console.log(prod);
      this.cart.total -= prod.unitprice * prod.quantity;
      delete this.cart.products[dprod];
      const custRef = doc(db, "Customers", this.email);
      await updateDoc(custRef, {
        cart: this.cart,
      });
      this.refreshComp += 1;
    },
    async commitpurchase() {
      //update customer purchase history
      const len = Object.keys(this.purchasehistory).length;
      this.purchasehistory[len + 1] = this.cart;
      const custRef = doc(db, "Customers", this.email);
      await updateDoc(custRef, {
        purchasehistory: this.purchasehistory,
      });
      //update clinic order history
      //create dictionary for each clinic
      var clinicsdict = {};
      for (const [pname, product] of Object.entries(this.cart.products)) {
        product["totalprice"] = product.unitprice * product.quantity;
        const clin = product.clinic;
        delete product["unitprice"];
        delete product["clinic"];
        if (clinicsdict[clin] == undefined) {
          clinicsdict[clin] = {
            custname: this.name,
            dop: new Date().toISOString().slice(0, 10),
            products: {},
          };
        }
        clinicsdict[clin]["products"][pname] = product;
      }
      //loop and push to each clinic
      for (const [clinic, order] of Object.entries(clinicsdict)) {
        const clinRef = doc(db, "Clinics", clinic);
        const clinSnap = await getDoc(clinRef);
        if (clinSnap.exists) {
          var oh = clinSnap.data().orderhistory;
          const lenoh = Object.keys(oh).length;
          oh[lenoh + 1] = order;
          await updateDoc(clinRef, {
            orderhistory: oh,
          });
        }
      }
      const cRef = doc(db, "Customers", this.email);
      await updateDoc(cRef, {
        cart: { products: {}, total: 0 },
      });
      this.cart = { products: {}, total: 0 };
      alert("purchase is successful");
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

.parent {
  display: flex;
  justify-content: space-around;
}

.left {
  width: 70%;
}

.right {
  width: 20%;
  margin-right: 20px;
}
</style>
