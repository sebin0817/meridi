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
        <el-select v-model="sortBy" placeholder="Select" size="large" @change="handleSortChange">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
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
            options:
                [{value: 1, label: 'Descending'},
                 {value: 2, label: 'Ascending'}],
            sortBy: ""
        }
    },

    emits:["categoryFilter", "sortBy"],

    methods: {
        preprocessCats(cats) {
            let processedCats = cats.map(cat => {
                if (cat === "For Pain") {
                    return 'pain';
                }
                if (cat === 'For Treatments') {
                    return 'treatments';
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
            this.$emit("categoryFilter", this.preprocessCats(this.checkedCats));
        },

        handleCheckedCatsChange(arr) {
            let checkedCount = arr.length;
            this.checkAll = (checkedCount == this.productCats.length);
            this.isIndeterminate = (checkedCount > 0) && (checkedCount < this.productCats.length);
            this.$emit("categoryFilter", this.preprocessCats(this.checkedCats));
        },

        handleSortChange(val) {
            this.sortBy = val;
            console.log(`sortby = ${this.sortBy}`)
            this.$emit("sortBy", this.sortBy);
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