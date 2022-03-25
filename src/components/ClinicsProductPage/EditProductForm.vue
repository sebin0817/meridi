<template>
  <div class="form" @submit.prevent="edit">
    <form>
      <el-row>
        <el-input
          id="name"
          v-model="name"
          type="text"
          placeholder="Product Name"
          ><template #prefix>
            <el-icon class="el-input__icon"><Sell /></el-icon> </template
        ></el-input>
      </el-row>
      <el-row>
        <el-input
          id="product"
          v-model="price"
          type="number"
          placeholder="Product Price"
          ><template #prefix>
            <el-icon class="el-input__icon"><Coin /></el-icon>
          </template>
        </el-input>
      </el-row>
      <el-row>
        <el-input
          id="textarea"
          :rows="2"
          type="textarea"
          placeholder="Product Description"
          v-model="desc"
        />
      </el-row>
      <el-row>
        <el-select
          v-model="categories"
          multiple
          placeholder="Product Categorie(s)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-select v-model="avail" placeholder="Product Availability">
          <el-option
            v-for="item in availability"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
      <div id="centre">
        <button type="submit">EDIT PRODUCT</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Coin, Sell } from "@element-plus/icons-vue";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  name: "Add ProductForm",
  components: { Coin, Sell },
  data() {
    return {
      name: "",
      price: "",
      desc: "",
      categories: [],
      avail: [],
      options: [
        { value: "For Treatments" },
        { value: "For Pain" },
        { value: "For Wellness" },
        { value: "For Kids" },
      ],
      availability: [{ value: "Available" }, { value: "Unavailable" }],
    };
  },
  //fetch original information
  created() {
    var self = this;
    async function fetchProduct() {
      const docRef = doc(db, "Products", sessionStorage.getItem("productid"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        self.name = data.name;
        self.price = data.price;
        self.desc = data.description;
        self.categories = data.categories;
        self.avail = data.avail;
      }
    }
    fetchProduct();
  },
  methods: {
    click() {
      this.$refs.image.click();
    },
    //edit product information
    async edit() {
      try {
        await updateDoc(doc(db, "Products", this.$route.params.id), {
          name: this.name,
          price: this.price,
          description: this.desc,
          categories: this.categories,
          avail: this.avail,
        });
        alert("Product successfully updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
      this.$router.replace("/ClinicProducts");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  text-align: center;
  width: 30%;
}
.el-input,
.el-row {
  margin-bottom: 10px;
  justify-content: center;
}
.el-select {
  width: 100%;
}
button {
  margin: auto;
  margin-top: 10px;
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
#centre {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
