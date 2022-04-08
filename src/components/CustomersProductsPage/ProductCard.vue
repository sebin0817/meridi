<template>
  <div class="container">
    <el-card shadow="hover">
      <div class="image">
        <img :src="`${product.imgURL}`" alt="product img" />
      </div>

      <div class="cardContent">
        <div class="header">
          <span class="text block" id="title">{{ product.name }}</span>
          <p class="text block" id="description">{{ categories }}</p>
        </div>
        <div class="mid">
          <p class="text block" id="price">{{ price }}</p>
          <router-link
            :to="{ name: 'IndividualProduct', params: { id: product.id } }"
          >
            <button @click="sendData">View</button>
          </router-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
    },
  },

    methods: {
    sendData() {
      this.$router.push({
        name: "IndividualProduct",
        params: {
          id: this.product.id,
        },
      });
    },
  },

  computed: {
    price() {
      return "$" + this.product.price;
    },

    categories() {
      let res = "";
      let ind = 0;

      for (const cat of this.product.categories) {
        if (ind === this.product.categories.length - 1) {
          res += cat.replace("For", " ");
        } else {
          res += cat.replace("For", " ") + ",";
        }
        ind++;
      }
      return res;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
* {
  font-family: "Nunito Sans", sans-serif;
}
.el-card {
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

.image {
  margin-right: auto;
  margin-left: auto;
}

.image img {
  width: 100%;
  height: 100%;
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
  height: 200px;
}

.image {
  width: 150px;
  height: 150px;
  text-align: center;
}

.text {
  font-family: "Georgia", Times, serif;
  line-height: 1.6;
}

.block {
  display: block;
}

.header {
  height: 60px;
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
