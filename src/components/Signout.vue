<template>
    <button @click="signout()">SIGN OUT</button>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    methods: {
        signout() {
          const auth = getAuth();
          signOut(auth).then(() => {
            alert("You have logged out successfully.");
            this.$router.push('./');
          }).catch((error) => {
              console.log(error);
          })
        }
    }
}
</script>
