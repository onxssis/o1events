<template>
  <div>
    <hero />
    <div class="px-4 mb-20 mt-24">
      <base-search />
    </div>
    <upcoming-events />
    <category-events />
    <browse-category />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'home',
})
export default class IndexPage extends Vue {}
</script>
