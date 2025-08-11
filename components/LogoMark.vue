<template>
  <NuxtLink
    to="/"
    :class="['flex items-center justify-center h-7 w-7 rounded-md border', klass]"
    aria-label="Home"
  >
    <span class="text-xs font-semibold">NX</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ klass?: string }>()
</script>
