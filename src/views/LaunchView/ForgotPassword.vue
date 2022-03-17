<template>
  <section class="hero">
    <div class="hero-text container">
      <Title :msg="msg" />
      <ForgotPasswordForm />
    </div>
  </section>
</template>

<script>
import ForgotPasswordForm from '@/components/Authentication/ForgotPasswordForm.vue'
import Title from "@/components/Title.vue";

export default {
  name: "ForgotPassword",
  data() {
    return {
      msg: "TCM at your fingertips",
    };
  },
  components: {
    ForgotPasswordForm,
    Title,
  },
};
</script>
<style lang="scss" scoped>
.hero {
  background-image: url("../assets/TCM-trans.png");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
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
