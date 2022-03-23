<template>
  <section class="hero">
    <div class="hero-text container">
      <ApptForm />
    </div>
  </section>
</template>

<script>
import ApptForm from "@/components/CustomersClinicsPage/AppointmentForm.vue";

export default {
  name: "Login",
  components: {
    ApptForm,
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
