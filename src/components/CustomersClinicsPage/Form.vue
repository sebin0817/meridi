<template>
  <el-container class="container">
    <div class="form">
      <el-form
        :inline="false"
        :model="formInline"
        class="demo-form-inline"
        :size="formSize"
      >
        <el-select
          v-model="formInline.services"
          multiple
          placeholder="Filter by Service(s)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="formInline.code"
          placeholder="Search by nearby Postal Code"
          style="width: 100%"
        ></el-input>
        <el-row :gutter="5">
          <el-col :span="19">
            <el-input
              v-model="formInline.name"
              placeholder="Search by name"
              style="width: 100%"
            ></el-input
          ></el-col>
          <el-col :span="2">
            <el-button
              type="warning"
              :icon="search"
              @click="onSubmit"
            ></el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>

<script>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

export default {
  name: "ClinicsForm",
  components: {},
  data() {
    return {
      formSize: ref(""),
      formInline: reactive({ input: "" }),
      search: Search,
      options: [
        {
          value: "Accupuncture",
          label: "Accupuncture",
        },
        {
          value: "Tunia",
          label: "Tunia",
        },
        {
          value: "Herbal Medication",
          label: "Herbal Medication",
        },
        {
          value: "Gua Sha",
          label: "Gua Sha",
        },
        {
          value: "Cupping",
          label: "Cupping",
        },
        {
          value: "Device Therapy",
          label: "Device Therapy",
        },
      ],
    };
  },

  emits: ["categoryFilter", "postal", "clinicName"],

  methods: {
    onSubmit() {
      this.$emit("categoryFilter", this.formInline.services);

      this.$emit("postal", this.formInline.code);
      this.$emit("clinicName", this.formInline.name);
      // console.log(`inside submit clinic, ${this.formInline}`);
      // console.log('hehe submit again here')
    },
  },
  created() {},
};
</script>

<style scoped>
.container {
  width: 70%;
}
.form {
  text-align: center;
}
.el-input {
  margin-bottom: 10px;
  justify-content: center;
}
.el-select {
  width: 100%;
  margin-bottom: 10px;
}
.name {
  width: 10%;
}
</style>
