<template>
  <form action="" class="form">
    <div class="form__item">
      <input
        v-model="form.username"
        type="text"
        id="username"
        name="username"
        class="form__input"
        placeholder="username"
      />
      <label for="username" class="form__label">Username</label>
    </div>
    <div class="form__item">
      <input
        v-model="form.name"
        type="text"
        class="form__input"
        placeholder="name"
      />
      <label for="name" class="form__label">Name</label>
    </div>
    <div class="form__item">
      <input
        v-model="form.email"
        type="email"
        class="form__input"
        placeholder="email"
      />
      <label for="email" class="form__label">Email</label>
    </div>

    <div class="form__item dropdown active">
      <div class="dropdown-select">
        <span class="select">{{ form.status }}</span>
        <i class="fa fa-caret-down icon"></i>
      </div>
      <div class="dropdown-list">
        <div
          v-for="status in statuses"
          :key="status"
          class="dropdown-list__item"
          :class="{ 'active': form.status === status }"
          @click="changeStatus(status)"
        >
          <span class="dropdown-list__text">{{ status }}</span>
          <i class="fas fa-check dropdown-list__icon"></i>
        </div>
      </div>
      <span class="select__label">Status</span>
    </div>

    <div class="form__item dropdown active">
      <div class="dropdown-select">
        <span class="select">{{ form.role }}</span>
        <i class="fa fa-caret-down icon"></i>
      </div>
      <div class="dropdown-list">
        <div
          v-for="role in roles"
          :key="role"
          class="dropdown-list__item"
          :class="{ 'active': form.role === role }"
          @click="changeRole(role)"
        >
          <span class="dropdown-list__text">{{ role }}</span>
          <i class="fas fa-check dropdown-list__icon"></i>
        </div>
      </div>
      <span class="select__label">User Role</span>
    </div>
    <div class="form__item">
      <input
        v-model="form.company"
        type="text"
        class="form__input"
        placeholder="company"
      />
      <label for="company" class="form__label">company</label>
    </div>
    <div class="form__action">
      <button @click.prevent="handleUpdate" type="submit" class="btn btn--primary">
        <span>Save changes</span>
      </button>
      <button @click.prevent="handleReset" type="reset" class="btn btn--secondary">
        <span>Reset</span>
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      roles: ['admin', 'author', 'editor', 'maintainer', 'subscriber'],
      statuses: ['pending', 'active', 'inactive'],
      form: {
        username: '',
        status: '',
        name: '',
        role: '',
        email: '',
        company: '',
      }
    }
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    ...mapActions([
      'mockUpdateUser',
      'mockUser',
      'mockUserDefault'
    ]),

    changeStatus(status) {
      this.form.status = status
    },

    changeRole(role) {
      this.form.role = role
    },

    async handleUpdate() {
      await this.mockUpdateUser(this.form)
      alert('Successfull')
    },

    async handleReset() {
      const userDefault = await this.mockUserDefault()

      this.form = {
        ...this.form,
        username: userDefault.username,
        status: userDefault.status,
        name: userDefault.name,
        role: userDefault.role,
        email: userDefault.email,
        company: userDefault.company,
      }

      await this.mockUpdateUser(this.form)
      alert('Successfull')
    },
  },

  mounted() {
    this.form = { ...this.currentUser }
  }
}
</script>