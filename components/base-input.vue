<template>
  <div class="flex flex-col mb-6">
    <label
      v-if="label"
      class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
      >{{ label }}</label
    >
    <div class="relative">
      <div
        v-if="hasIconSlot"
        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
      >
        <slot name="icon" />
      </div>

      <input
        class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-carrot"
        :class="{ 'pl-10': hasIconSlot }"
        v-bind="$attrs"
        :value="value"
        :type="type"
        v-on="$listeners"
        @input="$emit('update', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

const TYPES = [
  'text',
  'password',
  'email',
  'number',
  'url',
  'tel',
  'search',
  'color',
]
const includes = (types: string[]) => (type: string) => types.includes(type)

@Component({
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'update',
  },
})
export default class BaseInput extends Vue {
  @Prop() value!: any
  @Prop() label!: string
  @Prop({
    default: 'text',
    validator(value) {
      const isValid = includes(TYPES)(value)
      if (!isValid) {
        // eslint-disable-next-line no-console
        console.warn(`allowed types are ${TYPES}`)
      }
      return isValid
    },
  })
  type?: string

  get hasIconSlot() {
    return !!this.$slots.icon
  }
}
</script>
