<template>
    <CustomerNav v-if="userType=='Customers'"/>
    <ClinicNav v-if="userType=='Clinics'"/>
</template>

<script>
import CustomerNav from './CustomerNav.vue';
import ClinicNav from './ClinicNav.vue';
export default {
  name: 'DisplayNav',
  components: {
    CustomerNav,
    ClinicNav
  },
  data() {
    return {
      userType: sessionStorage.getItem("usertype"),
    }
  },
  created() {
    this.emitter.on('loginas', (evt) => {
      this.userType = evt.userType;
    })
  },
}
</script>
