<template>
  <section class="hero">
    <div class="hero-text container">
      <!-- <h4>Cart Page</h4> -->
      <el-form
        :inline="false"
        :model="formInline"
        class="demo-form-inline"
        :size="formSize"
      >
        <el-form-item>
          <el-select
            v-model="formInline.services"
            multiple
            placeholder="Filter by Service(s)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="5">
            <el-col :span="15">
              <el-input
                v-model="formInline.code"
                placeholder="Postal Code"
                style="width: 100%"
              ></el-input>
            </el-col>
            <el-col :span="2">
              <el-button
                type="warning"
                :icon="search"
                @click="onSubmit"
              ></el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import firebaseApp from '@/firebase.js'
import { getFirestore } from "firebase/firestore"
import { collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

async function searchClinics(services) {
  let clinics = []
  const q = query(collection(db, "Clinics"), where("services", "array-contains-any", services));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
      let y = docs.data()
      clinics.push(y)
        })
    return clinics;
}

async function getCustomerPostalCode(email) {
  let code;
  const q = query(collection(db, "Customers"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
      let y = docs.data()
      code = y.postalcode
        })
    return code;
}

export default {
  name: 'ClinicsForm',
  components: {},
  data() {
    return {
      formSize: ref(""),
      formInline: reactive({input: "",}),
      search: Search,
      options: [
        {
            value: "Accupuncture",
            label: "Accupuncture",
        },
        {
            value: "Tunia",
            label: "Tunia",
        },
        {
            value: "Herbal Medication",
            label: "Herbal Medication",
        },
        {
            value: "Gua Sha",
            label: "Gua Sha",
        },
        {
            value: "Cupping",
            label: "Cupping",
        },
        {
            value: "Device Therapy",
            label: "Device Therapy",
        },
      ],
    }
  },
  methods: {
    onSubmit() {
      console.log(this.formInline.services)
      console.log(this.formInline.code)
      searchClinics(this.formInline.services).then((l) => {console.log(l)})
    }
  },
  created() {
    getCustomerPostalCode("test1@gmail.com").then((x) => {
      this.emitter.emit('customerPostalCode', {'code': x})
    })
  }
}
</script>

<style scoped>
.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
}
</style>