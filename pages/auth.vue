<template>
  <div>AUTH</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
  middleware: ['auth'],
})
export default class IndexPage extends Vue {}
</script>
