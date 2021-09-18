<template>
	<div id="login">
		<section class="login">
			<div class="login__top">
				<img
					src="https://www.alliedtechbase.com/wp-content/uploads/2018/10/A_4C_White.png"
					alt="allied tech base!"
					class="login__logo"
				/>
				<span class="login__caption"
					>Welcome to
					<span class="login__company-name">allied tech base!</span></span
				>
				<span class="login__desc">
					Please sign-in to your account and start the adventure
				</span>
			</div>
			<form action="" class="form-login" v-on:submit.prevent="handleSubmitLogin">
				<div class="form__item">
					<input type="email" v-model="form.email" class="form__input" placeholder="email" />
					<label for="email" class="form__label">Email</label>
				</div>
				<div class="form__item">
					<input type="text" v-model="form.password" class="form__input" placeholder="password" />
					<label for="password"  class="form__label">Password</label>
				</div>
				<div class="item-checkbox">
					<input type="checkbox" class="item-checkbox__input" id="remember" />
					<label for="remember" class="item-checkbox__label"></label>
					<span class="item-checkbox__text">Remember me</span>
				</div>
				<button class="form__submit btn btn--primary">
					<span>Sign in</span>
				</button>
			</form>
		</section>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			form: {
				email: '',
				password: ''
			}
		}
	},

	methods: {
		...mapActions([
			'login',
			'mockUser'
		]),

		async handleSubmitLogin() {
			let data = {
                email: this.form.email,
                password: this.form.password
            }

			const response = await this.login(data)

			if(!response.ok) {
				if(typeof response.error === 'string') {
					alert(response.error)
				} else {
					alert(response.error.join(' '))
				}   
			} else {
				await this.mockUser()
				this.$router.push('/')
			}
		}
	}
}
</script>