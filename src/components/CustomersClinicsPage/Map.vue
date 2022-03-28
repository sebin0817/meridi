<template>
  <GoogleMap
    class="map"
    api-key="AIzaSyAAiAGnm168EvVi1bXhL8X_RMx4k7QBd78"
    :center="centerlatlng"
    :zoom="13"
  >
    <Marker
      :key="marker"
      v-for="(m, marker) in markers"
      :code="m.code"
      :options="m.options"
      @click="showCard($event)"
    />
    <Marker :options="customerMarker" />
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
import axios from "axios";

async function getLatLngFromPostal(codes) {
  var LatLng = [];
  for (let i = 0; i < codes.length; i++) {
    try {
      var { data } = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          codes[i] +
          "&key=AIzaSyAAiAGnm168EvVi1bXhL8X_RMx4k7QBd78"
      );
      if (data.error_message) {
        console.log(data.error_message);
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
    postalCodes: {
      type: Array,
    },
    customerPostalcode: {
      type: String,
    },
    center: {
      type: String,
    },
  },

  data() {
    return {
      centerlatlng: {},
      customerlatlng: {},
      markers: [],
      customerMarker: {},
      chosen: {},
    };
  },

  emits: ["chosen"],
  methods: {
    showCard(event) {
      let targetCode = event.currentTarget.code;
      console.log(targetCode);
    },
  },
  watch: {
    center: function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      if (newVal == null || newVal == "") {
        this.centerlatlng = this.customerlatlng;
      } else {
        getLatLngFromPostal([newVal]).then((y) => {
          this.centerlatlng = y[0];
        });
      }
    },
    postalCodes: function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.markers = [];
      getLatLngFromPostal(this.postalCodes).then((y) => {
        for (var i = 0; i < y.length; i++) {
          this.markers.push({
            id: i,
            options: { position: y[i], label: "" + i },
          });
        }
      });
    },
  },
  created() {
    // Place marker and center map at customer
    getLatLngFromPostal([this.customerPostalcode]).then((y) => {
      this.customerMarker = {
        options: {
          position: y[0],
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        },
      };
      this.centerlatlng = y[0];
      this.customerlatlng = y[0];
    });
    // Place Markers on ALL Clinics
    getLatLngFromPostal(this.postalCodes).then((y) => {
      for (var i = 0; i < y.length; i++) {
        this.markers.push({
          code: i,
          options: { position: y[i], label: "" + i },
        });
      }
    });
  },
};
</script>

<style scoped>
.map {
  position: relative;
  width: 700px;
  height: 525px;
  margin-top: 160px;
}
</style>
