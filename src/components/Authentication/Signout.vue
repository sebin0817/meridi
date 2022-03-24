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
button {
  margin-left: 16px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
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
