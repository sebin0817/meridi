<template>
  <div class="form">
    <form @submit.prevent="register">
      <h4 id="centre">Sign up as a Customer:</h4>
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
        id="fullname"
        v-model="fullname"
        type="text"
        placeholder="Full Name"
        ><template #prefix>
          <el-icon class="el-input__icon"><avatar /></el-icon> </template
      ></el-input>
      <el-input
        id="postalcode"
        v-model="postalcode"
        type="number"
        placeholder="Postal Code"
        ><template #prefix>
          <el-icon class="el-input__icon"><map-location /></el-icon> </template
      ></el-input>
      <div id="centre">
        <button type="submit">SIGN UP</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Message, Lock, Avatar, MapLocation } from "@element-plus/icons-vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "SignupForm",
  components: { Message, Lock, Avatar, MapLocation },

  data() {
    return {
      id: "Undefined User",
      email: "",
      fullname: "",
      postalcode: "",
      password: "",
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
          addUsertoFs(this.email, this.fullname, this.postalcode, this.id);
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

      async function addUsertoFs(email, fullname, postalcode, id) {
        try {
          const docRef = await setDoc(doc(db, id, email), {
            email: email,
            name: fullname,
            postalcode: postalcode,
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
