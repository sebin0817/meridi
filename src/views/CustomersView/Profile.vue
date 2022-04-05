<template>
  <section class="hero">
    <el-container class="hero-text">
      <section class="profile">
        <CustInfo id="info" v-if="mounted" :user="user" />
        <PurchaseHistory id="ph" v-if="mounted" :user="user" />
      </section>
    </el-container>
  </section>
</template>

<script>
import CustInfo from "../../components/CustomersProfilePage/CustInfo.vue";
import PurchaseHistory from "../../components/CustomersProfilePage/PurchaseHistory.vue";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";

const db = getFirestore(firebaseApp);
export default {
  name: "Profile",
  components: {
    CustInfo,
    PurchaseHistory,
  },
  data() {
    return {
      user: null,
      mounted: false,
    };
  },
  async created() {
    const email = sessionStorage.getItem("useremail");
    const docRef = doc(db, "Customers", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      this.user = docSnap.data();
      this.mounted = true;
    }
  },
};
</script>

<style scoped>
.hero {
  background-attachment: fixed;
  position: relative;
}
.hero-text {
  justify-content: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: black;
}
.profile {
  display: flex;
  height: 100%;
  padding-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
#info {
  width: 40%;
}
#ph {
  width: 90%;
}
</style>
