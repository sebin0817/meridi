<template>
  <section class="hero">
    <div class="hero-text container">
      <OrderHistory />
    </div>
  </section>
</template>

<script>
import OrderHistory from "@/components/ClinicsOrdersPage/OrderHistory.vue";

export default {
  name: "Login",
  components: {
    OrderHistory,
  },
};
</script>

<style scoped>
.hero {
  background-attachment: fixed;
  position: absolute;
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
