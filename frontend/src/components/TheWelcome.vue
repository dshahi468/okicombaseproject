<script setup lang="ts">
import { computed, ref } from 'vue'
import { ValidationHelper } from './helper/ValidationHelper'
import useVuelidate from '@vuelidate/core'
import { ColorHelper } from './helper/ColorHelper'
import SubmitButtonSpinner from './helper/SubmitButtonSpinner.vue'
import { generateClient } from 'aws-amplify/api'
//@ts-ignore
import { createTodo } from '@/graphql/mutations.js'
const client = generateClient()
// import axios from 'axios'
import { authenticationStore } from '@/stores/authentication'
import { signUp } from 'aws-amplify/auth'

const formSubmitFlag = ref<boolean>(false)
const registerData = ref({
  name: '',
  email: '',
  password: ''
})

const rules = computed(() => ValidationHelper.registerValidation)

const validation = ref(useVuelidate(rules, registerData))

const formSubmit = async () => {
  if (!(await validation.value.$validate())) return
  // const formData = new FormData()
  // Object.entries(todoData.value).forEach(([key, value]) => {
  //   formData.set(key, value as string)
  // })
  // formSubmitFlag.value = true
  // await axios
  //   .post('create', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  //   .then((response) => {
  //     formSubmitFlag.value = false
  //     console.log('Response is :', response)
  //   })
  //   .catch((error) => {
  //     formSubmitFlag.value = false
  //     console.log('Error')
  //   })

  // try {
  //   formSubmitFlag.value = true
  //   const newTodo = await client.graphql({
  //     query: createTodo,
  //     variables: { input: todoData.value }
  //   })
  //   todoData.value = { name: '', description: '' }
  //   console.log('New to do is:', newTodo)
  //   formSubmitFlag.value = false
  // } catch (error) {
  //   console.log('Error is:', error)
  //   formSubmitFlag.value = false
  // }
  try {
    const response = await signUp({
      username: registerData.value.email,
      password: registerData.value.password,
      options: {
        userAttributes: {
          name: registerData.value.name,
          email: registerData.value.email,
          'custom:created_method': 'SYSTEMADMIN'
        },
        autoSignIn: false
      }
    })
    console.log('Response is:', response)
  } catch (error) {
    console.log('Error is error:', error)
    throw new Error('Error while registering.')
  }
}

const signout = async () => {
  await authenticationStore().amplifySignout()
}
</script>
<template>
  <div
    class="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <form class="space-y-6" @submit.prevent="formSubmit">
      <div>
        <label
          for="name"
          class="block mb-1 text-sm font-medium"
          :style="{ color: ColorHelper.authenticationCardTextColor }"
          >Name</label
        >
        <input
          type="text"
          name="name"
          v-model="validation.name.$model"
          :class="validation.name.$error ? `is-invalid` : ``"
          class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
          :style="{
            backgroundColor: ColorHelper.authenticationInputFieldBackground,
            color: ColorHelper.authenticationPlaceholderColor
          }"
        />
        <div class="invalid-feedback text-red-800 text-xs mt-1" v-if="validation.name.$error">
          {{ validation.name.$errors[0].$message }}
        </div>
      </div>
      <div>
        <label
          for="description"
          class="block mb-1 text-sm font-medium"
          :style="{ color: ColorHelper.authenticationCardTextColor }"
          >Email</label
        >
        <input
          type="text"
          name="description"
          v-model="validation.email.$model"
          :class="validation.email.$error ? `is-invalid` : ``"
          class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
          :style="{
            backgroundColor: ColorHelper.authenticationInputFieldBackground,
            color: ColorHelper.authenticationPlaceholderColor
          }"
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
          >Password</label
        >
        <input
          type="password"
          name="password"
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
        <span v-else>Submit</span>
      </button>
    </form>

    <button @click="signout" class="text-white">Signout</button>
  </div>
</template>
