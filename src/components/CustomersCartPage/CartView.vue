<template>
  <section>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="number" label="No." width="80"> </el-table-column>
      <el-table-column prop="name" @click="deleteRow(scope.$index, tableData)" label="Product"> 
      </el-table-column>
      <el-table-column prop="unitprice" label="Unit Price" width="120">
      </el-table-column>
      <el-table-column prop="quantity" label="Quantity" width="120">
      </el-table-column>
      <el-table-column prop="totalprice" label="Total Price" width="120">
      </el-table-column>
      <el-table-column width="120">
        <template v-slot="scope">
          
          <el-button
            @click="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
            id="delete"
          >
            DELETE
          </el-button>

          <el-button
            @click="viewProduct(scope.$index, tableData)"
            type="text"
            size="small"
            id="view"
          >
            VIEW
          </el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <br />
    <div class="total">
      <h2>Total: ${{ total }}</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: "CartView",
  data() {
    return {
      tableData: [],
      total: this.cart.total,
    };
  },
  watch: {
    cart: function (newval, oldval) {
      console.log("before", oldval);
      console.log("after", newval);
      this.tableData = [];
      this.total = 0;
    },
  },
  props: {
    cart: Object,
  },
  methods: {
    async deleteRow(index, tableData) {
      var dprod = tableData[index].name;
      this.$emit("delprod", dprod);
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
  created() {
    var index = 1;
    var products = JSON.parse(JSON.stringify(this.cart.products));
    for (const [key, value] of Object.entries(products)) {
      var product = value;
      product.id = key;
      product.number = index;
      product.name = value.name;
      product.totalprice = "$" + (product.unitprice * product.quantity).toFixed();
      product.unitprice = "$" + product.unitprice.toFixed(2);
      this.tableData.push(product);
      index++;
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");

.total {
  display: inline-block;
  vertical-align: middle;
  float: right;
  margin-right: 8vh;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
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

#delete {
  background-color: #ffcc00;
}

#view {
  background-color: #ADFF2F;
}
</style>
