<template>
  <GoogleMap
  class="map"
  api-key= AIzaSyAAiAGnm168EvVi1bXhL8X_RMx4k7QBd78
  :center="center"
  :zoom="12"
  >
    <Marker 
      :key="marker"
      v-for="(m, marker) in markers"
      :options="m.options"
      @mouseover="showDetail()"/>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import firebaseApp from '../firebase.js'
import { getFirestore } from "firebase/firestore"
import {collection, getDocs} from "firebase/firestore"
import axios from "axios"

const db = getFirestore(firebaseApp);
let postalCode = []
async function getPostalCode() {
    let z = await getDocs(collection(db, "Clinics"))
    z.forEach((docs) => {
      let y = docs.data()
      postalCode.push(y.PostalCode)
    })
}
getPostalCode()
//postalCode.forEach((code) => {
//})
var LatLng = []
async function getLatLngFromPostal(code) {
   try {
      var {
         data
      } = await axios.get(
         "https://maps.googleapis.com/maps/api/geocode/json?address=" +
         code +
         "&key=AIzaSyAAiAGnm168EvVi1bXhL8X_RMx4k7QBd78"
      );
      if (data.error_message) {
         console.log(data.error_message)
      } else {
         LatLng.push(data.results[0].geometry.location);
      }
   } catch (error) {
      console.log(error.message);
   }
}
getLatLngFromPostal("138598")
getLatLngFromPostal("437239")
getLatLngFromPostal("138522")


export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 1.339987, lng: 103.810128 }
    const markers = [];
      LatLng.forEach((latlng) => {
        markers.push({
          options: {
            position: latlng
          }
        })
      })


    return { center, markers }
  },
  methods: {
    showDetail() {
      console.log("hi")
    }
  }
})
</script>

<style scoped>
.map {
  position: relative;
  width: 500px;
  height: 500px;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}
</style>
