<script setup lang="ts">
import { RouterView } from 'vue-router'
import BlankLayoutNavbar from '../helper/BlankLayoutNavbar.vue'
</script>
<template>
  <div>
    <BlankLayoutNavbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
