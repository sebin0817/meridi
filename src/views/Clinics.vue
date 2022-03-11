<template>
  <section class="hero">
    <div class="hero-text container">
      <!-- <h4>Cart Page</h4> -->
      <el-form
        :inline="false"
        :model="formInline"
        class="demo-form-inline"
        :size="formSize"
      >
        <el-form-item>
          <el-select
            v-model="formInline.region"
            multiple
            placeholder="Filter by Service(s)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="5">
            <el-col :span="15">
              <el-input
                v-model="formInline.user"
                placeholder="Postal Code"
                style="width: 100%"
              ></el-input>
            </el-col>
            <el-col :span="2">
              <el-button
                type="warning"
                :icon="Search"
                @click="onSubmit"
              ></el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const formSize = ref("");
const formInline = reactive({
  input: "",
});
const options = [
  { value: "Accupuncture" },
  { value: "Tunia" },
  { value: "Herbal Medication" },
  { value: "Gua Sha" },
  { value: "Cupping" },
  { value: "Device Therapy" },
];
const onSubmit = () => {
  console.log("submitted!");
};
</script>

<style scoped>
.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}
</style>
