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

// Add custom styling for all toast variants using CSS variables
const getToastClass = (variant: string | undefined): string => {
  switch (variant) {
    case 'success':
      return 'border-[hsl(var(--success-border))] bg-[hsl(var(--success-background))] text-[hsl(var(--success-foreground))] [&_[data-description]]:text-[hsl(var(--success-foreground))]'
    case 'warning':
      return 'border-[hsl(var(--warning-border))] bg-[hsl(var(--warning-background))] text-[hsl(var(--warning-foreground))] [&_[data-description]]:text-[hsl(var(--warning-foreground))]'
    case 'error':
      return 'border-[hsl(var(--error-border))] bg-[hsl(var(--error-background))] text-[hsl(var(--error-foreground))] [&_[data-description]]:text-[hsl(var(--error-foreground))]'
    case 'info':
      return 'border-[hsl(var(--info-border))] bg-[hsl(var(--info-background))] text-[hsl(var(--info-foreground))] [&_[data-description]]:text-[hsl(var(--info-foreground))]'
    default:
      return ''
  }
}
</script>
