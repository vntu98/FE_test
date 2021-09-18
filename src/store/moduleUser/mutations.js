import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default {
  SET_LOGIN_INFO(state, { token = '' }) {
    localStorage.setItem(CONFIG_ACCESS_TOKEN, token)
    state[CONFIG_ACCESS_TOKEN] = token
  },

  SET_USER_INFO(state, user) {
    state.currentUser = { ...user }

    localStorage.setItem('user', JSON.stringify(user))
  },

  SET_LOGOUT(state) {
    state[CONFIG_ACCESS_TOKEN] = ''
    state.currentUser = null
    localStorage.removeItem(CONFIG_ACCESS_TOKEN)
  }
}