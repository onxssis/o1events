<template>
  <div class="flex flex-col items-center justify-center bg-gray-50 wrapper">
    <div
      class="flex flex-col bg-white w-86 md:w-full mx-4 md:mx-0 md:shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md max-w-md"
    >
      <auth-screen screen="login" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'auth',
  middleware: 'guest',
})
</script>
