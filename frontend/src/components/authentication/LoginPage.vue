<script setup lang="ts">
import { TextHelper } from '@/components/helper/TextHelper'
import { ColorHelper } from '../helper/ColorHelper'
</script>
<template>
  <div class="h-[100vh] w-full flex justify-center items-center">
    <div
      class="m-2 w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:border-gray-700"
      :style="{ backgroundColor: ColorHelper.authenticationCardBackground }"
    >
      <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium" :style="{ color: ColorHelper.authenticationCardTextColor }">
          {{ TextHelper.loginPageCardHeader }}
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.loginYourEmail }}</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
            :style="{
              backgroundColor: ColorHelper.authenticationInputFieldBackground,
              color: ColorHelper.authenticationPlaceholderColor
            }"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium"
            :style="{ color: ColorHelper.authenticationCardTextColor }"
            >{{ TextHelper.loginYourPassword }}</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
            :style="{
              backgroundColor: ColorHelper.authenticationInputFieldBackground,
              color: ColorHelper.authenticationPlaceholderColor
            }"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
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
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{ TextHelper.loginSubmitButtonText }}
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
