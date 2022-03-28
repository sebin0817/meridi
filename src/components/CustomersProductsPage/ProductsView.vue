<template>
  <main>
    <el-row class="container">
      <el-col v-for="product in products" :key="product" :span="8">
        <ProductCard :product="product" :key="product.id" class="card-wrap" />
      </el-col>
    </el-row>
  </main>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
  },

  props: {
    products: {
      type: Array,
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
}

.card-wrap {
  flex: 0 0 33.333%;
  display: flex;
  padding: 10px; /* gutter width */
}
</style>
