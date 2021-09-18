import { CONFIG_ACCESS_TOKEN } from '../../constants'
import { parseJwt } from '../../helpers'

export default {
  isLogin: state => {
    const userObj = parseJwt(state[CONFIG_ACCESS_TOKEN])

    if(userObj) {
      return true
    } else {
      return false
    }
  },

  currentUser: state => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'))
    
    return userLocalStorage || state.currentUser
  }
}