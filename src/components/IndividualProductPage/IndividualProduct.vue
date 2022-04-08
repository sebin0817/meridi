<template>
  <section class="hero">
    <div class="hero-text container">
      <section id="product">
        <div id="aside">
          <img
            :src="`${product.imgURL}`"
            alt="product img"
            class="image"
            style="width: 500px"
          />
        </div>
        <div id="main" class="text">
          <div>
            <h2 id="name">{{ product.name }}</h2>
            <h3 id="clinic" @click="checkClinic">{{ clinic }}</h3>
            <h2 id="price">{{ price }}</h2>
          </div>

          <div>
            <p id="description">{{ product.description }}</p>
          </div>
          <br />
          <div class="cart">
            <el-input-number v-model="qty" :step="1" :min="1"/>
          </div>
          <br />

          <button @click="addToCart">Update Cart</button>
          <br />
          <br />

          <h4 class="back" @click="goBack()">Back to Products Page</h4>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import {
  getFirestore,
  getDocs,
  doc,
  getDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      product: {},
      qty: 1,
      email: "",
      user: {},
      cart: {},
      totalPrice: 0,
      clinicName: "",
    };
  },

  mounted() {
    this.id = this.$route.params.id;
  },

  created() {
    var self = this;

    // console.log(this.email);
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

      let clinicDb = await getDoc(doc(db, "Clinics", self.product.clinic));
      try {
        let clinicData = clinicDb.data();
        self.clinicName = clinicData.name;
      } catch (e) {
        console.log(`error when getting db ${e}`);
      }
    }
    fetchProducts();

    async function fetchCart() {
      console.log("fetch cart");
      self.email = sessionStorage.getItem("useremail");

      console.log(self.email);
      const docRef = doc(db, "Customers", self.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        self.cart = self.jsonify(data.cart).products;
        self.totalPrice = self.jsonify(data.cart).total;
      }
      try {
        self.qty = self.cart[self.product.id].quantity
      } catch {
        self.qty = 1;
      }
    }
    fetchCart();
  },

  computed: {
    name() {
      return "" + this.product.name;
    },

    clinic() {
      //return "Sold at: " + this.product.clinic;
      return "@" + this.clinicName;
    },

    price() {
      return "$" + this.product.price;
    },
  },

  methods: {
    checkClinic() {
      /*this.$router.push({
        name: "IndividualClinic",
        params: {
          id: this.product.clinic,
        },
      });*/
      this.$router.push({
        name: "CheckClinic",
        params: {
          id: this.product.clinic,
        },
      });
    },
    addToCart() {
      let newQty = this.qty;
      let oldQty;
      
      let price = Number(this.product.price);
      let name = this.product.name.toLowerCase();
      let product = this.product.id;

        if (this.isExist()) {
        console.log('alr in cart');
        oldQty = this.cart[product].quantity;
        this.cart[product].quantity = newQty;
        console.log(this.cart[product].quantity);
      } else {
        console.log('new to cart')
        oldQty = 0;
        this.cart[product] = {};
        this.cart[product].clinic = this.product.clinic;
        this.cart[product].unitprice = price;
        this.cart[product].quantity = newQty;
        this.cart[product].name = name;
      }
      console.log(newQty);
      console.log(oldQty);
      this.totalPrice += (newQty - oldQty) * price;
      this.updateCartToFb();
      alert("Successfully update cart!");
    },
    isExist() {
      let currProduct = this.product.id;
      let currCart = this.jsonify(this.cart);
      return !(currCart[currProduct] === undefined);
    },
    jsonify(data) {
      return JSON.parse(JSON.stringify(data));
    },
    async updateCartToFb() {
      const cartDoc = doc(db, "Customers", this.email);
      let updateCart = { products: this.cart, total: this.totalPrice };
      await updateDoc(cartDoc, {
        cart: updateCart,
      });
    },
    goBack() {
      this.$router.push("../");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
* {
  font-family: "Nunito Sans", sans-serif;
}
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
  text-decoration: underline;
}
#clinic:hover {
  cursor: pointer;
  color: #ffcc00;
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
.back {
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}
.back:hover {
  cursor: pointer;
}
</style>
