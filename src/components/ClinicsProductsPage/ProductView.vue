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
    <el-row v-show="empty">
      <el-icon class="el-input__icon"><TakeawayBox /></el-icon>
    </el-row>
    <el-row v-show="empty">
      <h1 id="empty">Your Product List is Empty</h1>
    </el-row>
    <el-row>
      <el-col v-for="product in products" :key="product" :span="6">
        <ProductCard :product="product" :key="product.id" @delete="update" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { TakeawayBox } from "@element-plus/icons-vue";
import AddProductBtn from "@/components/ClinicsProductsPage/AddProductBtn.vue";
import ProductCard from "./ProductCard.vue";
export default {
  name: "ProductsView",
  data() {
    return {
      empty: this.show,
    };
  },
  components: {
    ProductCard,
    AddProductBtn,
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
  emits: ["delete"],
  methods: {
    update() {
      this.$emit("delete");
    },
  },
  watch: {
    show() {
      this.empty = this.show;
    }
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
