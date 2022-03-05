<template>
	<div class="container">
		<el-card shadow="hover">
			<img
				src="@/assets/TCM.jpg"
				class="image"
			/>
			<div class="cardContent">
				<span class="text block" id="title">{{product.name}}</span>
				<p class="text block" id="description">{{product.description}}</p>
				<p class="text block" id="price">{{product.price}}</p>
			</div>
		</el-card>
	</div>
	
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		product: {
			type: Object
		}
	}
}
</script>

<style>
el-card {
	padding: 0px;
}

.container {
	line-height: 5;
	margin-bottom: 30px;
}

.cardContent {
	padding: 14px;
	text-align: center;
}

.image {
  width: 100%;
  display: block;
}

.text {
	font-family: "Georgia", Times, serif;
	line-height: 1.6;
}

.block {
	display: block;
}

#title {
	font-weight: bold;
	font-size: 14px;
}

#description {
	width: 100%;
	font-size: 13px;
}

#price {
	font-size: 16px;
}

</style>