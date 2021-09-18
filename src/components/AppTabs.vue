<template>
  <div class="profile-select">
    <div @click="changeTab('account')" class="profile-select__item profile--accout" :class="{'active': currentTab === 'account'}">
      <i class="far fa-user profile-select__icon"></i>
      <span class="profile-select__text">account</span>
    </div>
    <div @click="changeTab('information')" class="profile-select__item profile--info" :class="{'active': currentTab === 'information'}">
      <i class="fas fa-info-circle profile-select__icon"></i>
      <span class="profile-select__text">information</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTab: {
      required: true,
      type: String
    }
  },

  methods: {
    changeTab(tabName) {
      this.$emit('changeTab', tabName)
    }
  }
}
</script>