<template>
  <section>
    <img id="qrcode" src="@/assets/qrcode.jpg" alt="" />
    <el-form :model="form" v-on:submit.prevent="purchase">
      <el-row>
        <el-col :offset="11" :span="10">
          <el-form-item type="submit" size="large">
            <el-input
              v-model="code"
              placeholder="Transaction Code"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="2">
          <el-form-item>
            <button size="large">CONFIRM PAYMENT</button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="center">
      <PaymentDiag />
    </div>
  </section>
</template>

<script>
import PaymentDiag from "@/components/CustomersCartPage/PaymentDialogue.vue";

export default {
  name: "Payment",
  data() {
    return {
      code: '',
    }
  },
  props: {
    cart: Object,
  },
  methods: {
    purchase() {
      if (this.cart.total == 0) {
        alert("Your cart is empty!")
      } else {
        if (this.code != "") {
        this.$emit("commitpurchase");
        this.code = "";
        } else {
          alert("Please key in your transaction code!")
        }
      }
      
      
    },
  },
  components: { PaymentDiag },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
#qrcode {
  width: 110%;
}
button {
  margin-left: auto;
  margin-top: 5px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
  width: 110%;
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
