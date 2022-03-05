<template>
	<div class="searchForm">
		<el-form :model="form">
			<el-row>
				<el-col :offset="11" :span="10">
					<el-form-item>
						<el-input v-model="form.name" :inline="true" placeholder="Product Name"></el-input>
					</el-form-item>
				</el-col>	
				<el-col :offset="1" :span="2">
					<el-form-item>
						<el-button id="searchBtn">Search</el-button>	
					</el-form-item>
				</el-col>
			</el-row>
			
			
		</el-form>		
	</div>
  
</template>

<script>

export default {
  data() {
    return {
      form: {
          name: ""
      }
    };
  },

  methods: {
      onSubmit() {
          alert(`Submit ${this.form.name}`);
      }
  }
};

</script>

<style lang="scss" scoped>
	.el-row {
		margin-bottom: 20px;
	}

	// cannot make text inside button bold
	#searchBtn {
		background-color: #ffcc00;
		color: black;
		font-size: 13px;
		text-transform: uppercase;
	}


</style>

