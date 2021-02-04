<template>
  <div class="relative">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'auth',
})
</script>

<style>
.wrapper {
  min-height: calc(100vh - 64px);
}
</style>
