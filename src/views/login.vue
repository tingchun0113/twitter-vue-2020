<template>
  <div class="loginframe">
    <div id="login">
      <img class="logo" src="../../public/images/logo.png">
      <h3 class="title">Simple Twitter</h3>
      <form class="form" @submit.prevent.stop="handleSubmit">
        <input
          inputmode="user"
          v-model="account"
          autocomplete="username"
          required
          autofocus
          placeholder="Username"
        />
        <input
          type="password"
          v-model="password"
          autocomplete="current-password"
          required
          placeholder="Password"
        />
        <button
          type="submit"
          class="button"
          :disabled="isProcessing"
          :class="{isProcessing}"
        >Log in</button>
      </form>
      <div class="links">
        <router-link to="/register/">Register</router-link>
        <span>‧</span>
        <router-link to="/admin/">Admin</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: 'Please fill in username and password'
          })
          return
        }
        this.isProcessing = true

        const response = await authorizationAPI.logIn({
          account: this.account,
          password: this.password
        })

        const { data } = response
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)
        this.$router.push('/main')
      } catch (error) {
        this.isProcessing = false
        this.password = ''

        Toast.fire({
          icon: 'warning',
          title: 'Please check your username/password'
        })
        console.error(error.message)
      }
    }
  }
}
</script>

<style lang="sass">
$font-color: rgba(#b0d7f6, .8)

.loginframe
  display: flex
  justify-content: center
  #login
    display: flex
    flex-flow: column nowrap
    align-items: center
    .logo
      width: 50px
      margin:
        top: 20px
    .title
      margin: 20px
    .form
      display: flex
      flex-flow: column nowrap
      align-items: center
      input
        width: 360px
        line-height: 30px
        font-size: 16px
        padding: 10px
        margin: 10px
      .button
        background:
          color: $font-color
        width: 360px
        border: none
        border-radius: 20px
        padding: 10px
        margin: 10px
        font-size: 18px
        &:hover
          cursor: pointer
        &:active
          background:
            color: #a0c4e0
      .isProcessing:hover
        cursor: default
    .links a
      color: $font-color
      text-shadow: 0px 0px 0.5px black
      margin:
        top: 10px
</style>
