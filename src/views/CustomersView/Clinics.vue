<template>
  <Map v-if="mounted" :postalCode="postalCode"/>
  <el-container>
    <el-header><ClinicsForm/></el-header>
    <el-main><ClinicsView :clinics="clinics"/></el-main> 
  </el-container>
</template>

<script>
import Map from '@/components/CustomersClinicsPage/Map.vue'
import ClinicsForm from '@/components/CustomersClinicsPage/Form.vue'
import ClinicsView from '@/components/CustomersClinicsPage/ClinicsView.vue'
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import firebaseApp from '@/firebase.js'

const db = getFirestore(firebaseApp);

  async function fetchClinics() {
      let clinics = []
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
        } 
        clinics.push(clinic);
        });
      } catch (e) {
        console.log(`error when getting db ${e}`)
      }
      return clinics;
    }

export default {
  components: {
    ClinicsForm,
    Map,
    ClinicsView
  },

  created() {
    fetchClinics().then((x) => {
      x.forEach((y) => {
        this.clinics.push(y)
        this.postalCode.push(y.postalcode)
      })
      this.mounted = true
    })

  },
  data() {
    return {
      clinics: [],
      filteredClinics: [],
      postalCode: [],
      mounted: false,
      search: "",
      checkedCats: ['pain', 'treatments', 'wellness', 'kids'],
      sortBy: 0 /*sorted = 1 means high -> low, sorted = 0 means low -> high */
    }
  },
  methods: {
    filteredBySearch(searchResult) {
      this.search = searchResult;
    },
    filteredByCategory(checkedCats) {
      this.checkedCats = checkedCats;
      console.log(`inside parentl, value is ${this.checkedCats}`)
    },
    filteredProductsByCategory(product) {
      let catNames = this.checkedCats.map(cat => {
        return cat.toLowerCase();
      });
      return catNames.indexOf(product.description.toLowerCase()) >= 0;
    },
    filteredProductsBySearch(product) {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
    },
    sortByPrice(sort) {
      this.sortBy = sort;
    }
  },
  computed: {
    filterProducts() {
      return this.products.filter(product => {
        return this.filteredProductsBySearch(product) && this.filteredProductsByCategory(product);       
      }).sort((p1, p2) => {
        if (this.sortBy == 0) {
          let x = (p1.name > p2.name) ? 1 : -1;
          return x;
        } else if (this.sortBy == 1) {
          return p2.price - p1.price;
        } else if (this.sortBy == 2) {
          return p1.price - p2.price;
        }
      })
    },
  }
};
</script>


<style>

</style>