import { reactive, ref } from 'vue'

export interface ToastItem {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastState {
  toasts: ToastItem[]
}

const state = reactive<ToastState>({
  toasts: []
})

let toastIdCounter = 0

export const useToast = () => {
  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${++toastIdCounter}`
    const newToast: ToastItem = {
      id,
      duration: 3000, // Default 3 seconds
      variant: 'default',
      ...toast
    }

    state.toasts.push(newToast)

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = state.toasts.findIndex(toast => toast.id === id)
    if (index > -1) {
      state.toasts.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    state.toasts.length = 0
  }

  // Convenience methods
  const toast = {
    success: (title: string, description?: string, options?: Partial<ToastItem>) =>
      addToast({ title, description, variant: 'success', ...options }),

    error: (title: string, description?: string, options?: Partial<ToastItem>) =>
      addToast({ title, description, variant: 'destructive', ...options }),

    warning: (title: string, description?: string, options?: Partial<ToastItem>) =>
      addToast({ title, description, variant: 'warning', ...options }),

    info: (title: string, description?: string, options?: Partial<ToastItem>) =>
      addToast({ title, description, variant: 'default', ...options }),

    custom: (toast: Omit<ToastItem, 'id'>) => addToast(toast)
  }

  return {
    toasts: readonly(ref(state.toasts)),
    addToast,
    removeToast,
    clearAllToasts,
    toast
  }
}
