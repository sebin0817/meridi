<template>
    <div class="container">
        <h3>Categories</h3>

		<el-card >
            <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                > All Products
            </el-checkbox>
            <el-checkbox-group
                v-model="checkedCats"
                @change="handleCheckedCatsChange"
            >
                <el-row><el-checkbox v-for="cat in productCats" :key="cat" :label="cat.name" ></el-checkbox></el-row>
            </el-checkbox-group>
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
            checkAll: false,
            isIndeterminate: true,
            cats: [],
            productCats: 
                [{name: 'For Pain'},
                {name: 'For Treatments'},
                {name: 'For Wellness'},
                {name: 'For Kids'}],
            checkedCats: [],
            isAscend: false,
            isDescend: false
        }
    },

    emits:["categoryFilter"],

    methods: {
        preprocessCats(cats) {
            let processedCats = cats.map(cat => {
                if (cat === "For Pain") {
                    return 'pain';
                }
                if (cat === 'For Treatments') {
                    return 'treatment';
                }
                if (cat === 'For Wellness') {
                    return 'wellness';
                }
                if (cat === 'For Kids') {
                    return 'kids';
                }
            });
            return processedCats;
        },

        handleCheckAllChange(val) {
            this.checkedCats = val ? this.productCats.map(function(item){ return item.name; }) : [];
            console.log(this.productCats)
            console.log(`checked cats = ${this.checkedCats}`)
            this.isIndeterminate = false;
            // console.log(`from child value checked cats is ${this.checkedCats}`)
            this.$emit("categoryFilter", this.preprocessCats(this.checkedCats));
        },

        handleCheckedCatsChange(arr) {
            let checkedCount = arr.length;
            this.checkAll = (checkedCount == this.productCats.length);
            this.isIndeterminate = (checkedCount > 0) && (checkedCount < this.productCats.length);
            this.$emit("categoryFilter", this.preprocessCats(this.checkedCats));
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