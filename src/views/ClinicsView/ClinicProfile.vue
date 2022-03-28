<template>
  <section class="hero">
    <div class="hero-text container">
      <ClinicInfo :useremail="useremail"/>
    </div>
  </section>
</template>

<script>
import ClinicInfo from '@/components/ClinicsProfilePage/ClinicInfo.vue'

export default {
  name: 'ClinicProfile',
  components: {
    ClinicInfo,
  }, 
  computed: {
    useremail() {
      return sessionStorage.getItem("useremail");
    }
  }
}
</script>

<style scoped>
.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}
</style>