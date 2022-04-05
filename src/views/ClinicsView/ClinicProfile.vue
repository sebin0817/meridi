<template>
  <section class="profile">
    <ClinicInfo id="info" :useremail="useremail" />
    <MonthlyRevenue id="mr" :useremail="useremail" />
  </section>
</template>

<script>
import ClinicInfo from "../../components/ClinicsProfilePage/ClinicInfo.vue";
import MonthlyRevenue from "../../components/ClinicsProfilePage/MonthlyRevenue.vue";

export default {
  name: "ClinicProfile",
  components: {
    ClinicInfo,
    MonthlyRevenue,
  },
  computed: {
    useremail() {
      return sessionStorage.getItem("useremail");
    },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  height: 100%;
  padding-top: 100px;
}
#info {
  width: 35%;
}
#mr {
  width: 65%;
}
</style>
