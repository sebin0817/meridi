<template>
  <section class="hero">
    <div class="hero-text container">
<<<<<<< HEAD
      <ClinicInfo :useremail="useremail"/>
=======
      <EditParticularsForm/>
>>>>>>> hai
    </div>
  </section>
</template>

<script>
<<<<<<< HEAD
import ClinicInfo from '../../components/ClinicsProfilePage/ClinicInfo.vue'


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
=======
import EditParticularsForm from '../../components/ClinicsProfilePage/EditParticularsForm.vue'

export default {
    name: 'EditCustomerParticulars',
    components: {
      EditParticularsForm,
    },
>>>>>>> hai
};
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
<<<<<<< HEAD
  flex-direction: column; 
=======
  flex-direction: column;
>>>>>>> hai
  justify-content: center;
  color: black;
}
</style>