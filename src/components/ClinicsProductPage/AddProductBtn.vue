<template>
  <button @click="addProduct">ADD PRODUCT</button>
</template>

<script>
export default {
  methods: {
    addProduct() {
      this.$router.push("/AddProduct");
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
button {
  margin-left: auto;
  margin-bottom: 10px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}
button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}
</style>
