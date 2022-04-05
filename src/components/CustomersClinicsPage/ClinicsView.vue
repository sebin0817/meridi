<template>
  <main>
    <el-row v-for="(clinic, index) in clinics" :key="clinic" :span="3">
      <ClinicCard :clinic="clinic" :index="index + 1" :key="clinic.id" />
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
