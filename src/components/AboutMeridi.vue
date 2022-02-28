<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="image">
        <img id="logo" src="@/assets/TCM.jpg" alt="" />
      </div>
    </el-col>

    <el-col :span="12">
      <div class="text">
        <img id="quotation" src="@/assets/quotation-mark.png" alt="" />
        <p id="slogan">TCM at your finger print</p>
        <br />
        <p id="description">
          meridi serves to generate an alternative stream of revenue for
          traditional TCM businesses by allowing prospective customers to
          purchase their products and services online. This is targeted at
          younger customers who are tech-savvy and highly value convenience when
          making purchases. meridi also provides TCM businesses with an
          opportunity to market their online presence, establishing their
          position in the highly competitive market.
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "aboutmeridi",
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
.el-row {
  margin-bottom: 20px;
}
#slogan {
  font-size: 40px;
}
#description {
  font-size: 20px;
}
#logo {
  width: 400px;
  align-items: center;
}
#quotation {
  width: 40px;
  opacity: 0.5;
}
</style>
