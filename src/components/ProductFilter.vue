<template>
	<div class="container">
        <h3>Categories</h3>

		<el-card >
            <el-row v-for="cat in productCats" :key="cat.name">
                <el-checkbox :label="cat.name" v-model="checkedCats" v-bind:value="categories"></el-checkbox>
            </el-row>
		</el-card>       
	</div>

    <div class="container price">
        <h3>Sort by Price</h3>

        <el-card >
            <el-row><el-checkbox class="text" :label="Ascending" v-model="isAscend">Ascending</el-checkbox></el-row>
            <el-row><el-checkbox :label="Descending" v-model="isDescend">Descending</el-checkbox></el-row>
        </el-card>       
    </div>
	
</template>

<script>
export default {
    data() {
        return {
            cats: [],
            productCats: 
                [{name:'All Products'},
                {name: 'For Pain'},
                {name: 'For Treatments'},
                {name: 'For Wellness'},
                {name: 'For Kids'}],
            checkedCats: [],
            isAscend: false,
            isDescend: false
        }
    },

    computed: {
        filteredCats() {     
            if (!this.checkedCats.length) {
                return this.cats;
            }     
            return this.cats.filter(cat =>  this.checkedCats.includes(cat));
        }
    }
}
</script>

<style scoped>

h3 {
    font-weight: bold;
	font-size: 16px;
}

el-card {
	padding: 0px;
}

.text {
	font-family: "Georgia", Times, serif;
	line-height: 1.6;
}



</style>