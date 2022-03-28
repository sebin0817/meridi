<template>
  <GoogleMap
  class="map"
  api-key= AIzaSyAAiAGnm168EvVi1bXhL8X_RMx4k7QBd78
  :center="centerlatlng"
  :zoom="13"
  >
    <Marker 
      :key="marker"
      v-for="(m, marker) in markers"
      :id="m.id"
      :options="m.options"
      @click="showCard()"/>
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
		},
    customerPostalcode: {
      type: String
    },
    center: {
      type: String
    }
	},
  data() {
    return {
      centerlatlng: { lat: 1.339987, lng: 103.810128 },
      markers: [],
      customerMarker: {},
      chosen: {},
    }

  },

  emits: ["chosen"],
  methods: {
    showCard() {
      this.chosen = 0
      this.$emit("chosen", this.chosen);
      console.log(this.chosen)
      console.log("hi")
    }
  },
  watch: {
    center: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      if (newVal == null || newVal == "") {
        this.centerlatlng = { lat: 1.339987, lng: 103.810128 }
      } else {
        getLatLngFromPostal([newVal])
        .then((y) => {
          this.centerlatlng = y[0]
        })
      }
  }
  },
  created() {
    // Place Markers on ALL Clinics and Customer
    var codes = this.postalCode
    codes.push(this.customerPostalcode)
      getLatLngFromPostal(codes)
      .then((y) => {    
      for (var i = 0; i < y.length; i++) {
        this.markers.push({
          id: i,
          options: { position: y[i], label: "" + i }
        })
      }
      // y.forEach((latlng) => {
      //   this.markers.push({
      //   id: this.id,
      //   options: { position: latlng }
      //   })
      // })
      })
    },
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
