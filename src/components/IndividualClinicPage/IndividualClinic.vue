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
            <h2 id="name" @click="checkClinic">{{ clinic.name }}</h2>
            <h4 style="font-size: 15px; font-weight: bold">{{ address }}</h4>
          </div>
          <br />

          <div class="form">
            <h2
              id="centre"
              style="
                font-size: 20px;
                font-weight: bold;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
              "
            >
              Appointment Form
            </h2>
            <AppointmentForm />
          </div>
          <br />
          <div id="centre">
            <h4 class="back" @click="goBack()">Back to Clinics Page</h4>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import AppointmentForm from "./AppointmentForm.vue";

import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../../firebase.js";

import axios from "axios";

const db = getFirestore(firebaseApp);

export default {
  components: {
    AppointmentForm,
  },
  data() {
    return {
      clinic: {},
      address: "",
      postalcode: "",
    };
  },
  methods: {
    checkClinic() {
      this.$router.push({
        name: "CheckClinic",
        params: {
          id: this.clinic.id,
        },
      });
    },
    goBack() {
      this.$router.push("../");
    },
  },
  mounted() {
    this.id = this.$route.params.id;
  },

  created() {
    var self = this;
    async function fetchClinics() {
      let clinicsDb = await getDocs(collection(db, "Clinics"));
      let postalcode = "119081";
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
      self.address = geo["data"]["results"][0]["ADDRESS"];
      console.log(self.address);
    }

    fetchClinics().then((x) => geo(x));
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
* {
  font-family: "Nunito Sans", sans-serif;
}
html {
  font-size: 62.5%;
}

.hero {
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
}

.text {
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
  text-decoration: underline;
}
#name:hover {
  cursor: pointer;
  color: #ffcc00;
}
#centre {
  display: flex;
  justify-content: center;
  align-items: center;
}
.back {
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}
.back:hover {
  cursor: pointer;
}
.form {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
}
</style>
