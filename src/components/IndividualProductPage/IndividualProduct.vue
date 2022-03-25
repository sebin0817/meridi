<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h2>{{product.name}}</h2>
        <h4>{{clinic}}</h4>
      </el-header>
      <el-container>
        <el-aside width="600px">
            <img src="@/assets/TCM.jpg" alt="product">
        </el-aside>
        <el-main>
            <p>{{price}}</p>
            <p>{{product.description}}</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            product: {}
        }
    },

    props: ["baseURL", "products"],

    mounted() {
      this.id = this.$route.params.id;
    },

    computed: {
        clinic() {
            return ("@" + this.product.clinic);
        },
        price() {
            return ("$" + this.product.price); 
        }
    }
}
</script>

<style>

</style>