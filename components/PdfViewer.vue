<template>
  <client-only>
    <div class="flex flex-col items-center overflow-auto bg-black">
      <div class="w-full overflow-auto rounded">
        <PdfEmbed
          ref="pdfRef"
          :scale="1.0"
          :source="source"
          :page="currentPage"
          @rendered="onPdfRendered"
        />
      </div>

      <!-- Pagination Controls -->
      <div class="mt-4 flex items-center space-x-4">
        <button
          class="cursor-pointer rounded bg-gray-700 px-3 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50"
          @click="prevPage"
          :disabled="currentPage <= 1"
        >
          ⬅ 上一頁
        </button>

        <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>

        <button
          class="cursor-pointer rounded bg-gray-700 px-3 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50"
          @click="nextPage"
          :disabled="currentPage >= totalPages"
        >
          下一頁 ➡
        </button>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import PdfEmbed from 'vue-pdf-embed'

const props = defineProps<{
  source: string
}>()

const pdfRef = ref<InstanceType<typeof PdfEmbed> | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)

const updateTotalPages = async () => {
  const doc = pdfRef.value?.doc
  if (doc && doc._pdfInfo?.numPages) {
    totalPages.value = doc._pdfInfo.numPages
    console.log('PDF Loaded: total pages =', totalPages.value)
  } else {
    console.warn('No doc found in pdfRef')
    totalPages.value = 1
  }
}

const syncCanvasSize = () => {
  const canvasEl = pdfRef.value?.$el?.querySelector('canvas') as HTMLCanvasElement

  if (canvasEl) {
    const width = canvasEl.width
    const height = canvasEl.height

    canvasEl.style.width = `${width / 2}px`
    canvasEl.style.height = `${height / 2}px`
  } else {
    console.warn('Canvas element not found')
  }
}

const onPdfRendered = () => {
  nextTick(() => {
    updateTotalPages()
    syncCanvasSize()
  })
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// When a new file is selected, reset page & reload
watch(
  () => props.source,
  () => {
    currentPage.value = 1
  }
)

onMounted(() => {
  syncCanvasSize()
})
</script>
