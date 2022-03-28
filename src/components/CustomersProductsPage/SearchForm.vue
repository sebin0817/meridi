<template>
  <div class="searchForm">
    <el-form :model="form" v-on:submit.prevent="submitSearch">
      <el-row>
        <el-col :offset="11" :span="10">
          <el-form-item type="submit" size="large">
            <el-input
              v-model="form.searchVal"
              placeholder="Product Name"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="2">
          <el-form-item>
            <el-button id="searchBtn" size="large" @click="submitSearch"
              >Search</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// import { reactive } from 'vue'

export default {
  data() {
    return {
      form: {
        searchVal: "",
      },
    };
  },

  emits: ["search"],

  methods: {
    submitSearch() {
      // console.log(`inside searchform, value is ${this.form.searchVal}`)
      this.$emit("search", this.form.searchVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
// cannot make text inside button bold
#searchBtn {
  background-color: #ffcc00;
  color: black;
  font-size: 13px;
  text-transform: uppercase;
}
</style>
