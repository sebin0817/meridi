<template>
  <section class="hero">
    <div id="profile-div">
        <h3 class="profile-info">{{ name }}</h3>
        <h3 class="profile-info">{{ email }}</h3>
        <h3 class="profile-info"> {{ postalcode }}</h3>
        <button class="button" @click="goToEdit()">EDIT PROFILE</button>
    </div>
  </section>
</template>

<script>
export default {
    name: 'CustInfo',
    data() {
      return {
        name: '',
        email: '',
        postalcode: ''
      }
    },
    props: {
        user: Object
    },
    methods: {
      goToEdit() {
        this.$router.push('./EditCustomerParticulars')
      }
    },
    created() {
      this.name = this.user.name;
      this.email = this.user.email;
      this.postalcode = this.user.postalcode
    }
}
</script>
<style scoped>
#profile-div {

}
.profile-info {
  margin-top: 15px;
  margin-bottom: 15px;
}

.button {
  padding: 15px 15px 15px 15px;
  background-color: #fec900;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
}

</style>
