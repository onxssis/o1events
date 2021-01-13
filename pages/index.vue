<template>
  <div>
    <hero />
    <base-search />
    <upcoming-events />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
})
export default class IndexPage extends Vue {}
</script>
