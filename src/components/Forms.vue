<template>
  <el-form ref="formRef" :model="form">
    <el-form-item label="Input" prop="input">
      <el-input v-model="form.input" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  input: "",
});
</script>
