<template>
  <div class="flex flex-col mb-6">
    <label v-if="label" class="mb-1 block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="relative">
      <textarea
        id="about"
        :value="value"
        v-bind="$attrs"
        class="focus:ring-primary focus:border-primary mt-1 block w-full border-gray-300 rounded-md placeholder-gray-400"
        v-on="$listeners"
        @input="$emit('update', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'update',
  },
})
export default class BaseTextArea extends Vue {
  @Prop() value!: any
  @Prop() label!: string
}
</script>
