<template>
  <section class="hero">
    <el-container id="container">
      <el-header id="historyheader">Purchase History</el-header>
      <el-main>
        <el-scrollbar>
          <div class="order" v-for="order in purchasehistory" :key="order">
            <el-table :data="obtoarr(order)">
              <el-table-column prop="no" label="No." width="80px" />
              <el-table-column prop="name" label="Product" width="450px" />
              <el-table-column
                prop="unitprice"
                label="Unit Price"
                width="100px"
              />
              <el-table-column prop="quantity" label="Quantity" />
            </el-table>
            <h4>Total: ${{ order.total }}</h4>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>

    <!--div id="purchase-history-div">
      <div class="order" v-for="order in purchasehistory" :key="order">
        <table class="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Purchased Quantity</th>
            </tr>
          </thead>
          <tbody
            class="item"
            v-for="(item, name) in order.products"
            :key="item"
          >
            <tr>
              <td>{{ name }}</td>
              <td>
                <router-link
                  id="product"
                  :to="{ name: 'IndividualProduct', params: { id: item.id } }"
                >
                  {{ name }}
                </router-link>
              </td>
              <td>{{ item.unitprice }}</td>
              <td>{{ item.quantity }}</td>
            </tr>
          </tbody>
          <tr>
            <td colspan="3">Total: ${{ order.total }}</td>
          </tr>
        </table>
      </div>
    </div-->
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
#historyheader {
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  height: 30px;
}
/*.table {
  border-collapse: collapse;
  margin: 25px 0;
  font-family: "Nunito Sans", sans-serif;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 0 0 2px #bebebe;
}
table tr:first-child th:first-child {
  border-top-left-radius: 6px;
}

table tr:first-child th:last-child {
  border-top-right-radius: 6px;
}
.table thead tr {
  background-color: #d7d7d7;
  text-align: left;
}
.table th,
.table td {
  padding: 12px 15px;
}
.table tbody tr {
  border-bottom: 2px solid #bebebe;
}
#product {
  color:black;
}
#product:hover {
  color: #ffcc00;
}*/
#container {
  width: 80%;
  font-family: "Nunito Sans", sans-serif;
}
h4 {
  text-align: right;
}
.order {
  margin-bottom: 10px;
}
</style>
