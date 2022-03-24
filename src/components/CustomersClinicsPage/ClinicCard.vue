<template>
	<div class="container">
		<el-card shadow="hover">
			<div class="cardContent">
				<span class="text block" id="title">{{clinic.name}}</span>
				<p class="text block" id="description">{{clinic.description}}</p>
				<p class="text block" id="postalcode">{{postalcode}}</p>
			</div>
		</el-card>
	</div>
	
</template>

<script>
export default {
	name: "ClinicCard",
	props: {
		clinic: {
			type: Object
		}
	},
	computed: {
		price() {
			return ("$" + this.clinic.price);
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
	margin-top: 20px;
	font-weight: 500;
}
</style>