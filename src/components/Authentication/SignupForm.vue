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
          <el-icon class="el-input__icon"><map-location /></el-icon> </template
      ></el-input>
      <div id="centre">
        <button type="submit">SIGN UP</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import firebaseApp from "../../firebase.js";
const db = getFirestore(firebaseApp)
export default {
    name: 'SignupForm',
    data() { 
      return { 
        tempType: sessionStorage.getItem("tempType"),
        email: '', 
        name: '',
        postalcode: '',
        password: '', 
      }; 
    },
    methods: {
      register() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,this.email,this.password)
          .then(() => {
            addUsertoFs(this.email,this.name,this.postalcode,this.tempType);
            alert('Successfully registered!');
            sessionStorage.setItem("useremail", this.email);
            sessionStorage.setItem("usertype", this.tempType);
            this.$router.push('/Products');
            this.emitter.emit('loginas', {'userType': this.tempType})
          })
          .catch(error => {
            alert(error.message);
          });
        async function addUsertoFs(email,name,postalcode,type) {
          try {
            const docRef = await setDoc(doc(db,type,email), {
            email: email, name: name, postalcode: postalcode, purchasehistory: {}
              // purchasehistory: {
              //   1: {
              //     items: {
              //       item1: ["item1",1,50],
              //       item2: ["item2",1,50]
              //     },
              //     total: 100
              //   },
              //   2: {
              //     items: {
              //       item3: ["item3",1,60],
              //       item4: ["item4",1,50]
              //     },
              //     total: 110
              //   },
              // }
            })
            console.log(docRef)
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