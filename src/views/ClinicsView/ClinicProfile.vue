<template>
  <section class="profile">
      <ClinicInfo id="info" :useremail="useremail" />
  </section>
</template>

<script>
import ClinicInfo from "../../components/ClinicsProfilePage/ClinicInfo.vue";

export default {
  name: "ClinicProfile",
  components: {
    ClinicInfo,
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
}
#info {
  width: 100%;
}
</style>
