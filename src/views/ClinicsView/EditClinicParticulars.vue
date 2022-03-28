<template>
  <section class="hero">
    <EditParticularsForm />
  </section>
</template>

<script>
import EditParticularsForm from '@/components/ClinicsProfilePage/EditParticularsForm.vue'

export default {
  name: "EditCustomerParticulars",
  components: {
    EditParticularsForm,
  },
};
</script>

<style scoped>
.hero {
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  height: 100vh;
}
</style>
