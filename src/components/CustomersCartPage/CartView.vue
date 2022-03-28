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
    var cart = JSON.parse(JSON.stringify(this.cart));
    delete cart.total;
    for (const [key, value] of Object.entries(cart)) {
      var product = value;
      product.number = index;
      product.name = key;
      product.totalprice = "$" + (product.unitprice * product.quantity).toFixed(2)
      product.unitprice = "$" + product.unitprice.toFixed(2)
      this.tableData.push(product)
      index++;
    }
  },

  
}
</script>
