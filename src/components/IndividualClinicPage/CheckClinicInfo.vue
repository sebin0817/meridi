<template>
  <section class="hero">
    <div id="profile-div">
      <img :src="img" id="image" />
      <h3 class="profile-info">{{ name }}</h3>
      <h3 class="profile-info">{{ email }}</h3>
      <h3 class="profile-info">{{ postalcode }}</h3>
      <h3 class="profile-info" id="desc">{{ desc }}</h3>
      <div id="services" v-for="service in services" :key="service">
         <p>
        <el-icon><circle-check-filled /></el-icon>
        {{ service }}
      </p>
      </div>
      <br />
      <button @click="book()">Book Appointment</button>
    </div>
  </section>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "@/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { CircleCheckFilled } from "@element-plus/icons-vue";

const db = getFirestore(firebaseApp);

export default {
  name: "CustInfo",
  data() {
    return {
      name: "",
      email: "",
      postalcode: "",
      img: "",
      desc: "",
      services: [],
    };
  },
  props: {
    useremail: String,
  },
  components: {
    CircleCheckFilled,
  },
  methods: {
    book() {
      this.$router.push({
        name: "IndividualClinic",
        params: {
          id: this.useremail,
        },
      });
    },
  },
  async created() {
    this.email = this.useremail;
    // console.log(this.email);
    const docRef = doc(db, "Clinics", this.useremail);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const data = docSnap.data();
      this.name = data.name;
      this.postalcode = data.postalcode;
      this.img = data.image;
      this.desc = data.desc;
      this.services = data.services;
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
* {
  font-family: "Nunito Sans", sans-serif;
}
.hero {
  margin-top: 80px;
}
#profile-div {
  text-align: center;
}
#image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
#desc {
  text-align: justify;
}
.profile-info {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
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
