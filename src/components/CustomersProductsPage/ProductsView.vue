<template>
  <main>
    <div class="container">
      <el-row v-show="empty">
        <el-icon class="el-input__icon"><TakeawayBox /></el-icon>
      </el-row>
      <el-row v-show="empty">
        <h1 id="empty">No Product is Available</h1>
      </el-row>
      <el-row>
        <el-col v-for="product in products" :key="product" :span="8">
          <ProductCard :product="product" :key="product.id" class="card-wrap" />
        </el-col>
      </el-row>
    </div>
  </main>
</template>

<script>
import { TakeawayBox } from "@element-plus/icons-vue";
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
    TakeawayBox,
  },

  props: {
    products: {
      type: Array,
    },
    show: {
      type: Boolean,
    },
  },

  data() {
    return { empty: this.show };
  },
  watch: {
    show() {
      this.empty = this.show;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  height: 30px;
}
#empty {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
.el-input__icon {
  margin-left: auto;
  margin-right: auto;
  font-size: 5rem;
  margin-top: 10px;
}
</style>
