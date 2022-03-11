<template>
	<div class="container categories">
        <h3>Categories</h3>

		<el-card >
            <div v-for="cat in productCats" :key="cat.name">
                <el-checkbox type="checkbox" :label="cat.name" v-model="checkedCats" v-bind:value="categories"></el-checkbox>
            </div>
		</el-card>       
	</div>

    <div class="container price">
        <h3>Sort by Price</h3>

        <el-card >
            <el-row><el-checkbox type="checkbox" :label="ascending" v-model="isAscend">ascending</el-checkbox></el-row>
            <el-row><el-checkbox type="checkbox" :label="descending" v-model="isDescend">descending</el-checkbox></el-row>
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

.container {
	line-height: 5;
	margin-bottom: 30px;
    display: block;
}



</style>