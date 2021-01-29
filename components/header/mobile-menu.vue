<template>
  <div>
    <div
      v-if="$auth.loggedIn === false"
      class="pt-4 pb-3 border-t border-gray-200"
    >
      <div class="mt-3">
        <mobile-menu-link>Log in</mobile-menu-link>
        <mobile-menu-link>Sign up</mobile-menu-link>
      </div>
    </div>
    <div v-else class="pt-4 pb-3 border-t border-gray-200">
      <div class="flex items-center px-4">
        <div class="flex-shrink-0">
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div class="ml-3">
          <div class="text-base font-medium leading-6 text-gray-800">
            Tom Cook
          </div>
          <div class="text-sm font-medium leading-5 text-gray-500">
            tom@example.com
          </div>
        </div>
      </div>
      <div class="mt-3">
        <mobile-menu-link>Profile</mobile-menu-link>
        <mobile-menu-link>Settings</mobile-menu-link>
        <mobile-menu-link>Sign out</mobile-menu-link>
      </div>
    </div>
  </div>
</template>
