<template>
  <fragment>
    <div
      class="font-medium font-display self-center text-xl sm:text-2xl text-gray-800"
    >
      {{ screen === 'login' ? 'Welcome Back' : 'Welcome' }}
    </div>
    <div class="mt-10">
      <form method="post" @submit.prevent="formAction">
        <base-input
          v-if="screen === 'register'"
          v-model="form.name"
          label="Name"
          placeholder="Full Name"
          required="true"
        >
          <template v-slot:icon>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-5.083 0-8.465 4.949-3.733 13.678 1.596 2.945-1.725 3.641-5.09 4.418-3.073.709-3.187 2.235-3.177 4.904l.004 1h23.99l.004-.969c.012-2.688-.093-4.223-3.177-4.935-3.438-.794-6.639-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.731-13.678m0 1c1.89 0 3.39.764 4.225 2.15 1.354 2.251.866 5.824-1.377 10.06-.577 1.092-.673 2.078-.283 2.932.937 2.049 4.758 2.632 6.032 2.928 2.303.534 2.412 1.313 2.401 3.93h-21.998c-.01-2.615.09-3.396 2.401-3.93 1.157-.266 5.138-.919 6.049-2.94.387-.858.284-1.843-.304-2.929-2.231-4.115-2.744-7.764-1.405-10.012.84-1.412 2.353-2.189 4.259-2.189"
              />
            </svg>
          </template>
        </base-input>

        <base-input
          v-model="form.email"
          label="Email"
          placeholder="Email Address"
          type="email"
          required="true"
        >
          <template v-slot:icon>
            <svg
              class="h-6 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </template>
        </base-input>

        <base-input
          v-model="form.password"
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          required="true"
        >
          <template v-slot:icon>
            <svg
              class="h-6 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </template>
        </base-input>

        <div class="flex w-full">
          <button
            type="submit"
            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-carrot hover:bg-carrot-dark rounded py-2 w-full transition duration-150 ease-in"
          >
            <span class="mr-2 text-base">{{ buttonText }}</span>
            <span>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
    <div class="flex justify-center items-center mt-6">
      <NuxtLink
        :to="toggleRoute"
        class="inline-flex items-center font-bold text-carrot hover:text-carrot-dark text-xs text-center"
      >
        <span class="ml-2">{{ toggleText }}</span>
      </NuxtLink>
    </div>
  </fragment>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Fragment } from 'vue-fragment'

enum AuthScreenType {
  login = 'login',
  register = 'register',
}

@Component({
  components: {
    Fragment,
  },
})
export default class AuthScreen extends Vue {
  @Prop({ default: AuthScreenType.login }) readonly screen!: string

  form = {
    name: '',
    email: '',
    password: '',
  }

  get buttonText() {
    return this.screen === AuthScreenType.login ? 'Log In' : 'Sign Up'
  }

  get toggleRoute() {
    return this.screen === AuthScreenType.login ? '/register' : '/login'
  }

  get toggleText() {
    return this.screen === AuthScreenType.login
      ? "You don't have an account?"
      : 'Already have an account?'
  }

  get formAction() {
    return this.screen === AuthScreenType.login ? this.login : this.register
  }

  async register() {
    const payload = {
      name: this.form.name,
      email: this.form.email,
      password: this.form.password,
    }

    await this.$axios.post('/auth/register', payload)
    await this.login()
  }

  async login() {
    const payload = {
      email: this.form.email,
      password: this.form.password,
    }

    try {
      await this.$auth.loginWith('local', { data: payload })
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
