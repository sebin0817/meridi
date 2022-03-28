<template>
  <el-container id="container">
    <el-header id="historyheader">Order History</el-header>
    <el-main>
      <el-scrollbar>
        <el-table :data="tableData">
          <el-table-column prop="no" label="No." width="80px" />
          <el-table-column prop="product" label="Product" width="550px" />
          <el-table-column prop="price" label="Price" />
        </el-table>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
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
#container {
  width: 80%;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  font-family: "Nunito Sans", sans-serif;
}
</style>
