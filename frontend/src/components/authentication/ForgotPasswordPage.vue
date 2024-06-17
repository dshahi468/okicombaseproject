<script setup lang="ts">
import { TextHelper } from '../helper/TextHelper'
</script>
<template>
  <div class="h-[100vh] w-full flex justify-center items-center">
    <div
      class="m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          {{ TextHelper.forgotCardHeader }}
        </h5>
        <p class="text-white text-xs">
          {{ TextHelper.forgotNote }}
        </p>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
            TextHelper.forgotYourEmail
          }}</label>
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{ TextHelper.forgotSubmitButtonText }}
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
