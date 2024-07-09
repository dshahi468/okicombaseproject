<script setup lang="ts">
import { computed, ref } from 'vue'
import { ColorHelper } from '../helper/ColorHelper'
import { TextHelper } from '../helper/TextHelper'
import { ValidationHelper } from '../helper/ValidationHelper'
//@ts-ignore
import { useVuelidate } from '@vuelidate/core'
import { authenticationStore, type NewPasswordParameters } from '@/stores/authentication'
import { alertStore } from '@/stores/alert'
import router from '@/router'
import SubmitButtonSpinner from '../helper/SubmitButtonSpinner.vue'
import { ErrorHelper } from '../helper/ErrorHelper'

const formSubmitFlag = ref<boolean>(false)
const resetData = ref<NewPasswordParameters>({
  code: '',
  email: '',
  password: ''
})

const rules = computed(() => ValidationHelper.resetValidation)

const validation = ref(useVuelidate(rules, resetData))

const formSubmit = async () => {
  if (!(await validation.value.$validate())) return
  formSubmitFlag.value = true
  const resetMethod =
    import.meta.env.VITE_APPLICATION_BACKEND == 'graphql'
      ? authenticationStore().amplifyResetPassword
      : authenticationStore().resetPasswords
  try {
    await resetMethod(resetData.value).then(() => {
      alertStore().updateAlerts({
        title: 'Success',
        type: 'success',
        message: ErrorHelper.axios.passwordResetSuccess
      })
      formSubmitFlag.value = false
      router.push('/user/login')
    })
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
          {{ TextHelper.resetCardHeader }}
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.resetYourEmail }}</label
          >
          <input
            type="email"
            name="email"
            id="email"
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
            for="verificationpin"
            class="block mb-2 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.resetVerificationPin }}</label
          >
          <input
            type="number"
            name="verificationpin"
            id="verificationpin"
            v-model="validation.code.$model"
            :class="validation.code.$error ? `is-invalid` : ``"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
            :style="{
              backgroundColor: ColorHelper.authenticationInputFieldBackground,
              color: ColorHelper.authenticationPlaceholderColor
            }"
            placeholder="******"
          />
          <div class="invalid-feedback text-red-800 text-xs mt-1" v-if="validation.code.$error">
            {{ validation.code.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.resetNewPassword }}</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            v-model="validation.password.$model"
            :class="validation.password.$error ? `is-invalid` : ``"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
            :style="{
              backgroundColor: ColorHelper.authenticationInputFieldBackground,
              color: ColorHelper.authenticationPlaceholderColor
            }"
          />
          <div class="invalid-feedback text-red-800 text-xs mt-1" v-if="validation.password.$error">
            {{ validation.password.$errors[0].$message }}
          </div>
        </div>
        <button
          type="submit"
          :disabled="formSubmitFlag"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <SubmitButtonSpinner v-if="formSubmitFlag" />
          <span v-else>{{ TextHelper.resetSubmitButtonText }}</span>
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
          <RouterLink to="/user/login" class="text-blue-700 hover:underline dark:text-blue-500">{{
            TextHelper.resetBackLink
          }}</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
