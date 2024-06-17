<script setup lang="ts">
import SpinnerSvg from '../icons/SpinnerSvg.vue'
</script>
<template>
  <div class="flex justify-center items-center">
    <div>
      <div role="status">
        <SpinnerSvg />
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="ms-2">Loading...</div>
  </div>
</template>
