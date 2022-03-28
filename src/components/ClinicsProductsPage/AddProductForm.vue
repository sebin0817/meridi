<template>
  <div class="form" @submit.prevent="add">
    <form>
      <el-row>
        <img :src="image" id="image" />
        <el-input
          id="image"
          v-model="image"
          type="text"
          placeholder="Product Image Link"
          required="true"
          ><template #prefix>
            <el-icon class="el-input__icon"><Camera /></el-icon> </template
        ></el-input>
      </el-row>
      <el-row>
        <el-input
          id="name"
          v-model="name"
          type="text"
          placeholder="Product Name"
          required="true"
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
          required="true"
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
          required="true"
          v-model="desc"
        />
      </el-row>
      <el-row>
        <el-select
          v-model="categories"
          multiple
          placeholder="Product Categories"
          required="true"
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
        <el-select
          v-model="avail"
          placeholder="Product Availability"
          required="true"
        >
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
        <button type="submit">ADD PRODUCT</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Coin, Sell, Camera } from "@element-plus/icons-vue";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  name: "Add ProductForm",
  components: { Coin, Sell, Camera },
  data() {
    return {
      image: "",
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

  methods: {
    //store the information
    async add() {
      var user = sessionStorage.getItem("useremail");
      try {
        //store in Products collection
        const docRef = await addDoc(collection(db, "Products"), {
          image: this.image,
          name: this.name,
          price: this.price,
          description: this.desc,
          categories: this.categories,
          avail: this.avail,
          clinic: user, //use email as id
        });

        //store in Clinics collection
        await updateDoc(doc(db, "Clinics", user), {
          products: arrayUnion(docRef.id),
        });
        alert("Product added");
      } catch (error) {
        console.error("Error adding document: ", error);
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
.uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader .el-upload:hover {
  border-color: #409eff;
}
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
}
</style>
