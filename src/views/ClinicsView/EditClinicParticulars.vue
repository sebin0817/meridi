<template>
  <section class="hero">
    <div class="hero-text container">
      <EditParticularsForm/>
    </div>
  </section>
</template>

<script>
import EditParticularsForm from '@/components/ClinicsProfilePage/EditParticularsForm.vue'

export default {
    name: 'EditCustomerParticulars',
    components: {
      EditParticularsForm,
    },
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
  flex-direction: column;
  justify-content: center;
  color: black;
}
</style>