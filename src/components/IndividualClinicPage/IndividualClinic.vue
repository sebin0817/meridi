<template>
  <section class="hero">
    <div class="hero-text container">
      <section id="clinic">
        <div id="aside">
          <img
            :src="`${clinic.imgURL}`"
            alt="clinic img"
            class="image"
            style="height: 400px; width: 400px"
          />
        </div>
        <div id="main" class="text">
          <div>
            <h2 id="name">{{ clinic.name }}</h2>
            <h3 style="font-size: 20px; font-weight: bold">{{address}}</h3>
          </div>
          <div>
            <h2 style="font-size: 20px; font-weight: bold">Appointment Form</h2>
            <AppointmentForm />
          </div>
          
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import AppointmentForm from './AppointmentForm.vue';

import { getFirestore, getDocs, collection } from "firebase/firestore"; 
import firebaseApp from "../../firebase.js";

import axios from "axios";

const db = getFirestore(firebaseApp)

export default {
  components: {
    AppointmentForm
  },
  data() {
    return {
      clinic: {},
      address: "",
      postalcode: ""
    }
  },

  mounted() {
    this.id = this.$route.params.id;
  },

  created() {
    var self = this;
    async function fetchClinics() {
      let clinicsDb = await getDocs(collection(db, "Clinics"));
      let postalcode = '119081';
      try {
        clinicsDb.forEach((docs) => {
          let clinicData = docs.data();
          let clinic = {
            id: docs.id,
            name: clinicData.name,
            email: clinicData.email,
            description: clinicData.desc,
            services: clinicData.services,
            postalcode: clinicData.postalcode,
            orderhistory: clinicData.orderhistory,
            imgURL: clinicData.image,
          };
          if (clinic.id === self.id) {
            self.clinic = clinic;
            postalcode = clinic.postalcode; 
          }
        });
      } catch (e) {
        console.log(`error when getting db ${e}`);
      }
      return postalcode;
    }

    async function geo(postalcode) {
      // console.log(postalcode);
      let geo = await axios.get(
              `https://developers.onemap.sg/commonapi/search?searchVal=${postalcode}
              &returnGeom=Y&getAddrDetails=Y&pageNum=1`
            );
            self.address = geo['data']['results'][0]['ADDRESS'];
            console.log(self.address);
    }
    
    fetchClinics().then((x) => geo(x));
  }

}
  
  
</script>

<style scoped>
html {
  font-size: 62.5%;
}

.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  background-color: white;
}

.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}

.text {
  font-family: "Georgia", Times, serif;
  line-height: 1.6;
}

#clinic {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 70rem;
  align-items: center;
}

#aside {
  flex: 1;
  margin: 3rem;
}

#main {
  flex: 1;
  margin: 3rem;
}

#name {
  font-size: 30px;
  font-weight: bold;
}

</style>