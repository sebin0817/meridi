<template>
  <div id="container">
    <el-row>
      <e-col>
        <h1>Product List</h1>
      </e-col>
      <el-col>
        <AddProductBtn style="float: right" />
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="product in products" :key="product" :span="6">
        <ProductCard :product="product" :key="product.id" @delete="update"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AddProductBtn from "@/components/ClinicsProductsPage/AddProductBtn.vue";
import ProductCard from "./ProductCard.vue";
export default {
  name: "ProductsView",
  components: {
    ProductCard,
    AddProductBtn,
  },
  props: {
    products: {
      type: Array,
    },
  },
  emits: ["delete"],
  methods: {
    update() {
      this.$emit("delete");
    },
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
#container {
  width: 100%;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  height: 30px;
}
</style>
