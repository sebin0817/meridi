<template>
  <div class="container">
    <el-card shadow="hover">
      <div class="image">
        <img :src="product.image" alt="product img" class="img" />
      </div>
      <div class="cardContent">
        <p style="line-height: 20px" v-show="available">
          <el-icon class="el-input__icon" :size="20" color="#cde0c1"
            ><CircleCheckFilled
          /></el-icon>
          Available
        </p>
        <p style="line-height: 20px" v-show="!available">
          <el-icon class="el-input__icon" :size="20" color="#d16d6a"
            ><CircleCloseFilled
          /></el-icon>
          Unavailable
        </p>
        <div class="header">
          <span class="text block" id="title">{{ product.name }}</span>
          <p class="text block" id="description">{{ product.description }}</p>
        </div>
        <div class="mid">
          <p class="text block" id="price">{{ price }}</p>
          <button @click="editProduct">EDIT</button>
          <button @click="deleteProduct">DELETE</button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { CircleCheckFilled, CircleCloseFilled } from "@element-plus/icons-vue";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc, deleteDoc, arrayRemove } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "ProductCard",
  components: { CircleCheckFilled, CircleCloseFilled },
  data() {
    return {
      available: this.product.avail == "Available",
    };
  },
  props: {
    product: {
      type: Object,
    },
  },
  emits: ["delete"],
  methods: {
    editProduct() {
      this.$router.push("./EditProduct");
      sessionStorage.setItem("productid", this.product.id);
    },
    async deleteProduct() {
      try {
        var conf = confirm("Are you sure you want to delete this product?");
        if (conf == true) {
          await deleteDoc(doc(db, "Products", this.product.id));
          await updateDoc(doc(db, "Clinics", this.product.clinic), {
            products: arrayRemove(this.product.id),
          });
          //location.reload(); //reload to show changes
          this.$emit("delete");
          alert("Product successfullly deleted");
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
  },
  computed: {
    price() {
      return "$" + this.product.price;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.el-card {
  padding: 0px;
}
.container {
  line-height: 5;
  margin-bottom: 30px;
}
.cardContent {
  padding: 14px;
  text-align: center;
}
.image {
  width: 200px;
  height: 200px;
  text-align: center;
}
.img {
  width: 100%;
  height: 100%;
}
.text {
  font-family: "Georgia", Times, serif;
  line-height: 1.6;
}
.block {
  display: block;
}
.header {
  height: 120px;
}
#title {
  margin-top: 10px;
  font-weight: bold;
  font-size: 14px;
}
#description {
  width: 100%;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
#price {
  font-size: 16px;
  margin-top: 20px;
  font-weight: 500;
}
button {
  margin: 10px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
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
