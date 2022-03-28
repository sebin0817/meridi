<template>
  <section>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="number"
        label="No.">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Product"
        width="180">
      </el-table-column>
      <el-table-column
        prop="unitprice"
        label="Unit Price">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="Quantity">
      </el-table-column>
      <el-table-column
        prop="totalprice"
        label="Total Price">
      </el-table-column>
      <el-table-column>
      <template v-slot="scope">
        <el-button
          @click="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          DELETE
        </el-button>
      </template>
      </el-table-column>
    </el-table>
    <h2>Total: ${{ total }}</h2>
  </section>
</template>

<script>
export default {
  name: 'CartView',
  data() {
    return {
        tableData:[],
        total: this.cart.total
    }
  },
  watch: {
    cart: function(newval,oldval) {
      console.log("before", oldval)
      console.log("after", newval)
      this.tableData = []
      this.total = 0
    }
  },
  props: {
    cart: Object
  },
  methods: {
    async deleteRow(index, tableData) {
      var dprod = tableData[index].name
      this.$emit('delprod',dprod)
      }
  },
  created() {
    var index = 1;
    var products = JSON.parse(JSON.stringify(this.cart.products));
    for (const [key, value] of Object.entries(products)) {
      var product = value;
      product.number = index;
      product.name = key;
      product.totalprice ="$" + (product.unitprice * product.quantity).toFixed()
      product.unitprice = "$" + product.unitprice.toFixed(2)
      this.tableData.push(product)
      index++;
    }
  },

  
}
</script>
