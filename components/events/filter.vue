<template>
  <div ref="clickAway" class="flex">
    <div class="relative flex items-center">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="relative flex items-center w-full filter rounded-md bg-gray-200 shadow-sm px-3 py-2 text-left cursor-pointer focus:outline-none sm:text-sm"
        :class="{ 'bg-primary-light': selected }"
        @click="open = !open"
      >
        <span class="ml-2 block truncate">
          {{ selection }}
        </span>

        <button
          v-if="shouldClear"
          class="bg-transparent ml-2"
          @click.stop="clearFilter(filterName)"
        >
          <svg
            class="text-gray-900 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <svg
          v-else
          class="text-gray-900 h-5 w-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        v-if="open"
        class="absolute dropdown z-10 mt-1 min-w-max w-full rounded-md bg-white shadow-lg"
      >
        <ul
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
          <li
            v-for="(filter, keyValue, index) in options"
            :key="index"
            role="option"
            class="cursor-pointer hover:bg-gray-100 select-none relative py-2 px-3 flex items-center text-gray-900"
            @click="selectOption(keyValue)"
          >
            <span class="block font-normal truncate"> {{ filter }} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class FilterSelect extends Vue {
  @Prop() selected!: boolean
  @Prop() filterName!: string
  @Prop() options!: Record<string, string>
  @Prop() selection!: string
  @Prop() shouldClear!: boolean

  open = false

  clearFilter(key: string) {
    this.$emit('clear-filter', key)
  }

  selectOption(value: string) {
    this.$emit('select-option', this.filterName, value)
    this.open = false
  }

  mounted() {
    document.addEventListener('click', (event) => {
      event.stopPropagation()
      const ref = this.$refs.clickAway
      if (ref && !(ref as Element).contains(event.target as Node)) {
        this.open = false
      }
    })
  }
}
</script>

<style scoped>
.filter {
  min-width: 97px;
  margin-right: 1rem;
  border-radius: 0.375rem;
  max-width: max-content;
}

.dropdown {
  top: 33px;
  left: 0;
}
</style>
