<template>
  <section class="hero">
    <el-container class="hero-text">
      <section id="products">
        <el-container>
          <el-aside width="300px"><ProductFilter @categoryFilter="filteredByCategory($event)" @sortBy="sortByPrice($event)"/></el-aside>  
          <el-container>
            <el-header><SearchForm @search="filteredBySearch($event)"/></el-header>
            <el-main><ProductsView :products="filterProducts"/></el-main> 
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
      search: "",
      checkedCats: ['pain', 'treatments', 'wellness', 'kids'],
      sortBy: 0 /*sorted = 1 means high -> low, sorted = 0 means low -> high */
    }
  },

  methods: {
    filteredBySearch(searchResult) {
      this.search = searchResult;
    },

    filteredByCategory(checkedCats) {
      this.checkedCats = checkedCats;
      console.log(`inside parentl, value is ${this.checkedCats}`)
    },

    filteredProductsByCategory(product) {
      let catNames = this.checkedCats.map(cat => {
        return cat.toLowerCase();
      });
      return catNames.indexOf(product.description.toLowerCase()) >= 0;
    },

    filteredProductsBySearch(product) {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
    },

    sortByPrice(sort) {
      this.sortBy = sort;
    }
  },

  computed: {
    filterProducts() {
      return this.products.filter(product => {
        return this.filteredProductsBySearch(product) && this.filteredProductsByCategory(product);       
      }).sort((p1, p2) => {
        if (this.sortBy == 0) {
          let x = (p1.name > p2.name) ? 1 : -1;
          return x;
        } else if (this.sortBy == 1) {
          return p2.price - p1.price;
        } else if (this.sortBy == 2) {
          return p1.price - p2.price;
        }
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
  margin-right: 150px;
}


</style>
