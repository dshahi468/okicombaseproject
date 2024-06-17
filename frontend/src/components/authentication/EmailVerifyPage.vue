<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { ColorHelper } from '../helper/ColorHelper'
import { TextHelper } from '../helper/TextHelper'
import { ErrorHelper } from '../helper/ErrorHelper'
import { ValidationHelper } from '../helper/ValidationHelper'
//@ts-ignore
import { useVuelidate } from '@vuelidate/core'
import { authenticationStore } from '@/stores/authentication'
import { useRoute } from 'vue-router'
import router from '@/router'
import { alertStore } from '@/stores/alert'
import SubmitButtonSpinner from '../helper/SubmitButtonSpinner.vue'

const formSubmitFlag = ref<boolean>(false)
const resendPinFlag = ref<boolean>(false)
const minutes = ref(2)
const seconds = ref(0)
let timeoutId: ReturnType<typeof setTimeout>

const route = useRoute()

const verifyData = ref({
  email: route.params.email,
  verificationPin: ''
})

const rules = computed(() => ValidationHelper.emailVerificationValidation)

const validation = ref(useVuelidate(rules, verifyData))

const formSubmit = async () => {
  if (!(await validation.value.$validate())) return
  formSubmitFlag.value = true
  const formData = new FormData()
  Object.entries(verifyData.value).forEach(([key, value]) => {
    formData.set(key, value as string)
  })
  try {
    const response = await authenticationStore().emailverify(formData)
    formSubmitFlag.value = false
    alertStore().updateAlerts({
      title: 'Success',
      type: 'success',
      message: ErrorHelper.axios.emailVerified
    })
    router.push('/user/login')
  } catch (error) {
    formSubmitFlag.value = false
  }
}

const countdown = () => {
  timeoutId = setTimeout(() => {
    if (minutes.value === 0 && seconds.value === 0) {
      resendPinFlag.value = false
      clearTimeout(timeoutId)
    }
    if (seconds.value === 0) {
      minutes.value--
      seconds.value = 59
    } else {
      seconds.value--
    }
    countdown()
  }, 1000)
}

onBeforeUnmount(() => {
  clearTimeout(timeoutId)
})

const resendPin = async () => {
  try {
    resendPinFlag.value = true
    countdown()
    const formData = new FormData()
    formData.set('email', route.params.email as string)
    const response = await authenticationStore().resentPin(formData)
    if (response) {
      alertStore().updateAlerts({
        title: 'Success',
        type: 'success',
        message: 'Email verification pin has been resend.'
      })
      clearTimeout(timeoutId)
      minutes.value = 2
      seconds.value = 0
      resendPinFlag.value = false
      formSubmitFlag.value = false
    }
  } catch (error) {
    resendPinFlag.value = false
    formSubmitFlag.value = false
  }
}

const formatTime = (value: number) => {
  return String(value).padStart(2, '0')
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
          {{ TextHelper.verificationCardHeader }}
        </h5>
        <p class="text-xs" :style="{ color: ColorHelper.authenticationCardTextColor }">
          {{ TextHelper.verificationNote }}
        </p>
        <div>
          <label
            for="verificationpin"
            class="block mb-1 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.verificationVerificationPin }}</label
          >
          <input
            type="number"
            name="verificationpin"
            id="verificationpin"
            v-model="validation.verificationPin.$model"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
            :style="{
              backgroundColor: ColorHelper.authenticationInputFieldBackground,
              color: ColorHelper.authenticationPlaceholderColor
            }"
            placeholder="******"
          />
          <div
            class="invalid-feedback text-red-800 text-xs mt-1"
            v-if="validation.verificationPin.$error"
          >
            {{ validation.verificationPin.$errors[0].$message }}
          </div>
        </div>
        <div class="text-end" v-if="!resendPinFlag">
          <span class="me-2 text-sm" :style="{ color: ColorHelper.authenticationCardTextColor }">{{
            TextHelper.verificationNoPin
          }}</span>
          <a
            class="cursor-pointer ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            @click.prevent="resendPin"
            >{{ TextHelper.verificationResend }}</a
          >
        </div>
        <div class="text-end" v-else :style="{ color: ColorHelper.authenticationCardTextColor }">
          {{ formatTime(minutes) }}:{{ formatTime(seconds) }}
        </div>
        <button
          type="submit"
          :disabled="formSubmitFlag"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <SubmitButtonSpinner v-if="formSubmitFlag" />
          <span v-else>{{ TextHelper.verificationSubmitButonText }}</span>
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
          <RouterLink to="/user/login" class="text-blue-700 hover:underline dark:text-blue-500">{{
            TextHelper.verificationBackLink
          }}</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
