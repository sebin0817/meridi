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
        </el-form-item>
        <el-form-item>
          <el-row :gutter="5">
            <el-col :span="15">
              <el-input
                v-model="formInline.code"
                placeholder="Search by nearby Postal Code"
                style="width: 100%"
              ></el-input>
            </el-col>
            <el-col :span="15">
              <el-input
                v-model="formInline.name"
                placeholder="Search by name"
                style="width: 100%"
              ></el-input>
            </el-col>
            <el-col :span="2">
              <el-button
                type="warning"
                :icon="search"
                @click="onSubmit"
              ></el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

export default {
  name: 'ClinicsForm',
  components: {},
  data() {
    return {
      formSize: ref(""),
      formInline: reactive({input: "", }),
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
    }
  },

  emits:["categoryFilter", "postal", "clinicName"],


  methods: {
    onSubmit() {
      this.$emit("categoryFilter", this.formInline.services);
      this.$emit("postal", this.formInline.code)
      this.$emit("clinicName", this.formInline.name)
    }
  },
  created() {
  }
}
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