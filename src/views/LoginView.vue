<template>
  <form class="form-login bg-white px-16 py-14 rounded-lg" @submit.prevent="submitLogin">
    <h2 class="text-4xl text-center mb-10 select-none">Авторизация</h2>
    <div class="">
      <div class="mb-4">
        <input
        title="Введите логин"
        type="text" name="username" id="username" placeholder="Логин"
        v-model.trim="username"
        class="input-text mb-1"
        :class="{invalid: (v$.username.$errors.length)}">
        <div class="input-errors max-w-xl" v-for="error of v$.username.$errors" :key="error.$uid">
          <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
        </div>
      </div>
      <div class="mb-16">
        <input
        title="Введите пароль"
        v-model.trim="password"
        :class="{invalid: (v$.password.$errors.length)}"
        class="input-text" type="password" name="password" id="" placeholder="Пароль">
        <div class="input-errors max-w-xl" v-for="error of v$.password.$errors" :key="error.$uid">
          <div class="helper-text">{{ error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
        </div>
      </div>
      <button class="main-btn block w-full py-2 rounded-lg text-2xl" type="submit" :disabled="loading">Войти</button>
    </div>
  </form>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'

export default {
  name: 'LoginView',
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      loading: false,
      username: '',
      password: '',
      message: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  validations() {
    return {
      username: {required, minLength: minLength(6)},
      password: {required, minLength: minLength(6)}
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    submitLogin() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch("auth/login", formData).then(
        () => {
          this.$router.push({name: 'home'})
        },
        (error) => {
          if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
          }
          this.loading = false;
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так')
        }
      );
      
      // console.log(formData);
      // this.$router.push('/')
    }
  },
  watch: {
    async $route() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
    }
  }
}
</script>