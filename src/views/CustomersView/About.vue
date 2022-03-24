<template>
  <section class="hero">
    <div class="hero-text container">
      <AboutMeridi v-show="show" />
      <AboutTCM v-show="!show" />
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="none"
        text-color="#000"
        active-text-color="#ffcc00"
        ellipsis="true"
        collapse-transition="false"
        @select="handleSelect"
      >
        <el-menu-item index="1" @click="showMeridi">About meridi.</el-menu-item>
        <el-menu-item index="2" @click="showTCM">About TCM.</el-menu-item>
      </el-menu>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import AboutMeridi from "../../components/AboutMeridi.vue";
import AboutTCM from "../../components/AboutTCM.vue";
export default {
  name: "About",
  components: { AboutMeridi, AboutTCM },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    showMeridi() {
      this.show = true;
    },
    showTCM() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    .el-menu {
      position: absolute;
      top: 200px;
      left: 0px;
      right: 0px;
      display: flex;
      justify-content: space-evenly;
      border: none;
    }
    .el-menu-item {
      font-size: 32px;
      font-weight: bold;
    }
    .el-menu-item:hover {
      background: none !important;
    }
    .el-menu-item.is-active {
      background: none !important;
    }
    h4 {
      text-transform: uppercase;
      font-size: 22px;
      padding-bottom: 4px;
    }

    h2 {
      font-size: 50px;
      @media (min-width: 550px) {
        font-size: 80px;
      }
    }

    hr:nth-child(2) {
      max-width: 365px;
      margin-bottom: 16px;
    }
    hr:nth-child(4) {
      height: 6px;
      background-color: #fff;
      border: none;
      max-width: 85px;
      margin-top: 16px;
    }
  }
}
</style>
