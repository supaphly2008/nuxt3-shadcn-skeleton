<template>
  <NuxtLink
    to="/"
    :class="['flex h-7 w-7 items-center justify-center rounded-md border', klass]"
    aria-label="Home"
  >
    <span class="text-xs font-semibold">NX</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ klass?: string }>()
</script>
