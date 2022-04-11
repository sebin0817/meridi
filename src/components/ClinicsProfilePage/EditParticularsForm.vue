<template>
  <div class="form">
    <el-form :model="form" @submit.prevent="update">
      <el-row>
        <img :src="img" id="image" />
      </el-row>
      <el-row>
        <el-input
          id="image"
          v-model="img"
          type="text"
          placeholder="Company Logo Link"
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
          placeholder="Company Name"
          ><template #prefix>
            <el-icon class="el-input__icon"
              ><office-building
            /></el-icon> </template
        ></el-input>
      </el-row>
      <el-row>
        <el-input
          id="postalcode"
          v-model="postalcode"
          type="text"
          placeholder="Postal Code"
          required="true"
          ><template #prefix>
            <el-icon class="el-input__icon"
              ><map-location
            /></el-icon> </template
        ></el-input>
      </el-row>
      <el-row>
        <el-input
          id="textarea"
          :rows="2"
          type="textarea"
          placeholder="Company Description"
          v-model="desc"
          required="true"
        />
      </el-row>
      <el-row>
        <el-select
          v-model="services"
          multiple
          placeholder="Service(s) Provided"
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
      <button type="submit">SAVE CHANGE</button>
      <h4 @click="goToProfile()">BACK TO MY PROFILE</h4>
    </el-form>
  </div>
</template>

<script>
import { OfficeBuilding, MapLocation, Camera } from "@element-plus/icons-vue";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp);
export default {
  name: "EditParticularsForm",
  components: { OfficeBuilding, MapLocation, Camera },

  data() {
    return {
      name: "",
      email: "",
      postalcode: "",
      img: "",
      desc: "",
      services: [],
      options: [
        { value: "Accupuncture" },
        { value: "Tunia" },
        { value: "Herbal Medication" },
        { value: "Gua Sha" },
        { value: "Cupping" },
        { value: "Device Therapy" },
      ],
      orderhistory: "",
      products: ""
    };
  },
  methods: {
    async update() {
      await setDoc(doc(db, "Clinics", this.email), {
        name: this.name,
        email: this.email,
        postalcode: this.postalcode,
        image: this.img,
        desc: this.desc,
        services: this.services,
        orderhistory: this.orderhistory,
        products: this.products
      });
      alert("Profile successfully updated");
      this.$router.push("./ClinicProfile");
    },
    goToProfile() {
      this.$router.push("./ClinicProfile");
    },
  },
  async created() {
    this.email = sessionStorage.getItem("useremail");
    const docRef = doc(db, "Clinics", this.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const data = docSnap.data();
      this.name = data.name;
      this.postalcode = data.postalcode;
      this.img = data.image;
      this.desc = data.desc;
      this.services = data.services;
      this.orderhistory = data.orderhistory
      this.products = data.products
    }
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
.el-row,
.el-input {
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
h4 {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
h4:hover {
  cursor: pointer;
}
#image {
  height: 200px;
}
</style>
