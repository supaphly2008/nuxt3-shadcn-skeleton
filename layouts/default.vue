<template>
  <!-- 2-column on lg+: [sidebar | main]; single-column on small -->
  <div class="min-h-dvh bg-background text-foreground lg:grid lg:grid-cols-[16rem,1fr]">
    <!-- Sidebar (persistent on lg+) -->
    <aside class="hidden lg:flex lg:flex-col lg:border-r lg:p-4">
      <div class="flex items-center gap-2">
        <LogoMark />
        <span class="font-semibold">Nuxt Layout</span>
      </div>

      <nav class="mt-6 space-y-1">
        <NuxtLink
          v-for="item in menu"
          :key="item.to"
          :to="item.to"
          class="block rounded-md px-3 py-2 text-sm hover:bg-muted"
          :class="isActive(item.to) ? 'bg-muted font-medium' : 'text-muted-foreground'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Right column: header + page content -->
    <div class="grid grid-rows-[auto,1fr]">
      <!-- Header -->
      <header
        class="border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div class="mx-4 flex h-14 items-center gap-3">
          <!-- Drawer trigger (mobile only) -->
          <button
            class="inline-flex h-9 w-9 items-center justify-center rounded-md border lg:hidden"
            aria-label="Open menu"
            @click="open = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <!-- Brand (when sidebar is hidden) -->
          <LogoMark class="lg:hidden" />
          <NuxtLink to="/" class="font-semibold lg:hidden">Nuxt Layout</NuxtLink>

          <div class="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <span class="text-sm text-muted-foreground">demo@site.tld</span>
          </div>
        </div>
      </header>

      <!-- Drawer panel (mobile) -->
      <transition name="fade">
        <div
          v-if="open"
          class="fixed inset-0 z-40 bg-black/40 lg:hidden"
          @click.self="open = false"
        >
          <aside class="absolute inset-y-0 left-0 w-80 bg-background border-r p-4 shadow-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <LogoMark />
                <span class="font-semibold">Nuxt Layout</span>
              </div>
              <button
                class="h-8 w-8 inline-flex items-center justify-center rounded-md border"
                @click="open = false"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <nav class="mt-6 space-y-1">
              <NuxtLink
                v-for="item in menu"
                :key="item.to"
                :to="item.to"
                class="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                :class="isActive(item.to) ? 'bg-muted font-medium' : 'text-muted-foreground'"
                @click="open = false"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </aside>
        </div>
      </transition>

      <!-- Main -->
      <main class="container py-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { useRoute } from '#imports'
import LogoMark from '~/components/LogoMark.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'

type MenuItem = { label: string; to: `/${string}` }
const menu = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Reports', to: '/reports' },
  { label: 'Settings', to: '/settings' }
] as const satisfies readonly MenuItem[]

const route = useRoute()
const open = ref(false)
const isActive = (to: string) => computed(() => route.path === to).value

// Auto-close drawer when viewport becomes lg+ OR when shrinking below lg
const query = '(min-width: 1024px)' // Tailwind's lg breakpoint
let mql: MediaQueryList

function handleChange(e: MediaQueryListEvent | MediaQueryList) {
  // If we cross the breakpoint either way, ensure the overlay drawer is closed.
  // (On lg+ we have the persistent sidebar; on <lg the drawer should be closed by default.)
  if ('matches' in e ? e.matches : (e as MediaQueryList).matches) {
    open.value = false
  } else {
    open.value = false
  }
}

onMounted(() => {
  mql = window.matchMedia(query)
  // sync once on mount
  handleChange(mql)
  // listen for viewport changes
  const listener = (ev: MediaQueryListEvent) => handleChange(ev)
  mql.addEventListener ? mql.addEventListener('change', listener) : mql.addListener(listener)
  // cleanup
  onBeforeUnmount(() => {
    mql.removeEventListener
      ? mql.removeEventListener('change', listener)
      : mql.removeListener(listener)
  })
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
