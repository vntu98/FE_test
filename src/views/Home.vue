<template>
  <div id="user">
    <app-header />
    
    <main class="container profile">
      
      <app-tabs :currentTab="currentTab" @changeTab="changeTab"/>

      <div class="profile-account" :class="{'active': currentTab === 'account'}">
        <app-avatar v-if="currentUser" />

        <form-account v-if="currentUser" />
      </div>
      
      <div class="profile-information" :class="{'active': currentTab === 'information'}">
        <form-information v-if="currentUser" />
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppTabs from '../components/AppTabs.vue'
import AppAvatar from '../components/AppAvatar.vue'
import FormAccount from '../components/FormAccount.vue'
import FormInformation from '../components/FormInformation.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',

  data() {
    return {
      currentTab: 'account'
    }
  },

  components: {
    AppHeader,
    AppTabs,
    AppAvatar,
    FormAccount,
    FormInformation
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    changeTab(tabName) {
      this.currentTab = tabName
    }
  }
}
</script>
