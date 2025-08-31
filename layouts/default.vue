<!-- layouts/default.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'

import { useRoute } from '#imports'
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useMediaQuery } from '@vueuse/core'
import ThemeToggle from '~/components/ThemeToggle.vue'

// pick your breakpoint (Tailwind's lg = 1024px)
const isLgUp = useMediaQuery('(min-width: 1024px)')

// control the provider's open state
const open = ref(isLgUp.value)

// when crossing the breakpoint: open on desktop, close on mobile
watch(isLgUp, val => {
  open.value = val // true on >=lg, false on <lg
})

// also close when navigating on mobile
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    if (!isLgUp.value) open.value = false
  }
)

// allow the trigger to toggle this state
const onOpenChange = (val: boolean) => {
  open.value = val
}
</script>

<template>
  <!-- bind the provider to our reactive 'open' -->
  <SidebarProvider :open="open" @update:open="onOpenChange">
    <div class="flex min-h-dvh w-full">
      <AppSidebar />

      <div class="grid min-w-0 flex-1 grid-rows-[auto,1fr]">
        <header
          class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
        >
          <div class="mx-4 flex h-14 items-center gap-3">
            <!-- opens/closes the off-canvas sidebar on mobile -->
            <SidebarTrigger
              class="inline-flex h-9 w-9 items-center justify-center rounded-md border"
            />
            <NuxtLink to="/" class="font-semibold">Nuxt Layout</NuxtLink>
            <div class="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <span class="text-sm text-muted-foreground">demo@site.tld</span>
            </div>
          </div>
        </header>

        <main class="container py-6">
          <slot />
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>
