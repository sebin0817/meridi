<template>
  <section class="hero">
    <div class="hero-text container">
      <TitleLogin :msg="msg" />
      <LoginForm />
    </div>
  </section>
</template>

<script>
import TitleLogin from "../../components/Title.vue";
import LoginForm from "../../components/Authentication/LoginForm.vue";

export default {
  name: "Login",
  data() {
    return {
      msg: "Login as a " + this.$route.params.id,
    };
  },
  components: {
    TitleLogin,
    LoginForm,
  },
};
</script>
<style lang="scss" scoped>
.hero {
  background-image: url("../../assets/TCM-trans.png");
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
