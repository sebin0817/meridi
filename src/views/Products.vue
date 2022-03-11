<template>
  <section class="hero">
    <el-container class="hero-text">
      <section id="products">
        <el-container>
          <el-aside width="300px"><ProductFilter /></el-aside>  
          <el-container>
            <el-header><SearchForm @search="filteredBySearch($event)"/></el-header>
            <el-main><ProductsView :products="filteredProductsBySearch"/></el-main> 
          </el-container>
        </el-container>
        
      </section>
    </el-container>
  </section>
   
</template>

<script>
import SearchForm from '@/components/SearchForm.vue'
import ProductsView from '@/components/ProductsView.vue'
import ProductFilter from '@/components/ProductFilter.vue'

import { getDocs, collection, getFirestore } from 'firebase/firestore'
import firebaseApp from '@/firebase.js'

const db = getFirestore(firebaseApp);

export default {
  name: 'Products',
  components: {
    SearchForm,
    ProductsView,
    ProductFilter
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
      products: [],
      filteredProducts: [],
      search: ""
    }
  },

  methods: {
    filteredBySearch(searchResult) {
      this.search = searchResult;
      console.log(`inside parentl, value is ${this.search}`)
    }
  },

  computed: {
    filteredProductsBySearch() {
      return this.products.filter(product => {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
      })
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
  color: black;
}

#products {
  margin-top: 150px;
  margin-left: 150px;
}


</style>
