<template>
  <fragment>
    <error-alert v-if="errors.length" :errors="errors" />
    <div class="bg-white border shadow md:shadow-md rounded-lg">
      <form method="POST" @submit.prevent="submitForm">
        <div class="rounded-lg">
          <div class="px-4 py-5 bg-white sm:p-6 rounded-lg">
            <div class="grid grid-cols-3 md:gap-6">
              <div class="col-span-3">
                <base-input
                  v-model="dto.name"
                  class="mb-4"
                  label="Name"
                  name="name"
                  placeholder="Name of the category/tag"
                  required="true"
                />
              </div>
            </div>

            <base-text-area
              id="description"
              v-model="dto.description"
              label="Description"
              name="description"
              rows="6"
              placeholder="Brief description for the category/tag"
            ></base-text-area>

            <div class="grid grid-cols-2 gap-4 md:gap-6 mb-6 items-center">
              <div class="col-span-2 md:col-span-1">
                <label class="block text-sm font-medium text-gray-700">
                  Cover
                </label>
                <div
                  v-if="uploading"
                  class="animate-spin mt-2 ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"
                  style="border-top-color: #9818d6"
                ></div>
                <div v-else class="mt-2 flex items-center">
                  <div class="overflow-hidden relative w-full">
                    <label
                      type="button"
                      class="bg-white py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 cursor-pointer focus:outline-none"
                    >
                      Choose
                      <input
                        class="absolute w-full block top-0 left-0 opacity-0 cursor-pointer"
                        type="file"
                        @change="uploadCover"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div v-if="dto.cover" class="ml-auto">
                <div class="shadow border-2 border-white rounded w-auto h-auto">
                  <img
                    class="w-full h-full overflow-hidden object-cover rounded"
                    :src="dto.cover"
                    alt="category cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
            <button
              :disabled="uploading"
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary"
            >
              {{ category ? 'Update' : 'Save' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </fragment>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { Fragment } from 'vue-fragment'
import ErrorAlert from '../ui/error-alert.vue'
import ResourceFormMixin from '../mixins/ResourceFormMixin'
import { ICategory, ICategoryDto } from '~/@types'
import { mergeObjects } from '~/utils'

const initialFormState = {
  name: '',
  description: '',
  cover: '',
}

@Component({
  components: { Fragment, ErrorAlert },
})
export default class CategoryForm extends mixins(ResourceFormMixin) {
  @Prop({ type: Object, default: undefined }) category?: ICategory

  dto: ICategoryDto = initialFormState
  uploadPreset = 'eventbux_categories'

  get isEditing() {
    return typeof this.category !== 'undefined'
  }

  async submitForm() {
    try {
      const action = this.isEditing ? 'categories/update' : 'categories/create'

      await this.$store.dispatch(action, {
        categoryId: this.category?.id,
        categoryDto: this.dto,
      })

      this.resetForm()
      this.$toast.success('Category created successfully')
    } catch (error) {
      this.onSubmitError(error)
    }
  }

  mounted() {
    this.dto =
      (mergeObjects(initialFormState, this.category) as ICategoryDto) ||
      initialFormState
  }

  resetForm() {
    this.dto.name = ''
    this.dto.description = ''
    this.dto.cover = ''
  }
}
</script>
