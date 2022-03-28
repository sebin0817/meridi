<template>
  <section class="hero">
    <OrderHistory />
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
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  height: 100vh;
}
</style>
