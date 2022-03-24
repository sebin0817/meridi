<template>
  <button @click="signout()">SIGN OUT</button>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  methods: {
    signout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert("You have logged out successfully.");
          this.emitter.emit("loginas", { userType: "undefined" });
          sessionStorage.setItem("useremail", "");
          sessionStorage.setItem("usertype", "");
          this.$router.push("./");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
button {
  margin-left: 16px;
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
