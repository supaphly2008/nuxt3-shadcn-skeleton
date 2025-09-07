<template>
  <div class="space-y-4">
    <!-- extract data from file -->
    <div
      :class="{
        'cursor-not-allowed opacity-30': isDisabled,
        'cursor-pointer': !isDisabled
      }"
      class="flex h-[100px] flex-col items-center justify-center rounded-md border-2 border-gray-600 bg-secondary p-6 text-center transition-colors hover:bg-secondary/80"
      @click="handleExtractClick"
    >
      <div class="text-muted-foreground">
        <p class="flex items-center gap-2 text-sm font-medium">
          <span :class="isExtractingFile ? 'animate-spin' : ''">⌛️</span>
          {{ isExtractingFile ? 'Extracting data...' : 'Click to extract data' }}
        </p>
        <p v-if="file" class="overflow-hidden text-ellipsis text-sm font-semibold text-gray-400">
          {{ file.name }}
        </p>
      </div>
    </div>

    <div class="flex">
      <Button
        @click="$emit('previewForm')"
        class="cursor-pointer disabled:cursor-not-allowed"
        :disabled="!isDataExtracted || !file"
      >
        預覽表格
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'

interface Props {
  file: File | null
  isExtractingFile: boolean
  isDataExtracted: boolean
  isDisabled: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'extractData'): void
  (e: 'previewForm'): void
}>()

const handleExtractClick = () => {
  if (!props.isDisabled) {
    emit('extractData')
  }
}
</script>
