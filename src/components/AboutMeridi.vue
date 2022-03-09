<template>
  <section class="hero">
    <div class="hero-text container">
      <section id="meridi">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="image">
              <img id="logo" src="@/assets/TCM.jpg" alt="" />
            </div>
          </el-col>

          <el-col :span="12">
            <div class="text">
              <img
                id="quotation"
                src="@/assets/quotation-mark-black.png"
                alt=""
              />
              <p id="slogan">TCM at your finger print</p>
              <br />
              <p id="description">
                meridi serves to generate an alternative stream of revenue for
                traditional TCM businesses by allowing prospective customers to
                purchase their products and services online. This is targeted at
                younger customers who are tech-savvy and highly value
                convenience when making purchases. meridi also provides TCM
                businesses with an opportunity to market their online presence,
                establishing their position in the highly competitive market.
              </p>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: "aboutmeridi",
};
</script>

<style lang="scss" scoped>
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
#meridi {
  position: absolute;
  top: 300px;
  left: 0px;
  right: 0px;
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
  width: 90%;
}
#text {
  width: 90%;
}
#quotation {
  width: 10%;
  opacity: 0.5;
}
</style>
