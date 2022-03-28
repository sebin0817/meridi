<template>
  <section class="hero">
    <div class="hero-text container">
      <AddProductForm />
    </div>
  </section>
</template>
<script>
import AddProductForm from "@/components/ClinicsProductsPage/AddProductForm.vue";

export default {
  name: "AddProduct",
  components: {
    AddProductForm,
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