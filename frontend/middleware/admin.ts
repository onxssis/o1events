/* eslint-disable camelcase */
import { Middleware } from '@nuxt/types'

const isAdminMiddleware: Middleware = ({ store, redirect }) => {
  const isLoggedIn = store.$auth.loggedIn
  const isAdmin = store.$auth.user?.isAdmin

  if (isLoggedIn === false || isAdmin === false) {
    return redirect('/login')
  }
}

export default isAdminMiddleware
