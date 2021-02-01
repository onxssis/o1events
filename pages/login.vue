<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 wrapper">
    <auth-screen screen="login" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'auth',
  middleware: 'guest',
})
</script>
