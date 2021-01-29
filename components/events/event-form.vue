<template>
  <fragment>
    <error-alert v-if="errors.length" :errors="errors" />
    <div class="bg-white border shadow md:shadow-md rounded-lg">
      <form method="POST" @submit.prevent="submitForm">
        <div class="rounded-lg">
          <div class="px-4 py-5 bg-white sm:p-6 rounded-lg">
            <div class="grid grid-cols-3 md:gap-6">
              <div class="col-span-3 md:col-span-2">
                <base-input
                  v-model="dto.title"
                  label="Title"
                  name="title"
                  placeholder="Title of the event"
                  required="true"
                />
              </div>

              <div class="flex flex-col mb-6 col-span-3 md:col-span-1">
                <label for="type" class="mb-1 text-sm font-medium text-gray-700"
                  >Type</label
                >
                <div class="border border-gray-300 rounded-lg flex relative">
                  <select
                    id="type"
                    v-model="dto.type"
                    name="type"
                    required
                    class="bg-transparent appearance-none pl-3 py-2 w-full text-sm sm:text-base border border-transparent focus:outline-none focus:border-primary text-gray-800 rounded"
                  >
                    <option :value="''" disabled hidden>Choose one</option>
                    <option value="online">Online</option>
                    <option value="person">In Person</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-4 md:gap-6 mb-6">
              <div class="col-span-2">
                <label class="mb-1 text-sm font-medium text-gray-700"
                  >Event starts</label
                >
                <VueCtkDateTimePicker
                  id="startDatePicker"
                  v-model="dto.startDate"
                  color="#9818d6"
                  :no-label="true"
                  output-format="YYYY-MM-DDTHH:mm:ss.sssZ"
                  format="YYYY-MM-DDTHH:mm:ss.sssZ"
                  :min-date="new Date(Date.now()).toISOString()"
                >
                </VueCtkDateTimePicker>
              </div>

              <div class="col-span-2">
                <label class="mb-1 text-sm font-medium text-gray-700"
                  >Event ends</label
                >

                <VueCtkDateTimePicker
                  id="endDatePicker"
                  v-model="dto.endDate"
                  color="#9818d6"
                  :no-label="true"
                  output-format="YYYY-MM-DDTHH:mm:ss.sssZ"
                  format="YYYY-MM-DDTHH:mm:ss.sssZ"
                  :min-date="minEndDate"
                >
                </VueCtkDateTimePicker>
              </div>
            </div>

            <div
              class="grid gap-4 md:gap-6"
              :class="{ 'grid-cols-5': !isOnline, 'grid-cols-4': isOnline }"
            >
              <div v-if="!isOnline" class="col-span-3">
                <label class="mb-1 text-sm font-medium text-gray-700"
                  >Location</label
                >

                <gmap-autocomplete
                  class="text-sm sm:text-base placeholder-gray-500 pl-3 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-primary"
                  placeholder="Location of the event"
                  type="text"
                  :options="{ fields: ['geometry', 'formatted_address'] }"
                  :value="dto.address"
                  @place_changed="setAddress"
                  @keypress.enter="$event.preventDefault()"
                >
                </gmap-autocomplete>
              </div>

              <div v-if="isOnline" class="col-span-3">
                <base-input
                  v-model="dto.link"
                  label="Link"
                  name="link"
                  placeholder="Link to join event"
                  required="true"
                  type="text"
                />
              </div>

              <div v-if="!isOnline" class="col-span-1">
                <base-input
                  v-model.number="dto.price"
                  type="number"
                  label="Price"
                  help="0 = free"
                >
                  <template v-slot:icon>
                    <span class="text-gray-500 sm:text-sm"> $ </span>
                  </template>
                </base-input>
              </div>

              <div class="col-span-1">
                <base-input
                  v-model.number="dto.availableSlots"
                  label="Slots"
                  placeholder="Available seats"
                  required
                  min="1"
                  type="number"
                />
              </div>
            </div>

            <base-text-area
              id="description"
              v-model="dto.description"
              label="Description"
              name="description"
              rows="6"
              placeholder="Brief description for your event. URLs are hyperlinked."
            ></base-text-area>

            <div class="grid grid-cols-3 gap-4 md:gap-6 mb-6 items-center">
              <div class="col-span-3 md:col-span-1">
                <label class="block text-sm font-medium text-gray-700">
                  Cover
                </label>

                <!-- <div class="shadow border-2 border-white rounded w-40 h-auto">
                  <img
                    class="w-full h-full overflow-hidden object-cover rounded"
                    src="https://dh-ui.s3.amazonaws.com/assets/photo-1564061170517-d3907caa96ea.jfif"
                    alt="avatar"
                  />
                </div> -->

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

              <div class="col-span-3 md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Categories/Tags
                </label>
                <multi-select
                  v-model="dto.categories"
                  :multiple="true"
                  label="name"
                  track-by="id"
                  :close-on-select="true"
                  :options="selectOptions"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
            <button
              :disabled="uploading"
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary"
            >
              {{ event ? 'Update' : 'Save' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </fragment>
</template>

<script lang="ts">
import { Component, namespace, Prop, mixins } from 'nuxt-property-decorator'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import { Fragment } from 'vue-fragment'
import MultiSelect from 'vue-multiselect'
import ErrorAlert from '../ui/error-alert.vue'
import ResourceFormMixin from '~/components/mixins/ResourceFormMixin'
import { ICategory, IEvent, IEventDto } from '~/@types'
import { deleteObjectProps, mergeObjects } from '~/utils'

const categoryStore = namespace('categories')
const initialFormState = {
  categories: [] as any,
  startDate: '',
  endDate: '',
  title: '',
  description: '',
  address: '',
  cover: null,
  price: 0,
  lng: 0,
  lat: 0,
  type: '',
  availableSlots: 1,
  link: '',
}

@Component({
  components: { VueCtkDateTimePicker, MultiSelect, Fragment, ErrorAlert },
})
export default class EventForm extends mixins(ResourceFormMixin) {
  @Prop({ type: Object, default: undefined }) event?: IEvent

  @categoryStore.State('categories')
  selectOptions!: ICategory[]

  dto: IEventDto = initialFormState
  uploadPreset = 'eventbux_events'

  get isEditing() {
    return typeof this.event !== 'undefined'
  }

  get minEndDate() {
    return new Date(this.dto.startDate || Date.now()).toISOString()
  }

  get isOnline() {
    return this.dto.type === 'online'
  }

  setAddress(place: any) {
    this.dto.address = place.formatted_address
    this.dto.lng = place.geometry.location.lng()
    this.dto.lat = place.geometry.location.lat()
  }

  async submitForm() {
    try {
      this.filterForm()

      const method = this.isEditing ? 'put' : 'post'
      const url = this.isEditing ? `/events/${this.event?.id}` : '/events'
      const message = this.isEditing ? 'updated' : 'created'

      await this.$axios[method](url, this.dto)

      if (!this.isEditing) {
        this.resetForm()
      }

      this.$toast.success(`Event ${message} successfully`)
    } catch (error) {
      this.onSubmitError(error)
    }
  }

  filterForm() {
    if (this.isOnline) {
      deleteObjectProps(this.dto, ['address', 'lat', 'lng'])
    } else {
      deleteObjectProps(this.dto, ['link'])
    }

    this.dto.categories = this.dto.categories.map((category) => category.id)
  }

  mounted() {
    this.dto =
      (mergeObjects(initialFormState, this.event) as IEventDto) ||
      initialFormState
  }

  resetForm() {
    this.dto.title = ''
    this.dto.description = ''
    this.dto.startDate = ''
    this.dto.endDate = ''
    this.dto.address = ''
    this.dto.link = ''
    this.dto.lng = 0
    this.dto.lat = 0
    this.dto.availableSlots = 1
    this.dto.type = ''
    this.dto.price = 0
    this.dto.categories = []
    this.dto.cover = null
  }
}
</script>

<style>
@import 'vue-multiselect/dist/vue-multiselect.min.css';

#startDatePicker-input,
#endDatePicker-input {
  @apply text-base font-body;
}

.multiselect__select {
  @apply hidden;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  @apply bg-primary;
}

.multiselect__tag {
  @apply bg-primary;
}

.multiselect__tag-icon::after {
  @apply text-primary-darkest;
}

.multiselect__tags {
  @apply focus:ring-primary focus:border-primary mt-1 block w-full border-gray-300 rounded-md placeholder-gray-400;
}

.multiselect__spinner::before,
.multiselect__spinner::after {
  @apply border-primary;
  border-top-color: #9818d6;
}
</style>
