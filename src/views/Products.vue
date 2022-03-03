<template>
  <section class="hero">
    <div class="hero-text container">
      <h4>Products Page</h4>
      <SearchForm/>
    </div>
  </section>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'App',
  components: {
    SearchForm
  }
};
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
