<template>
  <div
    class="cursor-pointer rounded-md border-2 border-dashed border-gray-600 bg-secondary p-6 text-center transition-colors hover:bg-secondary/80"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    :class="{ 'border-indigo-500': isDragging }"
    @click="fileInputRef?.click()"
  >
    <input
      ref="fileInputRef"
      type="file"
      accept="application/pdf"
      class="hidden"
      @change="onFileSelect"
    />

    <div v-if="file" class="text-muted-foreground">
      <p class="overflow-hidden text-ellipsis text-sm font-semibold">📄 {{ file.name }}</p>
      <p class="text-xs text-gray-400">{{ (file.size / 1024).toFixed(1) }} KB</p>
    </div>

    <div v-else class="text-muted-foreground">
      <p class="text-lg font-medium">📎 Drag & drop your PDF</p>
      <p class="text-sm">or click to select</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue'

const file = ref<File | null>(null)
const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: 'fileSelected', file: File): void
}>()

const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selected = target.files?.[0]
  if (selected && selected.type === 'application/pdf') {
    file.value = selected
    emit('fileSelected', selected)
  }
}

const onDrop = (e: DragEvent) => {
  const droppedFile = e.dataTransfer?.files?.[0]
  if (droppedFile && droppedFile.type === 'application/pdf') {
    file.value = droppedFile
    emit('fileSelected', droppedFile)
  }
  isDragging.value = false
}

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}
</script>
