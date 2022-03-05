<template>
  <main>
		<el-row>
				<el-col
					v-for="product in products"
					:key="product"
					:span="4"
				>
					<ProductCard
						:product="product"
						:key="product.id"
					/>
				</el-col>
			</el-row>
	</main>
  
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
	name: "ProductsView",
	components: {
		ProductCard
	},


	props: {
		products: {
			type: Array
		}
	},

  data() {
    return {
				
    };
  }
}
</script>

<style>


</style>