<template>
  <portal to="modal">
    <modal name="auth" class="auth-modal" height="auto">
      <auth-screen></auth-screen>
    </modal>
  </portal>
</template>

<script>
// export default {
//   data() {
//     return {
//       oldRedirects: {},
//     }
//   },
//   mounted() {
//     this.oldRedirects = {
//       home: this.$auth.options.redirect.home,
//     }

//     this.$auth.options.redirect.home = false
//   },

//   beforeDestroy() {
//     Object.assign(this.$auth.options.redirect, this.oldRedirects)
//   },
// }
</script>

<style>
.auth-modal .auth-screen {
  max-width: none;
  width: auto;
}

.auth-modal .vm--modal {
  border-radius: 0.5rem;
  width: auto;
}
</style>
