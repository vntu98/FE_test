<template>
  <div>
    <app-loading v-bind:class="{ show: isLoading }"/>

    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppLoading from './components/AppLoading.vue'

export default {
  components: {
    AppLoading
  },

  computed: {
		...mapState([ 'isLoading' ]),
	},

  methods: {
		...mapActions([
      'checkLogin',
      'mockUser'
    ]),

    hasMockUser() {
      return JSON.parse(localStorage.getItem('user'))
    }
	},

  created() {
		this.checkLogin()
    
    if (!this.hasMockUser) {
      this.mockUser()
    }
	},
}
</script>

<style lang="scss">
  @import '@/assets/style.scss'
</style>
