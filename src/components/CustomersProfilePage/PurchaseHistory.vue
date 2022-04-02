<template>
  <section class="hero">
    <h2>Purchase History</h2>
    <div id="purchase-history-div">
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
              <td>{{ item.unitprice }}</td>
              <td>{{ item.quantity }}</td>
            </tr>
          </tbody>
          <tr>
            <td colspan="3">Total: ${{ order.total }}</td>
          </tr>
        </table>
      </div>
    </div>
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
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.table {
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
</style>
