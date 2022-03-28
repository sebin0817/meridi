<template>
  <section class="hero">
    <div class="hero-text container">
      <Title :msg="msg" />
      <SignupForm />
    </div>
  </section>
</template>

<script>
import Title from "../../components/Authentication/Title.vue";
import SignupForm from "@/components/Authentication/SignupForm.vue";

export default {
  name: "Signup",
  data() {
    return {
      msg: "Sign up as " + sessionStorage.getItem("tempType"),
    };
  },
  components: {
    SignupForm,
    Title,
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
