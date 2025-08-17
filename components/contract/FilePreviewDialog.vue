<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-screen h-full rounded-none md:h-[90%] md:w-[800px]">
      <div class="relative flex h-full w-full flex-col overflow-hidden py-4">
        <div v-if="!fileUrl" class="flex h-full items-center justify-center text-muted-foreground">
          No file to preview
        </div>
        <PdfViewer v-else :source="fileUrl" />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface Props {
  fileUrl: string | null
}

defineProps<Props>()

const open = defineModel<boolean>('open', { required: true })
</script>
