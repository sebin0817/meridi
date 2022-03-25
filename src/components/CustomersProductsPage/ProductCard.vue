<template>
	<div class="container">
		<el-card shadow="hover">
			<img
				src="@/assets/TCM.jpg"
				alt="product img"
				class="image"
			/>
			<div class="cardContent">

				<span class="text block" id="title">{{product.name}}</span>
				<p class="text block" id="description">{{categories}}</p>
				<p class="text block" id="price">{{price}}</p>
				<router-link :to="{name:'IndividualProduct', params: {id:product.id}}">
					<button>View</button>
				</router-link>
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
	},

	computed: {
		price() {
			return ("$" + this.product.price);
		},

		categories() {
			let res = "";
			let ind = 0;

			for (const cat of this.product.categories) {
				if (ind === this.product.categories.length - 1) {
					res += cat.replace('For', " ");
				} else {
					res += cat.replace('For', " ") + ",";
				}
				ind++;
			}
			return res;
		}
	}
}
</script>

<style>
el-card {
	padding: 0px;
}

button {
  margin: 10px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 10px 15px 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}

button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}

button:focus {
  outline: none;
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