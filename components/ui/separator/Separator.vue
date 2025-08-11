<template>
  <div
    :class="[
      'shrink-0 bg-border',
      orientation === 'vertical' ? 'w-px h-6 mx-2' : 'h-px w-full my-2'
    ]"
    role="separator"
    :aria-orientation="orientation"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical' }>(), {
  orientation: 'horizontal'
})
</script>
