<template>
  <div class="form">
    <h4>Edit Particulars</h4>
    <el-form :model="form" @submit.prevent="update">
      <el-input id="name" v-model="name" type="text" placeholder="Company Name"
        ><template #prefix>
          <el-icon class="el-input__icon"
            ><office-building
          /></el-icon> </template
      ></el-input>
      <el-input
        id="postalcode"
        v-model="postalcode"
        type="text"
        placeholder="Postal Code"
        required="true"
        ><template #prefix>
          <el-icon class="el-input__icon"><map-location /></el-icon> </template
      ></el-input>
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
      <el-row>
        <button type="submit">SAVE CHANGE</button>
      </el-row>
      <el-row>
        <button @click="goToProfile()">BACK</button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { OfficeBuilding, MapLocation } from "@element-plus/icons-vue";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp);
export default {
  name: "EditParticularsForm",
  components: { OfficeBuilding, MapLocation },

  data() {
    return {
      name: "",
      email: "",
      postalcode: "",
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
    };
  },
    methods: {
      async update() {
        await setDoc(doc(db, "Clinics", this.email), {
          name: this.name,
          email: this.email,
          postalcode: this.postalcode,
          desc: this.desc,
          services: this.services
        });   
        alert("Profile successfully updated");
        this.$router.push('./ClinicProfile')
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
      this.desc = data.desc;
      this.services = data.services;
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");

.form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 170px;
  text-align: center;
  width: 30%;
}
.el-row,
.el-input {
  margin-bottom: 10px;
  justify-content: center;
}
.el-select {
  width: 50ch;
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
  margin-bottom: 30px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 25px;
}
</style>
