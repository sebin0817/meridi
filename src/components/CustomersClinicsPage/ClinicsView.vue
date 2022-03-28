<template>
  <main>
    <el-row v-for="clinic in clinics" :key="clinic" :span="3">
      <!-- <el-col v-for="clinic in clinics" :key="clinic" :span="3"> -->
      <ClinicCard :clinic="clinic" :key="clinic.id" />
      <!-- </el-col> -->
    </el-row>
  </main>
</template>

<script>
import ClinicCard from "./ClinicCard.vue";

export default {
  name: "ClinicsView",
  components: {
    ClinicCard,
  },

  created() {
    console.log(this.clinics);
  },

  props: {
    clinics: {
      type: Array,
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped></style>
