<template>
  <div class="flex flex-col items-center justify-center bg-gray-50 wrapper">
    <auth-screen screen="register" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'auth',
})
</script>
