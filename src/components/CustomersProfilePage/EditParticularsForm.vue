<template>
  <img id="logo" src="../../assets/user.png" alt="" />
  <div class="form">
    <form @submit.prevent="update">
      <el-row>
        <el-input
          id="name"
          v-model="name"
          type="text"
          placeholder="Full Name"
          required="true"
          ><template #prefix>
            <el-icon class="el-input__icon"><avatar /></el-icon> </template
        ></el-input>
      </el-row>
      <el-row>
        <el-input
          id="postalcode"
          v-model="postalcode"
          type="number"
          placeholder="Postal Code"
          required="true"
          ><template #prefix>
            <el-icon class="el-input__icon"
              ><map-location
            /></el-icon> </template
        ></el-input>
      </el-row>
      <div id="centre">
        <button type="submit">SAVE CHANGE</button>
      </div>
      <h4 id="back" @click="goToProfile()">BACK TO MY PROFILE</h4>
    </form>
  </div>
</template>

<script>
import { Avatar, MapLocation } from "@element-plus/icons-vue";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp);
export default {
  name: "EditParticularsForm",
  components: { Avatar, MapLocation },
  data() {
    return {
      name: "",
      email: "",
      postalcode: "",
    };
  },
  methods: {
    async update() {
      await setDoc(doc(db, "Customers", this.email), {
        name: this.name,
        email: this.email,
        postalcode: this.postalcode,
      });
      alert("Profile successfully updated");
      this.$router.push("./Profile");
    },
    goToProfile() {
      this.$router.push("./Profile");
    },
  },
  async created() {
    this.email = sessionStorage.getItem("useremail");
    const docRef = doc(db, "Customers", this.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const data = docSnap.data();
      this.name = data.name;
      this.postalcode = data.postalcode;
    }
  },
};
</script>

<style scoped>
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

h4 {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
h4:hover {
  cursor: pointer;
}
#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
</style>
