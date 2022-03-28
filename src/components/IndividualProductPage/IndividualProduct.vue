<template>
  <section class="hero">
    <div class="hero-text container">
      <section id="product">
        <div id="aside">
          <img
            :src="`${product.imgURL}`"
            alt="product img"
            class="image"
            style="weight: 100px;"
          />
        </div>
        <div id="main" class="text">
          <div>
            <h2 id="name">{{ product.name }}</h2>
            <h3 id="clinic">{{ clinic }}</h3>
            <h2 id="price">{{ price }}</h2>
          </div>

          <div>
            <p id="description">{{ product.description }}</p>
          </div>

          <div class="cart">
            <el-input-number v-model="qty" :step="1" />
          </div>
          <button @click="addToCart">Add to Cart</button>
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
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
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
  margin-top: 20px;
}

#description {
  font-size: 15px;
  margin-top: 10px;
}
.cart {
  margin-top: 10px;
}
button {
  margin-top: 10px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px 15px 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}
button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}
</style>
