<template>
  <div class="bg-gray-50 wrapper py-8">
    <div class="max-w-fit md:max-w-screen-sm lg:max-w-screen-md mx-auto">
      <base-page-header> Create event </base-page-header>

      <div class="bg-white border shadow md:shadow-md rounded-lg">
        <form action="#" method="POST">
          <div class="rounded-lg">
            <div class="px-4 py-5 bg-white sm:p-6 rounded-lg">
              <div class="grid grid-cols-3 md:gap-6">
                <div class="col-span-3 md:col-span-2">
                  <base-input
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

              <div class="mb-6">
                <label
                  for="about"
                  class="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div class="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    class="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  ></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Brief description for your event. URLs are hyperlinked.
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Cover
                </label>
                <div class="mt-2 flex items-center">
                  <button
                    type="button"
                    class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Choose
                  </button>
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
import basePageHeader from '~/components/base-page-header.vue'

@Component({
  components: { basePageHeader },
  layout: 'default',
  middleware: ['auth', 'admin'],
})
export default class CreateEventPage extends Vue {}
</script>
