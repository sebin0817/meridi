<template>
  <section class="hero">
    <div class="hero-text container">
      <section id="meridi">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="image">
              <img id="logo" src="../../assets/TCM.jpg" alt="" />
            </div>
          </el-col>

          <el-col :span="12">
            <div class="text">
              <img
                id="quotation"
                src="../../assets/quotation-mark-black.png"
                alt=""
              />
              <p id="slogan">TCM at your finger print</p>
              <br />
              <p id="description">
                meridi serves to generate an alternative stream of revenue for
                traditional TCM businesses by allowing prospective customers to
                purchase their products and services online. <br /><br />This is
                targeted at younger customers who are tech-savvy and highly
                value convenience when making purchases. meridi also provides
                TCM businesses with an opportunity to market their online
                presence, establishing their position in the highly competitive
                market.
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
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
  font-family: "Nunito Sans", sans-serif;
}
#meridi {
  position: absolute;
  top: 240px;
  left: 0px;
  right: 0px;
}
.el-row {
  margin-bottom: 20px;
}
#slogan {
  font-size: 30px;
  font-family: "Nunito Sans", sans-serif;
}
#description {
  font-size: 18px;
  font-family: "Nunito Sans", sans-serif;
}
#logo {
  width: 90%;
  margin-top: 40px;
}
#text {
  width: 90%;
}
#quotation {
  width: 7%;
  opacity: 0.5;
}
</style>
