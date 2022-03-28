<template>
  <section class="hero">
    <div class="hero-text container">
      <el-form :model="form" @submit.prevent="update">
      <form @submit.prevent="update">
        <el-input
          id="name"
          v-model="name"
          type="text"
          ><template #prefix>
            <el-icon class="el-input__icon"><avatar /></el-icon> </template
        ></el-input>
        <el-input
          id="postalcode"
          v-model="postalcode"
          type="text"
          ><template #prefix>
            <el-icon class="el-input__icon"
              ><map-location
            /></el-icon> </template
        ></el-input>
        <el-row>
          <el-input
            id="textarea"
            :rows="2"
            type="textarea"
            v-model="desc"
          />
        </el-row>
        <el-row>
          <el-select
            v-model="services"
            multiple
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
        <div id="centre">
          <button type="submit">SAVE CHANGE</button>
        </div>
      </form>
    </el-form>
    </div>
  </section>
</template>

<script> 
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; 
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp)
export default {
    name: 'EditParticularsForm',
    data() {
        return {
            name: '',
            email: '',
            postalcode: '',
            desc: '',
            services: [],
            options: [
              { value: "Accupuncture" },
              { value: "Tunia" },
              { value: "Herbal Medication" },
              { value: "Gua Sha" },
              { value: "Cupping" },
              { value: "Device Therapy" },
      ],
        }
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
      }
    },
    async created() {
        this.email = sessionStorage.getItem("useremail");
        const docRef = doc(db,"Clinics",this.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
            const data = docSnap.data();
            this.name = data.name;
            this.postalcode = data.postalcode;
            this.desc = data.desc;
            this.services = data.services
        }
    }
};
</script>

<style>
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
  width: 50ch;
}
button {
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  align-items: center;
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
h4 {
  font-family: "Nunito Sans", sans-serif;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>