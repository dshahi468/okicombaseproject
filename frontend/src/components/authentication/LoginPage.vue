<script setup lang="ts">
import { TextHelper } from '@/components/helper/TextHelper'
import { ColorHelper } from '../helper/ColorHelper'
import { useVuelidate } from '@vuelidate/core'
import { ValidationHelper } from '../helper/ValidationHelper'
import SubmitButtonSpinner from '../helper/SubmitButtonSpinner.vue'
import { authenticationStore } from '@/stores/authentication'
import { computed, ref } from 'vue'
import { alertStore } from '@/stores/alert'

const formSubmitFlag = ref<boolean>(false)
const loginData = ref({
  email: '',
  password: '',
  rememberMe: false
})

const rules = computed(() => ValidationHelper.loginValidation)

const validation = ref(useVuelidate(rules, loginData))

const formSubmit = async () => {
  if (!(await validation.value.$validate())) return
  formSubmitFlag.value = true
  const formData = new FormData()
  Object.entries(loginData.value).forEach(([key, value]) => {
    formData.set(key, value as string)
  })
  try {
    const response = await authenticationStore().login(formData)
  } catch (error) {
    formSubmitFlag.value = false
  }
}
</script>
<template>
  <div class="h-[100vh] w-full flex justify-center items-center">
    <div
      class="m-2 w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:border-gray-700"
      :style="{ backgroundColor: ColorHelper.authenticationCardBackground }"
    >
      <form class="space-y-6" @submit.prevent="formSubmit">
        <h5 class="text-xl font-medium" :style="{ color: ColorHelper.authenticationCardTextColor }">
          {{ TextHelper.loginPageCardHeader }}
        </h5>
        <div>
          <label
            for="email"
            class="block mb-1 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.loginYourEmail }}</label
          >
          <input
            type="text"
            name="email"
            v-model="validation.email.$model"
            :class="validation.email.$error ? `is-invalid` : ``"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
            :style="{
              backgroundColor: ColorHelper.authenticationInputFieldBackground,
              color: ColorHelper.authenticationPlaceholderColor
            }"
            placeholder="name@company.com"
          />
          <div class="invalid-feedback text-red-800 text-xs mt-1" v-if="validation.email.$error">
            {{ validation.email.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label
            for="password"
            class="block mb-1 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.loginYourPassword }}</label
          >
          <input
            type="password"
            name="password"
            id="password"
            v-model="validation.password.$model"
            :class="validation.password.$error ? `is-invalid` : ``"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
            placeholder="••••••••"
            :style="{
              backgroundColor: ColorHelper.authenticationInputFieldBackground,
              color: ColorHelper.authenticationPlaceholderColor
            }"
          />
          <div class="invalid-feedback text-red-800 text-xs mt-1" v-if="validation.password.$error">
            {{ validation.password.$errors[0].$message }}
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ms-2 text-sm font-medium"
              :style="{ color: ColorHelper.authenticationCardTextColor }"
              >{{ TextHelper.loginRememberMe }}</label
            >
          </div>
          <RouterLink
            to="/user/forgot"
            class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >{{ TextHelper.loginForgotPassword }}</RouterLink
          >
        </div>
        <button
          type="submit"
          :disabled="formSubmitFlag"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <SubmitButtonSpinner v-if="formSubmitFlag" />
          <span v-else>{{ TextHelper.loginSubmitButtonText }}</span>
        </button>
        <div
          class="text-sm font-medium"
          :style="{ color: ColorHelper.authenticationCardTextColor }"
        >
          {{ TextHelper.loginNotRegistered }}
          <RouterLink
            to="/user/register"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >{{ TextHelper.loginCreateAccount }}</RouterLink
          >
        </div>
      </form>
    </div>
  </div>
</template>
