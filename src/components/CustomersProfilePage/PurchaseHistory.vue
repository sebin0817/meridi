<template>
  <section class="hero">
    <el-container id="container">
      <el-header id="historyheader">Purchase History</el-header>
      <el-row v-if="len == 0">
        <el-icon class="el-input__icon"><ShoppingCart /></el-icon>
      </el-row>
      <el-row v-if="len == 0">
        <h1 id="empty">You do not have any past orders</h1>
      </el-row>
      <el-main>
        <el-scrollbar>
          <div class="order" v-for="order in purchasehistory" :key="order">
            <h4 id="orderdate">Ordered on {{ order.dop }}</h4>
            <el-table :data="obtoarr(order)">
              <el-table-column prop="no" label="No." width="80px" />
              <el-table-column prop="name" label="Product" width="320px" />
              <el-table-column prop="unitprice" label="Unit Price" />
              <el-table-column prop="quantity" label="Quantity" />
              <el-table-column width="80">
              <template v-slot="scope">
                
                <el-button
                  @click="viewProduct(scope.$index, obtoarr(order))"
                  type="text"
                  size="small"
                >
                  VIEW
                </el-button>
              </template>
              </el-table-column>
            </el-table>
            <h4 id="total">Total: ${{ order.total }}</h4>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </section>
</template>

<script>
import { ShoppingCart } from "@element-plus/icons-vue";
export default {
  name: "PurchaseHistory",
  data() {
    return {
      purchasehistory: {},
    };
  },
  components: {
    ShoppingCart,
  },
  props: {
    user: Object,
  },
  computed: {
    len() {
      var count = Object.keys(this.purchasehistory);
      // for (const key of Object.keys(this.purchasehistory)) {
      //   console.log(key);
      //   count += 1;
      // }
      return count;
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
        product.id = key;
        product.name = value.name;
        product.no = index;
        prodsarr.push(product);
        index++;
      }
      return prodsarr;
    },

    viewProduct(index, tableData) {
      this.$router.push({
        name: "IndividualProduct",
        params: {
          id: tableData[index].id,
        },
      });
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
* {
  font-family: "Nunito Sans", sans-serif;
}
button {
  margin-left: auto;
  margin-bottom: 10px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}

button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}

#historyheader {
  font-size: 20px;
  height: 30px;
  margin-top: 40px;
}
#container {
  width: 90%;
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
