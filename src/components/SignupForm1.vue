<template>
  <section class="hero">
    <div class="hero-text container">
      <section>
        <img id="logo" src="@/assets/meridi.png" alt="" />
        <div id="slogan">TCM at your fingertips</div>
        <hr />
        <h4 id="centre">Sign up as a Clinic:</h4>
        <form @submit.prevent="register">
          <el-input
            type="email"
            placeholder="Email address..."
            v-model="email"
          />
          <el-input
            type="password"
            placeholder="Password..."
            v-model="password"
          />
          <el-input type="text" placeholder="Full name..." v-model="fullname" />
          <el-input
            type="number"
            placeholder="Postal code..."
            v-model="postalcode"
          />
          <el-row>
            <el-input
              id="textarea"
              :rows="2"
              type="textarea"
              placeholder="Company description..."
              v-model="desc"
            />
          </el-row>
          <el-row>
            <el-select
              v-model="services"
              multiple
              placeholder="Service(s) provided"
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
      </section>
    </div>
  </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "SignupForm",
  data() {
    return {
      id: "Undefined User",
      email: "",
      fullname: "",
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
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          addUsertoFs(
            this.email,
            this.fullname,
            this.postalcode,
            this.id,
            this.img,
            this.desc,
            this.services
          );
          alert("Successfully registered!");
          if (this.id == "Customer") {
            console.log("success");
            this.$router.push("/Products");
          } else {
            this.$router.push("/Profile");
          }
          this.emitter.emit("loginas", { userType: this.id });
        })
        .catch((error) => {
          alert(error.message);
        });

      async function addUsertoFs(
        email,
        fullname,
        postalcode,
        id,
        img,
        desc,
        services
      ) {
        try {
          const docRef = await setDoc(doc(db, id, email), {
            email: email,
            name: fullname,
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

.hero {
  background-image: url("../assets/TCM-trans.png");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  width: 50ch;
}
#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 54%;
}
#slogan {
  text-align: center;
  font-size: 29.8px;
  font-weight: bold;
}
hr {
  border: 1px solid #ffcc00;
  width: 55%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
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
