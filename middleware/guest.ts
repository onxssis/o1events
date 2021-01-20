/* eslint-disable camelcase */
import { Middleware } from '@nuxt/types'

const guestMiddleware: Middleware = ({ store, redirect }) => {
  const isLoggedIn = store.$auth.loggedIn

  if (isLoggedIn) {
    return redirect('/')
  }
}

export default guestMiddleware
