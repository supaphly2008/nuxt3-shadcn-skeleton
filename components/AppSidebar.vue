<script setup lang="ts">
import { computed } from 'vue'

import { useRoute } from '#imports'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Calendar, Home, Search, Settings } from 'lucide-vue-next'

type Item = { label: string; to: `/${string}`; icon?: any }
const items: Item[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Calendar', to: '/calendar', icon: Calendar },
  { label: 'Search', to: '/search', icon: Search },
  { label: 'Settings', to: '/settings', icon: Settings }
]

const route = useRoute()
const isActive = (to: string) => computed(() => route.path === to).value
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>App</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.to">
              <SidebarMenuButton asChild :is-active="isActive(item.to)">
                <NuxtLink :to="item.to" class="flex items-center gap-2">
                  <component :is="item.icon" class="h-4 w-4" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
