<template>
  <section class="hero">
    <img id="logo" src="../../assets/user.png" alt="" />

    <h3 class="profile-info">{{ name }}</h3>
    <h3 class="profile-info">{{ email }}</h3>
    <h3 class="profile-info">{{ postalcode }}</h3>
    <h3 class="profile-info">{{ desc }}</h3>
    <div v-for="service in services" :key="service">
      <el-icon><circle-check-filled /></el-icon>
      {{ service }}
    </div>
    <button @click="goToEdit()">EDIT PROFILE</button>
  </section>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "@/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { CircleCheckFilled } from "@element-plus/icons-vue";

const db = getFirestore(firebaseApp);

export default {
  name: "ClinicInfo",
  props: {
    useremail: String,
  },
  components: {
    CircleCheckFilled,
  },
  data() {
    return {
      name: "",
      email: "",
      postalcode: "",
      desc: "",
      services: [],
    };
  },
  methods: {
    goToEdit() {
      this.$router.push("./EditClinicParticulars");
    },
  },
  async created() {
    this.email = this.useremail;
    console.log(this.email);
    const docRef = doc(db, "Clinics", this.useremail);
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

.hero {
  margin-left: auto;
  margin-right: auto;
  margin-top: 180px;
  text-align: center;
}
#logo {
  width: 20%;
}
.profile-info {
  font-family: "Nunito Sans", sans-serif;
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
</style>
