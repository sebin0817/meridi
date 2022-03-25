<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h2>{{product.name}}</h2>
        <h4>{{clinic}}</h4>
      </el-header>
      <el-container>
        <el-aside width="600px">
            <img :src="product.imgURL" alt="product">
        </el-aside>
        <el-main>
            <p>{{price}}</p>
            <p>{{product.description}}</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import firebaseApp from '@/firebase.js'

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
          product: {}
        }
    },

    props: {
      name: String
    },

    mounted() {
      this.id = this.$route.params.id;
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
          price: productData.price,
          avail: productData.avail,
          categories: productData.categories,
          clinic: productData.clinic,
          imgURL: productData.image
        } 
        if (product.id === self.id) {
          self.product = product;
        }
        });
      } catch (e) {
        console.log(`error when getting db ${e}`)
      }    
    }
    fetchProducts();
  },

    computed: {
        clinic() {
            return ("@" + this.product.clinic);
        },
        price() {
            return ("$" + this.product.price); 
        }
    }
}
</script>

<style>

</style>