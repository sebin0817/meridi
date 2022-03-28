<template>
  <section class="hero">
    <Map
        v-if="mounted && done"
        :postalCodes="filterPostalCodes"
        :customerPostalcode="customerPostalcode"
        :center="center"
      />
    <div class="formcard">
      <div id="formcard2">
        <ClinicsForm
          @categoryFilter="filteredByCategory($event)"
          @clinicName="filteredBySearch($event)"
          @postal="newcenter($event)"
        />
        <div class="container1">
          <ClinicsView :clinics="filterClinics" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Map from '@/components/CustomersClinicsPage/Map.vue'
import ClinicsForm from '@/components/CustomersClinicsPage/Form.vue'
import ClinicsView from '@/components/CustomersClinicsPage/ClinicsView.vue'
import { getDocs, collection, getFirestore, query, where } from 'firebase/firestore'
import firebaseApp from '@/firebase.js'
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
      let email = sessionStorage.getItem("useremail")
      const q = query(collection(db, "Customers"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docs) => {
          let y = docs.data()
          code = y.postalcode
            })
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
        this.clinics.push(y)
      })
      this.mounted = true
    })

    getCustomerPostalCode().then((x) => {
      this.customerPostalcode = x
      this.done = true
    })
  },
  data() {
    return {
      clinics: [],
      customerPostalcode: "",
      mounted: false,
      done: false,
      clinicName: "",
      center: "",
      checkedCats: ['accupuncture', 'tunia', 'herbal medication', 'gua sha', 'cupping', 'device therapy'],
    }
  },
  methods: {
    newcenter(center) {
      if (center != null) {
        this.center = center
      }
      console.log(`inside Form, center is ${this.center}`)
    },

    filteredBySearch(searchResult) {
      if (searchResult != null) {
        this.clinicName = searchResult;
      }
      console.log(`inside Form, name search is ${this.clinicName}`)
    },
    filteredByCategory(checkedCats) {
      if (checkedCats != null) {
        this.checkedCats = checkedCats;
      }
      console.log(`inside Form, services chosen are ${this.checkedCats}`)
    },
    filteredClinicsByCategory(clinic) {
      let catNames = this.checkedCats.map(cat => {
        return cat.toLowerCase();
      });
      if (catNames.length == 0) {
        return 'empty';
      }

      for (const cat of clinic.services) {
        if (catNames.indexOf(cat.toLowerCase()) >=0) {
          return true;
        }
      }
      return false;
    },
    filteredClinicsBySearch(clinic) {
        if (this.clinicName == "") {
          return 'empty';
        }
        return clinic.name.toLowerCase().includes(this.clinicName.toLowerCase());
    }
  },
  computed: {
    filterClinics() {
      let catNames = this.checkedCats.map(cat => {
        return cat.toLowerCase();
      });
      console.log('submit form')
      if (catNames.length == 0 && this.clinicName == "") {
        return this.clinics;
      }
      else {
        return this.clinics.filter((clinic) => {
          return this.filteredClinicsBySearch(clinic) && this.filteredClinicsByCategory(clinic);       
        })
      }
      
    },
    filterPostalCodes() {
      let tmp = []
      this.filterClinics.forEach((c) => {
        tmp.push(c.postalcode)
      })
      return tmp
    }
  },
};
</script>

<style scoped>
.hero {
  position: absolute;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}
.formcard2 {
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}
.container1 {
  height: 55vh;

  overflow: scroll;
}
</style>
