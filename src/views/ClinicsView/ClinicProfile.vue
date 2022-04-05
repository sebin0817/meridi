<template>
  <section class="hero">
    <el-container class="hero-text">
      <section class="profile">
        <ClinicInfo id="info" :useremail="useremail" />
        <MonthlyRevenue id="mr" :useremail="useremail" />
      </section>
    </el-container>
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
/*.profile {
  display: flex;
  height: 100%;
  padding-top: 100px;
}*/
.hero {
  background-attachment: fixed;
  position: relative;
}
.hero-text {
  justify-content: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: black;
}
.profile {
  display: flex;
  height: 100%;
  padding-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
#info {
  width: 40%;
}
#mr {
  width: 90%;
}
</style>
