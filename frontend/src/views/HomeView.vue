<script setup lang="ts">
import AuthenticatedNavbar from '@/components/helper/AuthenticatedNavbar.vue'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <AuthenticatedNavbar />
  <main class="mt-[70px]">
    <TheWelcome />
  </main>
</template>
