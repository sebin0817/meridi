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
import { GoogleMap, Marker } from 'vue3-google-map'

import axios from "axios"

async function getLatLngFromPostal(codes) {
  var LatLng = []
  for (let i = 0; i < codes.length; i++) {
    try {
      var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          codes[i] +
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
  return LatLng;
}


export default {
  name: "Map",
  components: { Marker, GoogleMap },
  props: {
		postalCode: {
			type: Array
		}
	},
  data() {
    return {
      center: { lat: 1.339987, lng: 103.810128 },
      markers: [],
    }

  },
  methods: {
    showDetail() {
      console.log("hi")
    }
  },
  async created() {
    // Place Markers on ALL Clinics
      getLatLngFromPostal(this.postalCode)
      .then((y) => {    
      y.forEach((latlng) => {
        this.markers.push({
        options: { position: latlng }
        })
      })
      })
    console.log(this.postalCode)
    }

}
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
