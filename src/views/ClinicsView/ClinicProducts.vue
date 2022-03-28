<template>
  <section class="hero">
    <div class="hero-text container">
      <br>
      <h1>Product List</h1>
      <AddProductBtn style="float: right" />
      <ProductView :products="clinicProducts" />
    </div>
  </section>
</template>

<script>
import AddProductBtn from "@/components/ClinicsProductPage/AddProductBtn.vue";
import ProductView from "@/components/ClinicsProductPage/ProductView.vue";
import {
  doc,
  getDoc,
  collection,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "@/firebase.js";
const db = getFirestore(firebaseApp);
export default {
  name: "ClinicProduct",
  components: {
    ProductView,
    AddProductBtn,
  },
  data() {
    return {
      email: "",
      products: [],
    };
  },
  created() {
    var self = this;
    self.email = sessionStorage.getItem("useremail");
    async function fetchProducts() {
      //get product list from Clinics collection
      const docRef = doc(db, "Clinics", self.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        var productList = data.products;
      }
      //get products from Products collection
      const querySnapshot = await getDocs(collection(db, "Products"));
      querySnapshot.forEach((doc) => {
        let productData = doc.data();
        if (productList.includes(doc.id)) {
          let product = {
            id: doc.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            categories: productData.categories,
            avail: productData.avail,
            clinic: productData.clinic,
          }; //add image
          self.products.push(product);
        }
      });
    }
    fetchProducts();
  },
  computed: {
    clinicProducts() {
      return this.products;
    },
  },
};
</script>

<style scoped>
.hero {
  background-attachment: fixed;
  position: relative;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}
</style>
