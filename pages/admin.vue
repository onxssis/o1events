<template>
  <div>ADMIN PAGE</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
  middleware: ['auth', 'admin'],
})
export default class IndexPage extends Vue {}
</script>
