<template>
  <section class="profile">
    <ClinicInfo id="info" v-if="mounted" :useremail="useremail" />
    <section id="products">
      <el-container>
        <el-header><SearchForm @search="filteredBySearch($event)" /></el-header>
        <el-main
          ><ProductsView :products="filterProducts" :show="showEmpty"
        /></el-main>
      </el-container>
    </section>
  </section>
</template>

<script>
import ClinicInfo from "../../components/IndividualClinicPage/CheckClinicInfo.vue";
import SearchForm from "@/components/CustomersProductsPage/SearchForm.vue";
import ProductsView from "@/components/CustomersProductsPage/ProductsView.vue";
import {
  getDocs,
  collection,
  getFirestore,
  getDoc,
  doc,
} from "firebase/firestore";
import firebaseApp from "@/firebase.js";

const db = getFirestore(firebaseApp);
export default {
  name: "Profile",
  components: {
    ClinicInfo,
    SearchForm,
    ProductsView,
  },
  data() {
    return {
      useremail: "",
      mounted: false,
      products: [],
      filteredProducts: [],
      search: "",
      show: false,
    };
  },
  created() {
    this.useremail = this.$route.params.id;
    this.mounted = true;

    var self = this;
    async function fetchProducts() {
      let productsDb = await getDocs(collection(db, "Products"));
      let clinicDb = await getDoc(doc(db, "Clinics", self.useremail));
      try {
        let productList = clinicDb.data().products;
        productsDb.forEach((docs) => {
          let productData = docs.data();
          let product = {
            id: docs.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            avail: productData.avail,
            categories: productData.categories,
            clinic: productData.clinic,
            imgURL: productData.image,
          };
          if (
            productList != null &&
            productList.includes(product.id) &&
            product.avail == "Available"
          ) {
            self.products.push(product);
          }
        });
      } catch (e) {
        console.log(`error when getting db ${e}`);
      }
      self.show = self.products.length === 0;
    }
    fetchProducts();
  },
  methods: {
    filteredBySearch(searchResult) {
      this.search = searchResult;
    },
    filteredProductsBySearch(product) {
      return product.name.toLowerCase().includes(this.search.toLowerCase());
    },
  },

  computed: {
    filterProducts() {
      // console.log("change everytime filter cate changes")
      return this.products.filter((product) => {
        return this.filteredProductsBySearch(product);
      });
    },
    showEmpty() {
      console.log(this.show);
      return this.show;
    },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  height: 100%;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 100px;
}
#info {
  width: 35%;
}
#products {
  margin-top: 1rem;
  width: 70rem;
}
</style>
