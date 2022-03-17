<template>
  <section class="hero">
    <div>
      <button @click="toCustomerLogin()">Customer</button>
      <button @click="toClinicLogin()">Clinic</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
      toCustomerLogin() {
        this.$router.push({
          name: "Login",
          params: {
            id: "Customer"
          }
        })
        console.log("user is a Customer")
      },
      toClinicLogin() {
        this.$router.push({
          name:"Login",
          params: {
            id: "Clinic"
          }
        })
        console.log("user is a Clinic")
      },
  }
}
</script>

<style scoped>
.hero {
  padding-top: 400px;
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