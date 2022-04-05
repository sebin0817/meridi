<template>
  <section class="hero">
    <el-container id="container">
      <el-header id="revenueheader">Monthly Revenue</el-header>
      <el-main>
        <el-scrollbar>
          <el-table :data="produce()">
            <el-table-column prop="period" label="Period" width="400px" />
            <el-table-column prop="revenue" label="Revenue" width="400px" />
          </el-table>
        </el-scrollbar>
      </el-main>
      <br />
      <el-header class="chartheader">Revenue Visualization</el-header>
      <line-chart class="user" width="750px" :data="chartdata()"> </line-chart>
    </el-container>
  </section>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "@/firebase.js";
import { doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "MonthlyRevenue",
  data() {
    return {
      email: "",
      orderhistory: {},
      prodsarr: [],
    };
  },
  props: {
    useremail: String,
  },
  async created() {
    this.email = this.useremail;
    console.log(this.email);
    const docRef = doc(db, "Clinics", this.useremail);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const data = docSnap.data();
      this.orderhistory = data.orderhistory;
    }
    if (this.orderhistory != null) {
      const revenueMap = new Map();
      for (const order of Object.values(this.orderhistory)) {
        var month = order.dop.substring(0, 7);
        if (!revenueMap.has(month)) {
          revenueMap.set(month, 0);
        }
        for (const product of Object.values(order.products)) {
          var total = revenueMap.get(month) + product.totalprice;
          revenueMap.set(month, total);
        }
      }
      //sort the period
      var keyarr = Array.from(revenueMap.keys());
      keyarr.sort();
      //push to prodsarr
      for (const period of keyarr) {
        var revenue = new Object();
        revenue.period = period;
        revenue.revenue = revenueMap.get(period);
        this.prodsarr.push(revenue);
      }
    }
  },
  methods: {
    produce() {
      return this.prodsarr;
    },
    chartdata() {
      var data = [];
      var date = [];
      if (this.prodsarr.length == 0) {
        return data;
      }
      for (const revenue of this.prodsarr.reverse()) {
        if (data.length < 6) {
          var set = [this.formatDate(revenue.period), revenue.revenue];
          data.unshift(set);
          date.unshift(revenue.period);
        }
      }
      while (data.length < 6) {
        var d = new Date(date[0]);
        d.setMonth(d.getMonth() - 1);
        var prev = this.formatDate(d);
        data.unshift([prev, 0]);
        date.unshift([d, 0]);
      }
      return data;
    },
    formatDate(d) {
      var date = new Date(d);
      var month = "" + (date.getMonth() + 1);
      var year = "" + date.getFullYear();
      if (month.length < 2) {
        month = "0" + month;
      }
      console.log(year, month);
      return [year, month].join("--");
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
.el-header {
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  height: 30px;
}
#container {
  width: 80%;
  font-family: "Nunito Sans", sans-serif;
}
h4 {
  text-align: right;
}
.order {
  margin-bottom: 10px;
}
.hero {
  margin-top: 50px;
}
</style>
