<template>
  <div class="form">
    <el-form :model="form" @submit.prevent="login">
      <h4 id="centre">Sign up as a Clinic:</h4>
      <form @submit.prevent="register">
        <el-input id="email" v-model="email" type="email" placeholder="Email"
          ><template #prefix>
            <el-icon class="el-input__icon"><message /></el-icon> </template
        ></el-input>
        <el-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          show-password
          ><template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
        <el-input
          id="name"
          v-model="name"
          type="text"
          placeholder="Full Name"
          ><template #prefix>
            <el-icon class="el-input__icon"><avatar /></el-icon> </template
        ></el-input>
        <el-input
          id="postalcode"
          v-model="postalcode"
          type="text"
          placeholder="Postal Code"
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
            placeholder="Company Description"
            v-model="desc"
          />
        </el-row>
        <el-row>
          <el-select
            v-model="services"
            multiple
            placeholder="Service(s) Provided"
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
          <button type="submit">SIGN UP</button>
        </div>
      </form>
    </el-form>
  </div>
  <!-- </section>
    </div>
  </section> -->
</template>

<script>
import { Message, Lock, Avatar, MapLocation } from "@element-plus/icons-vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  name: "SignupForm",
  components: { Message, Lock, Avatar, MapLocation },
  data() {
    return {
      tempType: sessionStorage.getItem("tempType"),
      email: "",
      name: "",
      postalcode: "",
      password: "",
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
    };
  },
  methods: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          addUsertoFs(
            this.email,
            this.name,
            this.postalcode,
            this.tempType,
            this.img,
            this.desc,
            this.services
          );
          alert("Successfully registered!");
          this.$router.push("/ClinicProfile");
          this.emitter.emit("loginas", { userType: this.tempType });
          sessionStorage.setItem("useremail", this.email);
          sessionStorage.setItem("usertype", this.tempType);
        })
        .catch((error) => {
          alert(error.message);
        });
      async function addUsertoFs(
        email,
        name,
        postalcode,
        type,
        img,
        desc,
        services
      ) {
        try {
          const docRef = await setDoc(doc(db, type, email), {
            email: email,
            name: name,
            postalcode: postalcode,
            img: img,
            desc: desc,
            services: services,
          });
          console.log(docRef);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
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