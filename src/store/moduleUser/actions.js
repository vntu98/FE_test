import axiosInstance from '../../plugins/axios'
import { parseJwt } from '../../helpers'
import { CONFIG_ACCESS_TOKEN, TOKEN_TEMPORARY } from '../../constants'

export default {
  async login({ commit }, { email = '', password = '' }) {
    commit('SET_LOADING', true)

    try {
      let data = {
        email: email,
        password: password
      }

      // TODO: fix CORS
      // let response = await axiosInstance.post('/login.php', data)

      const response = {
        status: 200,
        data: {
          user: {
            "email": "admin@gmail.com",
            "name": "admin updated",
            "phone_number": "0123456789",
            "address": "Ha Noi"
          },
          token: TOKEN_TEMPORARY
        }
      }

      commit('SET_LOADING', false)
      
      if (response.status === 200) {

        commit('SET_USER_INFO', response.data.user)
        commit('SET_LOGIN_INFO', response.data)

        return {
          ok: true,
          error: null,
          data: response.data
        }
      } else {
        return {
          ok: false,
          error: response.message
        }
      }
      
    } catch(error) {
      commit('SET_LOADING', false)
      
      return {
        ok: false,
        error: response.message
      }
    }
  },

  async logout({ commit }) {
    commit('SET_LOGOUT')

    let config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
      }
    }

    // TODO: fix CORS
    // await axiosInstance.post('/logout.php', config)

    return null
  },

  async getUserByEmail({ commit }, email) {
    try {
      var response = await axiosInstance.get('/show.php?email=' + email)

      if(response.data.status === 200) {
          commit('SET_USER_INFO', result.data)

          return {
            ok: true,
            data: result.data,
          }
      }

      return {
          ok: false,
          error: result.message
      }
    } catch(error) {
      console.log('whoops,', error)
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async checkLogin({ commit, dispatch }) {
    try {
      let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN)
      let userObj = parseJwt(tokenLocal)

      if(userObj) {
        let response = await dispatch('getUserByEmail', userObj.email)

        if(response.ok) {
          let data = {
            user: response.data,
            token: tokenLocal
          }
          commit('SET_LOGIN_INFO', data)
          return {
            ok: true,
            error: null
          }
        }
      }
      
      return false
        
    } catch(error) {
      console.log('whoops', error)
      return false
    }
  },

  async mockUserDefault() {
    try {
      const response = await axiosInstance.get('/mock/user')
      
      if (response.status === 200) {
        const { user } = response.data

        return user
      }
        
    } catch(error) {
      console.log('whoops', error)
    }
  },

  async mockUser({ commit }) {
    try {
      const response = await axiosInstance.get('/mock/user')
      
      if (response.status === 200) {
        const { user } = response.data

        commit('SET_USER_INFO', user)
      }
        
    } catch(error) {
      console.log('whoops', error)
    }
  },

  async mockUpdateUser({ commit }, data) {
    const { id } = data
    try {
      const response = await axiosInstance.put(`/mock/user/${id}`, data)
      
      if (response.status === 200) {
        const user = response.data

        commit('SET_USER_INFO', user)
      }
        
    } catch(error) {
      console.log('whoops', error)
    }
  },
}