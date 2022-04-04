<template>
  <section class="hero">
    <el-container id="container">
      <el-header id="historyheader">Purchase History</el-header>
      <h4 v-if="len == undefined">You do not have any past orders</h4>
      <el-main>
        <el-scrollbar>
          <div class="order" v-for="order in purchasehistory" :key="order">
            <h4 id="orderdate">Ordered on {{ order.dop }}</h4>
            <el-table :data="obtoarr(order)">
              <el-table-column prop="no" label="No." width="80px" />
              <el-table-column prop="name" label="Product" width="350px" />
              <el-table-column prop="unitprice" label="Unit Price" />
              <el-table-column prop="quantity" label="Quantity" />
            </el-table>
            <h4 id="total">Total: ${{ order.total }}</h4>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </section>
</template>

<script>
export default {
  name: "PurchaseHistory",
  data() {
    return {
      purchasehistory: {},
    };
  },
  props: {
    user: Object,
  },
  computed: {
    len() {
      return this.purchasehistory.length;
    },
  },
  created() {
    this.purchasehistory = this.user.purchasehistory;
  },
  methods: {
    obtoarr(order) {
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
* {
  font-family: "Nunito Sans", sans-serif;
}
#historyheader {
  font-size: 20px;
  height: 30px;
  margin-top: 40px;
}
#container {
  width: 80%;
}
h4 {
  text-align: right;
}
#orderdate {
  margin-bottom: 8px;
}
#total {
  margin-top: 8px;
}
.order {
  margin-bottom: 30px;
}
</style>
