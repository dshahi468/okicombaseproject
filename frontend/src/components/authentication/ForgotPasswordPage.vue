<script setup lang="ts">
import { computed, ref } from 'vue'
import { ColorHelper } from '../helper/ColorHelper'
import { TextHelper } from '../helper/TextHelper'
import { ValidationHelper } from '../helper/ValidationHelper'
//@ts-ignore
import { useVuelidate } from '@vuelidate/core'
import { authenticationStore } from '@/stores/authentication'
import router from '@/router'
import SubmitButtonSpinner from '../helper/SubmitButtonSpinner.vue'

const formSubmitFlag = ref<boolean>(false)
const forgotData = ref({
  email: ''
})

const rules = computed(() => ValidationHelper.forgotValidation)

const validation = ref(useVuelidate(rules, forgotData))

const formSubmit = async () => {
  if (!(await validation.value.$validate())) return
  formSubmitFlag.value = true
  const forgotMethod =
    import.meta.env.VITE_APPLICATION_BACKEND == 'graphql'
      ? authenticationStore().amplifyForgotPassword
      : authenticationStore().forgot
  await forgotMethod(forgotData.value.email)
    .then(() => {
      formSubmitFlag.value = false
      router.push('/user/resetpassword')
    })
    .catch(() => {
      formSubmitFlag.value = false
    })
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
          {{ TextHelper.forgotCardHeader }}
        </h5>
        <p class="text-xs" :style="{ color: ColorHelper.authenticationCardTextColor }">
          {{ TextHelper.forgotNote }}
        </p>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.forgotYourEmail }}</label
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

        <button
          type="submit"
          :disabled="formSubmitFlag"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <SubmitButtonSpinner v-if="formSubmitFlag" />
          <span v-else>{{ TextHelper.forgotSubmitButtonText }}</span>
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
          <RouterLink to="/user/login" class="text-blue-700 hover:underline dark:text-blue-500">{{
            TextHelper.forgotBackLink
          }}</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
