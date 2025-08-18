<template>
  <ToastProvider>
    <div v-for="toast in toasts" :key="toast.id">
      <Toast
        :variant="getToastVariant(toast.variant)"
        :class="getToastClass(toast.variant)"
        @openChange="open => !open && removeToast(toast.id)"
      >
        <div class="grid gap-1">
          <ToastTitle v-if="toast.title">
            {{ toast.title }}
          </ToastTitle>
          <ToastDescription v-if="toast.description">
            {{ toast.description }}
          </ToastDescription>
        </div>
        <ToastAction
          v-if="toast.action"
          :alt-text="toast.action.label"
          @click="toast.action.onClick"
        >
          {{ toast.action.label }}
        </ToastAction>
        <ToastClose />
      </Toast>
    </div>
    <ToastViewport />
  </ToastProvider>
</template>

<script setup lang="ts">
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast'
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

// Map custom variants to supported Toast variants
const getToastVariant = (variant: string | undefined): 'default' | 'destructive' => {
  switch (variant) {
    case 'destructive':
      return 'destructive'
    case 'success':
    case 'warning':
    case 'default':
    default:
      return 'default'
  }
}

// Add custom styling for success and warning variants
const getToastClass = (variant: string | undefined): string => {
  switch (variant) {
    case 'success':
      return 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-50'
    case 'warning':
      return 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-50'
    default:
      return ''
  }
}
</script>
