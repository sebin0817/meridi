<template>
  <section>
    <button @click="purchase()">BUY</button>
  </section>
</template>

<script>
export default {
  name: "Payment",
  props: {
    cart: Object
  },
  methods: {
    purchase() {
      this.$emit('commitpurchase')
    }
  }
}
</script>
