<template>
  <ClientOnly>
    <button
      class="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm hover:bg-muted"
      @click="cycle"
    >
      <span v-if="value === 'light'">🌞</span>
      <span v-else-if="value === 'dark'">🌙</span>
      <span v-else>🖥️</span>
      <span class="sr-only">Toggle theme</span>
    </button>
    <template #fallback>
      <button
        class="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm hover:bg-muted"
      >
        <span>🖥️</span>
        <span class="sr-only">Toggle theme</span>
      </button>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useColorMode } from '#imports'

type Mode = 'light' | 'dark' | 'system'
const mode = useColorMode()
const order: Mode[] = ['light', 'dark', 'system']
const value = computed<Mode>({
  get: () => (mode.preference as Mode) ?? 'system',
  set: v => (mode.preference = v)
})
function cycle() {
  const i = order.indexOf(value.value)
  value.value = order[(i + 1) % order.length]
}
</script>
