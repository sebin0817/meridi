<template>
  <section class="hero">
    <!--div class="hero-text container"-->
    <Title :msg="msg" />
    <UserType />
    <!--/div-->
  </section>
</template>

<script>
import Title from "../../components/Authentication/Title.vue";
import UserType from "../../components/Authentication/UserType.vue";
export default {
  name: "Home",
  components: { Title, UserType },
  data() {
    return {
      msg: "TCM at your fingertips",
    };
  },
};
</script>

<style scoped>
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
