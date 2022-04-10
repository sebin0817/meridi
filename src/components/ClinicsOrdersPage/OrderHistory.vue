<template>
  <el-container id="container">
    <el-header id="historyheader">Order History</el-header>
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
  </el-container >
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
      var count = Object.keys(this.orderhistory).length;
      return count;
      },
  },
  methods: {
    obtoarr(order) {
      // console.log(this.orderhistory.length);
      var prodsobj = order.products;
      var prodsarr = [];
      var index = 1;
      for (const value of Object.values(prodsobj)) {
        var product = value;
        product.name = value.name;
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
* {
  font-family: "Nunito Sans", sans-serif;
}
#historyheader {
  font-size: 20px;
  height: 30px;
}
#container {
  width: 100%;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
}
h4 {
  margin-bottom: 8px;
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
.order {
  margin-bottom: 30px;
}
</style>
