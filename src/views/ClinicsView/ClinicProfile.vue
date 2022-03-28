<template>
  <section class="profile">
    <div class="hero-text container">
      <ClinicInfo :useremail="useremail" />
    </div>
    <!-- <EditParticularsForm /> -->
  </section>
</template>

<script>
import ClinicInfo from "../../components/ClinicsProfilePage/ClinicInfo.vue";
// import EditParticularsForm from "@/components/ClinicsProfilePage/EditParticularsForm.vue";

export default {
  name: "ClinicProfile",
  components: {
    ClinicInfo,
    // EditParticularsForm,
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
</style>
