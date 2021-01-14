<template>
  <div class="relative">
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'auth',
})
</script>

<style scoped>
.wrapper {
  min-height: calc(100vh - 64px);
}
</style>
