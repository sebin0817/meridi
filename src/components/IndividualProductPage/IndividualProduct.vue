<template>
  <section class="hero">
    <div class="hero-text container">
      <section id="product">
        <div id="aside">
          <img
            :src="`${product.imgURL}`"
            alt="product img"
            class="image"
            style="height: 100%; width: 100%"
          />
        </div>
        <div id="main" class="text">
          <div>
            <h2 id="name">{{ product.name }}</h2>
            <h2 id="clinic">{{ clinic }}</h2>
            <h2 id="price">{{ price }}</h2>
          </div>

          <div>
            <h2 style="font-size: 20px; font-weight: bold">Description</h2>
            <p id="description">{{ product.description }}</p>
          </div>

          <div class="cart">
            <el-input-number v-model="qty" :step="1" />
            <button @click="addToCart">Add to Cart</button>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { getDocs, collection, getFirestore } from "firebase/firestore";
import firebaseApp from "@/firebase.js";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      product: {},
      qty: 1,
    };
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
            imgURL: productData.image,
          };
          if (product.id === self.id) {
            self.product = product;
          }
        });
      } catch (e) {
        console.log(`error when getting db ${e}`);
      }
    }
    fetchProducts();
  },

  computed: {
    name() {
      return "" + this.product.name;
    },

    clinic() {
      return "Sold at: " + this.product.clinic;
    },

    price() {
      return "$" + this.product.price;
    },
  },
};
</script>

<style scoped>
html {
  font-size: 62.5%;
}

.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  background-color: white;
}

.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}

.text {
  font-family: "Georgia", Times, serif;
  line-height: 1.6;
}

#product {
  display: flex;
  margin-top: 15rem;
  margin-left: auto;
  margin-right: auto;
  width: 70rem;
  align-items: center;
}

#aside {
  flex: 1;
  margin: 3rem;
}

#main {
  flex: 2;
  margin: 3rem;
}

#name {
  font-size: 30px;
  font-weight: bold;
}

#clinic {
  font-weight: 600;
}

#price {
  font-weight: 600;
}

#description {
  font-size: 15px;
}
</style>
