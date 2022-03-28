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
            <button size="large" @click="submitSearch">SEARCH</button>
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

button {
  margin: auto;
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
</style>
