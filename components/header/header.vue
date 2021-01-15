<template>
  <nav class="bg-white px-4 md:px-0">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-6">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="font-display">
              <NuxtLink to="/">EventsGalore</NuxtLink>
            </h1>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div v-if="$auth.loggedIn === false">
            <NuxtLink
              to="/login"
              class="inline-flex py-2 px-3 text-gray-900 hover:text-primary"
            >
              Log in
            </NuxtLink>
            <NuxtLink
              class="inline-flex py-2 px-3 hover:text-primary"
              to="/register"
            >
              Sign up
            </NuxtLink>
          </div>

          <div
            v-if="$auth.loggedIn && $auth.user"
            class="auth flex items-center"
          >
            <button
              class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div ref="clickAway" class="ml-3 relative">
              <div>
                <button
                  class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  @click="open = !open"
                >
                  <!-- <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> -->
                  <default-avatar :initials="$auth.user.initials" />
                </button>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-show="open"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                >
                  <div class="py-1 rounded-md bg-white shadow-xs">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >Your Profile</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >Settings</a
                    >
                    <button
                      type="button"
                      class="bg-transparent block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out text-left w-full"
                      @click="logout"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            @click="open = !open"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                :class="{ hidden: open, 'inline-flex': !open }"
                class="inline-flex"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                :class="{ hidden: !open, 'inline-flex': open }"
                class="hidden"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="sm:hidden" :class="{ block: open, hidden: !open }">
      <mobile-menu />
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Header extends Vue {
  open = false

  async logout() {
    await this.$auth.logout()
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
