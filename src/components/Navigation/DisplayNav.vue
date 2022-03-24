<template>
    <CustomerNav v-if="userType=='Customers'"/>
    <ClinicNav v-if="userType=='Clinics'"/>
</template>

<script>
import CustomerNav from '../Navigation/CustomerNav.vue';
import ClinicNav from '../Navigation/ClinicNav.vue';
//import firebaseApp from "../firebase.js";
//import { getAuth } from "firebase/auth";
//import { getFirestore, doc, getDoc } from "firebase/firestore";
//const db = getFirestore(firebaseApp);
//const auth = getAuth();

export default {
  name: 'DisplayNav',
  components: {
    CustomerNav,
    ClinicNav
  },
  data() {
    return {
      userType: "undefined",
      email: {},
}
  },
  methods: {
    loginasuser(type) {
      this.userType = type;
      console.log("hi");
    }
  },
  created() {
    this.emitter.on('loginas', (evt) => {
      this.userType = evt.userType;
    })
  }
}
//<CustomerNav v-if="userType=='Customer'" @loginasuser="loginasuser"/>
</script>
