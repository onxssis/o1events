<template>
  <auth-screen :redirect-to="redirectPath"></auth-screen>
</template>

<script>
export default {
  props: {
    redirectPath: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.auth-screen {
  max-width: none;
  width: auto;
}

.vm--modal {
  border-radius: 0.5rem;
  width: auto;
  height: unset !important;
}
</style>
