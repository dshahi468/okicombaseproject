<template>
  <div class="h-[100vh] w-full flex justify-center items-center">
    <div
      class="m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Verify Email Address</h5>
        <p class="text-white text-xs">
          Before getting started, could you verify your email address by entering the verification
          pin we just emailed to you? If you didn't receive the email, we will gladly send you
          another.
        </p>
        <div>
          <label
            for="verificationpin"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Verification Pin</label
          >
          <input
            type="number"
            name="verificationpin"
            id="verificationpin"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="******"
            required
          />
        </div>
        <div class="text-end">
          <span class="text-white me-2 text-sm">Didn't get a pin?</span>
          <RouterLink
            to="/user/forgot"
            class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Resend</RouterLink
          >
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
          <RouterLink to="/user/login" class="text-blue-700 hover:underline dark:text-blue-500"
            >Back to login</RouterLink
          >
        </div>
      </form>
    </div>
  </div>
</template>
