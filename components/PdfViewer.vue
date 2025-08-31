<template>
  <client-only>
    <div
      class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      <!-- Zoom Controls -->
      <div class="absolute right-4 top-4 z-10 flex items-center gap-2">
        <button
          class="flex h-8 w-8 items-center justify-center rounded bg-gray-700 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          @click="zoomOut"
          :disabled="scale <= 0.5"
        >
          <ZoomOut class="h-4 w-4" />
        </button>
        <span class="min-w-[60px] text-center text-sm text-white"
          >{{ Math.round(scale * 100) }}%</span
        >
        <button
          class="flex h-8 w-8 items-center justify-center rounded bg-gray-700 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          @click="zoomIn"
          :disabled="scale >= 2.5"
        >
          <ZoomIn class="h-4 w-4" />
        </button>
      </div>

      <!-- PDF Container with Drag -->
      <div
        ref="pdfContainer"
        class="relative flex h-full w-full items-center justify-center overflow-hidden rounded p-4"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @wheel="onWheel"
        @touchstart="startTouchDrag"
        @touchmove="onTouchDrag"
        @touchend="stopTouchDrag"
      >
        <div
          ref="pdfWrapper"
          class="relative transform transition-transform duration-100"
          :style="{ transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${scale})` }"
        >
          <PdfEmbed
            ref="pdfRef"
            :scale="2.0"
            :source="source"
            :page="currentPage"
            @rendered="onPdfRendered"
          />
        </div>
      </div>

      <!-- Pagination Controls -->
      <div
        class="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center space-x-3 rounded-lg bg-black/50 px-4 py-2 backdrop-blur-sm"
      >
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md bg-gray-700 text-white transition-all hover:scale-105 hover:bg-gray-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          @click="prevPage"
          :disabled="currentPage <= 1"
          title="Previous page"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>

        <div class="flex items-center space-x-2 px-3">
          <span class="text-sm font-medium text-white">{{ currentPage }}</span>
          <span class="text-gray-400">/</span>
          <span class="text-sm text-gray-300">{{ totalPages }}</span>
        </div>

        <button
          class="flex h-8 w-8 items-center justify-center rounded-md bg-gray-700 text-white transition-all hover:scale-105 hover:bg-gray-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          title="Next page"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-vue-next'
import PdfEmbed from 'vue-pdf-embed'

const props = defineProps<{
  source: string
}>()

const pdfRef = ref<InstanceType<typeof PdfEmbed> | null>(null)
const pdfContainer = ref<HTMLElement | null>(null)
const pdfWrapper = ref<HTMLElement | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const scale = ref(1.5) // Start with larger scale for better desktop visibility

// Drag functionality
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })

// Touch functionality
const isTouchDragging = ref(false)
const touchStart = ref({ x: 0, y: 0 })
const lastTouchDistance = ref(0)

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
  // Don't override user's zoom preference
  // Just update total pages
}

const onPdfRendered = () => {
  nextTick(() => {
    updateTotalPages()
  })
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// Zoom functions
const zoomIn = () => {
  console.log('Zoom in clicked, current scale:', scale.value)
  if (scale.value < 2.5) {
    scale.value = Math.min(scale.value + 0.25, 2.5)
    console.log('New scale:', scale.value)
  }
}

const zoomOut = () => {
  console.log('Zoom out clicked, current scale:', scale.value)
  if (scale.value > 0.5) {
    scale.value = Math.max(scale.value - 0.25, 0.5)
    console.log('New scale:', scale.value)
  }
}

// Drag functions
const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  dragStart.value = { x: event.clientX - dragOffset.value.x, y: event.clientY - dragOffset.value.y }
  if (pdfContainer.value) {
    pdfContainer.value.style.cursor = 'grabbing'
  }
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return

  dragOffset.value = {
    x: event.clientX - dragStart.value.x,
    y: event.clientY - dragStart.value.y
  }
}

const stopDrag = () => {
  isDragging.value = false
  if (pdfContainer.value) {
    pdfContainer.value.style.cursor = 'grab'
  }
}

// Wheel zoom
const onWheel = (event: WheelEvent) => {
  event.preventDefault()
  if (event.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

// Touch drag functions
const startTouchDrag = (event: TouchEvent) => {
  event.preventDefault()
  if (event.touches.length === 1) {
    // Single touch - start dragging
    isTouchDragging.value = true
    const touch = event.touches[0]
    touchStart.value = {
      x: touch.clientX - dragOffset.value.x,
      y: touch.clientY - dragOffset.value.y
    }
  } else if (event.touches.length === 2) {
    // Two touches - prepare for pinch zoom
    const touch1 = event.touches[0]
    const touch2 = event.touches[1]
    lastTouchDistance.value = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
    )
  }
}

const onTouchDrag = (event: TouchEvent) => {
  event.preventDefault()

  if (event.touches.length === 1 && isTouchDragging.value) {
    // Single touch - continue dragging
    const touch = event.touches[0]
    dragOffset.value = {
      x: touch.clientX - touchStart.value.x,
      y: touch.clientY - touchStart.value.y
    }
  } else if (event.touches.length === 2) {
    // Two touches - pinch zoom
    const touch1 = event.touches[0]
    const touch2 = event.touches[1]
    const currentDistance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
    )

    if (lastTouchDistance.value > 0) {
      const scaleChange = currentDistance / lastTouchDistance.value
      const newScale = scale.value * scaleChange
      scale.value = Math.max(0.5, Math.min(2.5, newScale))
    }

    lastTouchDistance.value = currentDistance
  }
}

const stopTouchDrag = (event: TouchEvent) => {
  event.preventDefault()
  isTouchDragging.value = false
  lastTouchDistance.value = 0
}

// When a new file is selected, reset page & reload
watch(
  () => props.source,
  () => {
    currentPage.value = 1
    scale.value = 1.5 // Reset scale for new PDF
    dragOffset.value = { x: 0, y: 0 } // Reset drag position
  }
)

onMounted(() => {
  // Add resize listener to recalculate scale when window resizes
  window.addEventListener('resize', () => {
    // Only update pages, don't change zoom
    updateTotalPages()
  })
})

onUnmounted(() => {
  // Clean up resize listener
  window.removeEventListener('resize', syncCanvasSize)
})
</script>
