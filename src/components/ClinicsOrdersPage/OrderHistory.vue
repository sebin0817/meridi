<template>
  <el-container id="container">
    <el-header id="historyheader">Order History</el-header>
    <el-main>
      <el-scrollbar>
        <div class="order" v-for="order in orderhistory" :key="order">
        <h4>{{ order.custname }} ordered on {{ order.dop }}</h4>
        <el-table  :data="obtoarr(order)">
          <el-table-column prop="no" label="No." width="80px" />
          <el-table-column prop="name" label="Product" width="550px" />
          <el-table-column prop="quantity" label="Quantity" width="80px" />
          <el-table-column prop="totalprice" label="Price" />
        </el-table>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
export default {
  props: {
    orderhistory: Object
  },
  methods: {
    obtoarr(order) {
      var prodsobj = order.products
      var prodsarr = []
      var index = 1
      for (const [key, value] of Object.entries(prodsobj)) {
        var product = value
        product.name = key
        product.no = index
        prodsarr.push(product)
        index++
      }
      return prodsarr
    }
  }
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
  width: 80%;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  font-family: "Nunito Sans", sans-serif;
}
</style>