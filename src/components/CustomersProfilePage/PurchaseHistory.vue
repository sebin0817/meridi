<template>
  <section class="hero">
      <h2>Purchase History</h2>
    <div id="purchase-history-div">
        <div class="order" v-for="(order,index) in purchasehistory" :key="order">
            <h3>{{ index }}</h3>
            <div class="item" v-for="item in order.items" :key="item">
                <h3>{{ item[0] }}</h3>
                <h3>{{ item[1] }}</h3>
                <h3>{{ item[2] }}</h3>
            </div>
            <h3>Total: ${{ order.total }}</h3>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'PurchaseHistory',
    data() {
      return {
        purchasehistory: {}
      }
    },
    props: {
        user: Object
    },
    created() {
      this.purchasehistory = this.user.purchasehistory
    }
}
</script>
<style scoped>
#purchase-history-div {
}
.order {
  border-width: 3px;
  border-style: solid;
  margin-bottom: 30px;
  border-color: #e6e6e6;
  padding: 10px;
}
.item {
}
</style>