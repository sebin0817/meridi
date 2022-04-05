<template>
  <div id="container">
    <h1>Order History</h1>
    <el-row v-if="len == 0">
      <el-icon class="el-input__icon"><ShoppingCart /></el-icon>
    </el-row>
    <el-row v-if="len == 0">
      <h1 id="empty">You do not have any past orders</h1>
    </el-row>
    <el-main>
      <el-scrollbar>
        <div class="order" v-for="order in orderhistory" :key="order">
          <h4>{{ order.custname }} ordered on {{ order.dop }}</h4>
          <el-table :data="obtoarr(order)">
            <el-table-column prop="no" label="No." width="80px" />
            <el-table-column prop="name" label="Product" width="550px" />
            <el-table-column prop="quantity" label="Quantity" width="80px" />
            <el-table-column prop="totalprice" label="Price" />
          </el-table>
        </div>
      </el-scrollbar>
    </el-main>
  </div>
</template>

<script>
import { ShoppingCart } from "@element-plus/icons-vue";
export default {
  props: {
    orderhistory: Object,
  },
  components: {
    ShoppingCart,
  },
  computed: {
    len() {
      var count = 0;
      for (const key of Object.keys(this.orderhistory)) {
        console.log(key);
        count += 1;
      }
      return count;
    },
  },
  methods: {
    obtoarr(order) {
      console.log(this.orderhistory.length);
      var prodsobj = order.products;
      var prodsarr = [];
      var index = 1;
      for (const [key, value] of Object.entries(prodsobj)) {
        var product = value;
        product.name = key;
        product.no = index;
        prodsarr.push(product);
        index++;
      }
      return prodsarr;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
#historyheader {
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  height: 30px;
}
#container {
  width: 100%;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  font-family: "Nunito Sans", sans-serif;
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
  margin-top: 100px;
}
</style>
