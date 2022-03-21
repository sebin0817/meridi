<template>
  <section class="hero">
    <div class="hero-text container">
      <EditProductForm />
    </div>
  </section>
</template>
<script>
import EditProductForm from "@/components/ClinicsProductPage/EditProductForm.vue";

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