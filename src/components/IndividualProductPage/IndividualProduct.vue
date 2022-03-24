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
            product: {
                name: 'Beauty Enhance',
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, perferendis? In, porro est. Eum asperiores iste eos maxime saepe consequuntur, quas tempora eaque culpa excepturi perferendis recusandae. Tempore, rem corporis.", 
                price: 75,
                clinic: 'Eu Yan Sang Singapore' 
            }
        }
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