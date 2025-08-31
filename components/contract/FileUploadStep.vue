<template>
  <div class="space-y-4">
    <!-- file upload -->
    <div class="pa-4">
      <FileUploader @fileSelected="handleFileChange" />
    </div>

    <div class="flex">
      <Button
        @click="$emit('previewFile')"
        :disabled="isExtractingFile || !file"
        class="cursor-pointer disabled:cursor-not-allowed"
      >
        預覽檔案
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import FileUploader from '~/components/FileUploader.vue'

interface Props {
  file: File | null
  isExtractingFile: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'fileSelected', file: File): void
  (e: 'previewFile'): void
}>()

const handleFileChange = (selectedFile: File) => {
  emit('fileSelected', selectedFile)
}
</script>
