<template>
  <section>
    <img id="qrcode" src="@/assets/qrcode.jpg" alt="" />
    <el-form :model="form" v-on:submit.prevent="purchase">
      <el-form-item id="formitem" type="submit">
        <el-input v-model="code" placeholder="Transaction Code" clearable />
      </el-form-item>
      <el-form-item id="formitem">
        <button>CONFIRM PAYMENT</button>
      </el-form-item>
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
      code: "",
    };
  },
  props: {
    cart: Object,
  },
  methods: {
    purchase() {
      if (this.cart.total == 0) {
        alert("Your cart is empty!");
      } else {
        if (this.code != "") {
          this.$emit("commitpurchase");
          this.code = "";
        } else {
          alert("Please key in your transaction code!");
        }
      }
    },
  },
  components: { PaymentDiag },
};
</script>

<style scoped>
#qrcode {
  width: 110%;
}
#formitem {
  width: 110%;
  margin-top: 10px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
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
