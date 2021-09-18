<template>
  <div>
    <div class="info">
      <i class="far fa-user info__icon"></i>
      <span class="info__text">Personal Information</span>
    </div>
    <form action="" class="form">
      <div class="form__item">
        <input
          v-model="form.birth_day"
          type="date"
          class="form__input"
          placeholder="date"
        />
        <label for="date" class="form__label">Birth date</label>
      </div>
      <div class="form__item">
        <input
          v-model="form.mobile"
          type="number"
          class="form__input"
          placeholder="mobile"
        />
        <label for="mobile" class="form__label">mobile</label>
      </div>
      <div class="form__item">
        <input
          v-model="form.website"
          type="text"
          class="form__input"
          placeholder="website"
        />
        <label for="website" class="form__label">website</label>
      </div>
      <div class="form__item dropdown active">
        <div class="dropdown-select">
          <span class="select">{{ form.language }}</span>
          <i class="fa fa-caret-down icon"></i>
        </div>
        <div class="dropdown-list">
          <div
            v-for="language in languages"
            :key="language"
            class="dropdown-list__item"
            :class="{'active': form.language === language}"
            @click="changeLanguage(language)"
          >
            <span class="dropdown-list__text">{{ language }}</span>
            <i class="fas fa-check dropdown-list__icon"></i>
          </div>
        </div>
        <span class="select__label">Language</span>
      </div>
      <div class="form__item">
        <div @click="changeGender('male')" class="item-radio">
          <input
            v-model="form.gender"
            type="radio"
            class="item-radio__input"
            name="gender"
            value="male"
          />
          <label for="male" class="item-radio__label"></label>
          <span class="item-radio__text">Male</span>
        </div>
        <div @click="changeGender('female')" class="item-radio">
          <input
            v-model="form.gender"
            type="radio"
            class="item-radio__input"
            name="gender"
            value="female"
          />
          <label for="female" class="item-radio__label"></label>
          <span class="item-radio__text">Female</span>
        </div>
        <span for="website" class="radio__label">website</span>
      </div>
      <div class="form__item group-checkbox">
        <div class="item-checkbox">
          <input
            v-model="form.contact"
            value="email"
            type="checkbox"
            class="item-checkbox__input"
            id="contact-email"
          />
          <label for="contact-email" class="item-checkbox__label"></label>
          <span class="item-checkbox__text">email</span>
        </div>
        <div class="item-checkbox">
          <input
            v-model="form.contact"
            value="message"
            type="checkbox"
            class="item-checkbox__input"
            id="contact-mess"
          />
          <label for="contact-mess" class="item-checkbox__label"></label>
          <span class="item-checkbox__text">message</span>
        </div>
        <div class="item-checkbox">
          <input
            v-model="form.contact"
            value="phone"
            type="checkbox"
            class="item-checkbox__input"
            id="contact-phone"
          />
          <label for="contact-phone" class="item-checkbox__label"></label>
          <span class="item-checkbox__text">Phone</span>
        </div>
        <span for="website" class="checkbox__label">contact options</span>
      </div>
    </form>
    <div class="info info--address">
      <i class="fas fa-map-marker-alt"></i>
      <span class="info__text">address</span>
    </div>
    <form action="" class="form">
      <div class="form__item">
        <input
          v-model="form.address_line_1"
          type="text"
          class="form__input"
          placeholder="address-line-1"
        />
        <label for="address-line-1" class="form__label"
          >address line 1</label
        >
      </div>
      <div class="form__item">
        <input
          v-model="form.address_line_2"
          type="text"
          class="form__input"
          placeholder="address-line-2"
        />
        <label for="address-line-2" class="form__label"
          >address line 2</label
        >
      </div>
      <div class="form__item">
        <input
          v-model="form.postcode"
          type="text"
          class="form__input"
          placeholder="postcode"
        />
        <label for="postcode" class="form__label">postcode</label>
      </div>
      <div class="form__item">
        <input
          v-model="form.city"
          type="text"
          class="form__input"
          placeholder="city"
        />
        <label for="city" class="form__label">city</label>
      </div>
      <div class="form__item">
        <input
          v-model="form.state"
          type="text"
          class="form__input"
          placeholder="state"
        />
        <label for="state" class="form__label">state</label>
      </div>
      <div class="form__item">
        <input
          v-model="form.country"
          type="text"
          class="form__input"
          placeholder="country"
        />
        <label for="country" class="form__label">country</label>
      </div>
    </form>

    <button @click.prevent="handleUpdate" type="submit" class="btn btn--primary">
      <span>Save changes</span>
    </button>
    <button @click.prevent="handleReset" type="reset" class="btn btn--secondary">
      <span>Reset</span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      languages: ['english', 'spanish', 'french', 'russian', 'german', 'arabic', 'sanskrit'],
      statuses: ['pending', 'active', 'inactive'],
      form: {
        birth_day: '',
        language: '',
        mobile: '',
        gender: '',
        website: '',
        contact: [],
        address_line_1: '',
        city: '',
        address_line_2: '',
        state: '',
        postcode: '',
        country: '',
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

    changeLanguage(language) {
      this.form.language = language
    },

    changeRole(role) {
      this.form.role = role
    },

    changeGender(gender) {
      this.form.gender = gender
    },

    async handleUpdate() {
      await this.mockUpdateUser(this.form)
      alert('Successfull')
    },

    async handleReset() {
      await this.resetForm()

      await this.mockUpdateUser(this.form)
      alert('Successfull')
    },

    async resetForm() {
      const userDefault = await this.mockUserDefault()

      this.form = {
        ...this.form,
        birth_day: userDefault.birth_day,
        language: userDefault.language,
        mobile: userDefault.mobile,
        gender: userDefault.gender,
        website: userDefault.website,
        contact: userDefault.contact,
        address_line_1: userDefault.address_line_1,
        city: userDefault.city,
        address_line_2: userDefault.address_line_2,
        state: userDefault.state,
        postcode: userDefault.postcode,
        country: userDefault.country,
      }
    }
  },

  mounted() {
    this.form = { ...this.currentUser }
  }
}
</script>