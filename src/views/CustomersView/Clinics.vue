<template>
  <section class="hero">
    <el-container class="hero-text">
      <class class="outermost">
        <div class="outer">
          <div class="formclinic">
            <div class="top">
              <ClinicsForm
                @categoryFilter="filteredByCategory($event)"
                @clinicName="filteredBySearch($event)"
                @postal="newcenter($event)"
              />
            </div>
            <div class="below">
              <ClinicsView :clinics="filterClinics" />
            </div>
          </div>
        </div>
        <div class="map">
          <Map
            v-if="mounted && done"
            :postalCodes="filterPostalCodes"
            :customerPostalcode="customerPostalcode"
            :center="center"
          />
        </div>
      </class>
    </el-container>
  </section>
</template>

<script>
import Map from "@/components/CustomersClinicsPage/Map.vue";
import ClinicsForm from "@/components/CustomersClinicsPage/Form.vue";
import ClinicsView from "@/components/CustomersClinicsPage/ClinicsView.vue";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "@/firebase.js";
const db = getFirestore(firebaseApp);
async function fetchClinics() {
  let clinics = [];
  let clinicsDB = await getDocs(collection(db, "Clinics"));
  try {
    clinicsDB.forEach((docs) => {
      let clinicData = docs.data();
      let clinic = {
        id: docs.id,
        name: clinicData.name,
        description: clinicData.desc,
        postalcode: clinicData.postalcode,
        services: clinicData.services,
      };
      clinics.push(clinic);
    });
  } catch (e) {
    console.log(`error when getting db ${e}`);
  }
  return clinics;
}
async function getCustomerPostalCode() {
  let code;
  let email = sessionStorage.getItem("useremail");
  const q = query(collection(db, "Customers"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
    let y = docs.data();
    code = y.postalcode;
  });
  return code;
}
export default {
  components: {
    ClinicsForm,
    Map,
    ClinicsView,
  },
  created() {
    fetchClinics().then((x) => {
      x.forEach((y) => {
        this.clinics.push(y);
      });
      this.mounted = true;
    });

    getCustomerPostalCode().then((x) => {
      this.customerPostalcode = x;
      this.done = true;
    });
  },
  data() {
    return {
      clinics: [],
      customerPostalcode: "",
      mounted: false,
      done: false,
      clinicName: "",
      center: "",
      checkedCats: [
        "accupuncture",
        "tunia",
        "herbal medication",
        "gua sha",
        "cupping",
        "device therapy",
      ],
    };
  },
  methods: {
    newcenter(center) {
      if (center != null) {
        this.center = center;
      }
      console.log(`inside Form, center is ${this.center}`);
    },

    filteredBySearch(searchResult) {
      if (searchResult != null) {
        this.clinicName = searchResult;
      }
      console.log(`inside Form, name search is ${this.clinicName}`);
    },
    filteredByCategory(checkedCats) {
      if (checkedCats != null) {
        this.checkedCats = checkedCats;
      }
      console.log(`inside Form, services chosen are ${this.checkedCats}`);
    },
    filteredClinicsByCategory(clinic) {
      let catNames = this.checkedCats.map((cat) => {
        return cat.toLowerCase();
      });
      if (catNames.length == 0) {
        return "empty";
      }

      for (const cat of clinic.services) {
        if (catNames.indexOf(cat.toLowerCase()) >= 0) {
          return true;
        }
      }
      return false;
    },
    filteredClinicsBySearch(clinic) {
      if (this.clinicName == "") {
        return "empty";
      }
      return clinic.name.toLowerCase().includes(this.clinicName.toLowerCase());
    },
  },
  computed: {
    filterClinics() {
      let catNames = this.checkedCats.map((cat) => {
        return cat.toLowerCase();
      });
      console.log("submit form");
      if (catNames.length == 0 && this.clinicName == "") {
        return this.clinics;
      } else {
        return this.clinics.filter((clinic) => {
          return (
            this.filteredClinicsBySearch(clinic) &&
            this.filteredClinicsByCategory(clinic)
          );
        });
      }
    },
    filterPostalCodes() {
      let tmp = [];
      this.filterClinics.forEach((c) => {
        tmp.push(c.postalcode);
      });
      return tmp;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.hero {
  background-attachment: fixed;
  position: relative;
}
.hero-text {
  justify-content: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: black;
}
.outer {
  margin-top: 9rem;
  margin-left: auto;
  margin-right: auto;
  width: 80rem;
  background: black;
}
.formclinic {
  display: grid;
  grid-template: 1fr 1fr;
}
.outer > * {
  position: absolute;
  grid-column: 1 / 1;
  grid-row: 1 / 1;
}
.outer .below {
  z-index: 2;
  height: 50vh;
  overflow: scroll;
  margin-left: 5rem;
  margin-right: 5rem;
}
.outer .top {
  z-index: 1;
}
.outermost {
  margin-left: auto;
  margin-right: auto;
}
.map {
  margin-left: 11rem;
  height: 68vh;
}
</style>
