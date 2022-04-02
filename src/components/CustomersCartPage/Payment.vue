<template>
  <section>
    <img id="qrcode" src="@/assets/qrcode.jpg" alt="" />
    <button @click="purchase()">CONFIRM PAYMENT</button>
    <div class="center">
      <PaymentDiag />
    </div>
  </section>
</template>

<script>
import PaymentDiag from "@/components/CustomersCartPage/PaymentDialogue.vue";

export default {
  name: "Payment",
  props: {
    cart: Object,
  },
  methods: {
    purchase() {
      this.$emit("commitpurchase");
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
