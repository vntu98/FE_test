<template>
  <header class="header container">
    <div class="header-notify">
      <i class="far fa-bell header-notify__icon"></i>
      <span class="header-notify__number">6</span>
    </div>
    <div class="header-user">
      <div class="header-user__info">
        <span class="header-user__name"> {{ currentUser ? currentUser.name : '' }} </span>
        <span class="header-user__position"> {{ currentUser ? currentUser.role : '' }} </span>
      </div>
      <div class="header-user__avatar">
        <img
          :src="currentUser ? currentUser.avatar : ''"
          alt="John Doe"
          class="header-user__img"
        />
      </div>
      <div class="header-action">
        <div class="header-action__item">
          <i class="far fa-user header-action__icon"></i>
          <span class="header-action__text">Profile</span>
        </div>
        <div @click="handleLogout" class="header-action__item">
          <i class="fas fa-sign-out-alt header-action__icon"></i>
          <span class="header-action__text">Logout</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    ...mapActions(['logout']),

    async handleLogout() {
      await this.logout()
      this.$router.push('/login')
    }
  }
}
</script>