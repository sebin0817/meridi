<template>
  <div class="form">
    <el-form :model="form" @submit.prevent="login">
      <el-form-item>
        <el-input id="name" v-model="name" type="name" placeholder="Name"
          ><template #prefix>
            <el-icon class="el-input__icon"><message /></el-icon> </template
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          id="phone"
          v-model="phone"
          type="phone"
          placeholder="Contact Number"
          ><template #prefix>
            <el-icon class="el-input__icon"><phone /></el-icon> </template
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          id="date"
          v-model="date"
          type="date"
          placeholder="Select Date"
          ><template #prefix>
            <el-icon class="el-input__icon"><message /></el-icon> </template
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-time-select
          v-model="value"
          start="08:30"
          step="00:15"
          end="18:30"
          placeholder="Select time"
          format="hh:mm A"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          id="textarea"
          :rows="2"
          type="textarea"
          placeholder="Description of pain / discomfort"
          v-model="desc"
        />
      </el-form-item>
      <el-form-item>
        <button type="submit">LOGIN</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message, Phone } from "@element-plus/icons-vue";

export default {
  name: "LoginForm",
  components: { Message, Phone },
  data() {
    return {
      id: "Undefined User",
      name: "",
      date: "",
      value: "",
      phone: "",
      desc: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
};
</script>

<style>
.form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 36px;
  text-align: center;
  width: 30%;
}
button {
  margin: auto;
  margin-top: 10px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  width: 30%;
}
button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}
h4 {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
h4:hover {
  cursor: pointer;
}
</style>
