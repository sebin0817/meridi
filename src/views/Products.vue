<template>
  <section class="hero">
    <div class="hero-text">
      <section id="products">
        <el-row>
          <el-col :offset="12" :span="8" ><SearchForm /></el-col>
        </el-row>
        <el-row>
          <el-col :offset="2" :span="22" ><ProductsView :products="products"/></el-col>   
        </el-row> 
      </section>
    </div>
  </section>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue'
import ProductsView from '@/components/ProductsView.vue'
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import firebaseApp from '@/firebase.js'

const db = getFirestore(firebaseApp);

export default {
  name: 'Products',
  components: {
    SearchForm,
    ProductsView
  },

  created() {
    var self = this;
    async function fetchProducts() {
      let productsDb = await getDocs(collection(db, "Products"));
      try {  
        productsDb.forEach((docs) => {
        let productData = docs.data();
        let product = {
          id: docs.id,
          name: productData.name,
          description: productData.description,
          price: productData.price
        } 
        self.products.push(product);
        });
      } catch (e) {
        console.log(`error when getting db ${e}`)
      }    
    }
    fetchProducts();
  },

  data() {
    return {
      products: []
    }
  },

  methods: {
    
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: black;
}

#products {
  margin-top: 100px
}


</style>
