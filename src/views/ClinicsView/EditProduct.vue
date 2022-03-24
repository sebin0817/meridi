<template>
  <section class="hero">
    <div class="hero-text container">
<<<<<<< HEAD:src/views/CustomersView/EditCustomerParticulars.vue
      <EditParticularsForm/>
=======
      <EditProductForm />
>>>>>>> yating:src/views/ClinicsView/EditProduct.vue
    </div>
  </section>
</template>
<script>
<<<<<<< HEAD:src/views/CustomersView/EditCustomerParticulars.vue
import EditParticularsForm from '../../components/CustomersProfilePage/EditParticularsForm.vue'

export default {
    name: 'EditCustomerParticulars',
    components: {
      EditParticularsForm,
    },
};
</script>
=======
import EditProductForm from "@/components/ClinicsProductPage/EditProductForm.vue";
>>>>>>> yating:src/views/ClinicsView/EditProduct.vue

export default {
  name: "EditProduct",
  components: {
    EditProductForm,
  },
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