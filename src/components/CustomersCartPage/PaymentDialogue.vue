<template>
  <el-button class="dialogue" type="text" @click="dialogVisible = true"
    >How to retrieve transaction ref. no</el-button
  >

  <el-dialog
    v-model="dialogVisible"
    title="Retrieving Transaction Ref. No"
    width="35%"
    :before-close="handleClose"
  >
    <img id="inst" src="@/assets/payment0.png" alt="" />
    <img id="inst" src="@/assets/payment1.png" alt="" />
    <img id="inst" src="@/assets/payment2.png" alt="" />
    <img id="inst" src="@/assets/payment3.png" alt="" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "PaymentDialogue",
  data() {
    return {
      dialogVisible: false,
    };
  },
};
</script>

<style scoped>
#inst {
  width: 55%;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.dialogue {
  font-family: "Nunito Sans", sans-serif;
  padding-top: 1px;
  font-size: 12px;
  padding-left: 1.2rem;
}
</style>
