<template>
  <div class="bg-gray-50 wrapper py-8">
    <div class="max-w-fit md:max-w-screen-sm lg:max-w-screen-md mx-auto">
      <base-page-header> Create event </base-page-header>

      <div class="bg-white border shadow md:shadow-md rounded-lg">
        <form method="POST" @submit.prevent="submitForm">
          <div class="rounded-lg">
            <div class="px-4 py-5 bg-white sm:p-6 rounded-lg">
              <div class="grid grid-cols-3 md:gap-6">
                <div class="col-span-3 md:col-span-2">
                  <base-input
                    v-model="eventDto.title"
                    label="Title"
                    name="title"
                    placeholder="Title of the event"
                    required="true"
                  />
                </div>

                <div class="flex flex-col mb-6 col-span-3 md:col-span-1">
                  <label
                    for="type"
                    class="mb-1 text-sm font-medium text-gray-700"
                    >Type</label
                  >
                  <div class="border border-gray-300 rounded-lg flex relative">
                    <select
                      id="type"
                      v-model="eventDto.type"
                      type="text"
                      name="type"
                      required
                      class="bg-transparent appearance-none pl-3 py-2 w-full text-sm sm:text-base border border-transparent focus:outline-none focus:border-primary text-gray-800 rounded"
                    >
                      <option value="online">Online</option>
                      <option value="person">In Person</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-4 md:gap-6 mb-6">
                <div class="col-span-2">
                  <label class="mb-1 text-sm font-medium text-gray-700"
                    >Start date</label
                  >
                  <VueCtkDateTimePicker
                    id="startDatePicker"
                    v-model="eventDto.startDate"
                    color="#9818d6"
                    :no-label="true"
                    format="YYYY-MM-DDTHH:mm:ss.sssZ"
                    required
                  >
                  </VueCtkDateTimePicker>
                </div>

                <div class="col-span-2">
                  <label class="mb-1 text-sm font-medium text-gray-700"
                    >End date</label
                  >

                  <VueCtkDateTimePicker
                    id="endDatePicker"
                    v-model="eventDto.endDate"
                    color="#9818d6"
                    :no-label="true"
                    format="YYYY-MM-DDTHH:mm:ss.sssZ"
                    output-format="YYYY-MM-DDTHH:mm:ss.sssZ"
                    required
                  >
                  </VueCtkDateTimePicker>
                </div>
              </div>

              <div class="grid grid-cols-5 gap-4 md:gap-6">
                <div class="col-span-3">
                  <label class="mb-1 text-sm font-medium text-gray-700"
                    >Location</label
                  >

                  <gmap-autocomplete
                    class="text-sm sm:text-base placeholder-gray-500 pl-3 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-primary"
                    placeholder="Location of the event"
                    type="text"
                    @place_changed="setAddress"
                  >
                  </gmap-autocomplete>
                </div>

                <div class="col-span-1">
                  <base-input
                    v-model.number="eventDto.price"
                    type="number"
                    label="Price"
                  >
                    <template v-slot:icon>
                      <span class="text-gray-500 sm:text-sm"> $ </span>
                    </template>
                  </base-input>
                </div>

                <div class="col-span-1">
                  <base-input
                    label="Slots"
                    placeholder="Available seats"
                    required
                    type="number"
                  />
                </div>
              </div>

              <base-text-area
                id="description"
                v-model="eventDto.description"
                label="Description"
                name="description"
                rows="3"
                placeholder="Brief description for your event. URLs are hyperlinked."
              ></base-text-area>

              <div class="grid grid-cols-3 gap-4 md:gap-6 mb-6 items-center">
                <div class="col-span-3 md:col-span-1">
                  <label class="block text-sm font-medium text-gray-700">
                    Cover
                  </label>
                  <div class="mt-2 flex items-center">
                    <div class="overflow-hidden relative w-full">
                      <label
                        type="button"
                        class="bg-white py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 cursor-pointer focus:outline-none"
                      >
                        Choose
                        <input
                          class="absolute w-full block top-0 left-0 opacity-0 cursor-pointer"
                          type="file"
                          name="vacancyImageFiles"
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
                    v-model="eventDto.categories"
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
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import MultiSelect from 'vue-multiselect'
import BasePageHeader from '~/components/base-page-header.vue'
import { IEventDto } from '~/@types/index'

@Component({
  components: { BasePageHeader, VueCtkDateTimePicker, MultiSelect },
  layout: 'default',
  // middleware: ['auth', 'admin'],
})
export default class CreateEventPage extends Vue {
  selectOptions = []
  eventDto: IEventDto = {
    categories: [],
    startDate: '',
    endDate: '',
    title: '',
    description: '',
    address: '',
    cover: null,
    price: 0,
    lng: 0,
    lat: 0,
  }

  async fetch() {
    try {
      const { data } = await this.$axios.get('/categories')
      this.selectOptions = data
    } catch (e) {
      this.selectOptions = []
    }
  }

  setAddress(place: any) {
    console.log(place)
    this.eventDto.address = place.formatted_address
    this.eventDto.lng = place.geometry.location.lng()
    this.eventDto.lat = place.geometry.location.lat()
  }

  uploadCover() {}

  async submitForm() {
    await this.$store.dispatch('events/create', this.eventDto)
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
