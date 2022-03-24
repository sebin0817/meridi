<template>
  <section>
    <img id="logo" src="../../assets/meridi.png" alt="" />
    <div id="slogan">
      {{ msg }}
    </div>
    <hr />
  </section>
</template>
<script>
export default {
  name: "title",

  props: {
    msg: String,
  },
};
</script>

<style scoped>
#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
#slogan {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
hr {
  border: 1px solid #ffcc00;
  width: 20%;
  margin: auto;
  margin-top: 30px;
}
</style>
