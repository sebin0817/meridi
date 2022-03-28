<template>
  <Map v-if="mounted && done" :postalCode="postalCode" :customerPostalcode="customerPostalcode"/>
  <el-container>
    <el-main><ClinicsView :clinics="filterClinics"/></el-main> 
  </el-container>
  <ClinicsForm @categoryFilter="filteredByCategory($event)" @clinicName="filteredBySearch($event)" @postal="postal" />
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
        this.postalCode.push(y.postalcode)
      })
    })
    this.filterClinics.forEach((y) => {
        this.postalCode.push(y.postalcode)
      })
      this.mounted = true

    getCustomerPostalCode().then((x) => {
      this.customerPostalcode = x
      this.done = true
    })

  },
  data() {
    return {
      clinics: [],
      filteredClinics: [],
      postalCode: [],
      customerPostalcode: "",
      mounted: false,
      done: false,
      clinicName: "",
      postal: "",
      checkedCats: ['accupuncture', 'tunia', 'herbal medication', 'gua sha', 'cupping', 'device therapy'],
    }
  },
  methods: {
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
      let catNames = this.checkedCats;
      for (const cat of clinic.services) {
        if (catNames.indexOf(cat.toLowerCase()) >=0) {
          return true;
        }
      }
      return false;
    },

    filteredClinicsBySearch(clinic) {
        return clinic.name.toLowerCase().includes(this.clinicName.toLowerCase());
    }
  },
  computed: {
    filterClinics() {
      return this.clinics.filter((clinic) => {
        return this.filteredClinicsBySearch(clinic) && this.filteredClinicsByCategory(clinic);       
      })
    },
  },
};
</script>

<style></style>
