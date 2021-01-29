<template>
  <div>
    <hero />
    <div class="px-4 mt-4">
      <base-search />
    </div>
    <upcoming-events />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'home',
})
export default class IndexPage extends Vue {}
</script>
