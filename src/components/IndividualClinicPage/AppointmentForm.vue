<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-aside width="600px">Aside</el-aside> -->
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main
          ><div class="form">
            <el-form :model="form" @submit.prevent="book">
              <el-form-item>
                <el-input
                  id="name"
                  v-model="name"
                  type="name"
                  placeholder="Name"
                  required="true"
                  ><template #prefix>
                    <el-icon class="el-input__icon"
                      ><avatar
                    /></el-icon> </template
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  id="phone"
                  v-model="phone"
                  type="phone"
                  placeholder="Contact Number"
                  required="true"
                  ><template #prefix>
                    <el-icon class="el-input__icon"
                      ><phone
                    /></el-icon> </template
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-col :span="11">
                  <el-date-picker
                    id="date"
                    v-model="date"
                    type="date"
                    placeholder="Select Date"
                    required="true"
                    ><template #prefix>
                      <el-icon class="el-input__icon"
                        ><message
                      /></el-icon> </template></el-date-picker
                ></el-col>
                <el-col :span="2" class="text-center">
                  <span class="text-gray-500"> -</span>
                </el-col>
                <el-col :span="11">
                  <el-time-select
                    v-model="value"
                    start="08:30"
                    step="00:15"
                    end="18:30"
                    placeholder="Select time"
                    format="hh:mm A"
                    required="true"
                  />
                </el-col>
              </el-form-item>
              <!-- <el-form-item>
                <el-time-select
                  v-model="value"
                  start="08:30"
                  step="00:15"
                  end="18:30"
                  placeholder="Select time"
                  format="hh:mm A"
                />
              </el-form-item> -->
              <el-form-item>
                <el-input
                  id="textarea"
                  :rows="2"
                  type="textarea"
                  placeholder="Description of pain / discomfort"
                  v-model="desc"
                  required="true"
                />
              </el-form-item>
              <el-form-item>
                <button type="submit">Book Now</button>
              </el-form-item>
            </el-form>
          </div></el-main
        >
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Avatar, Phone } from "@element-plus/icons-vue";

export default {
  name: "AppointmentForm",
  components: { Avatar, Phone },
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
  methods: {
    book() {
      alert("Thank you for booking. A confirmation email will be sent to you soon.")
      this.$router.push("../");
    }
  }
};
</script>

<style scoped>
.form,
#common-layout {
  margin-top: 11px;
  text-align: center;
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
h4 {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
h4:hover {
  cursor: pointer;
}
</style>
