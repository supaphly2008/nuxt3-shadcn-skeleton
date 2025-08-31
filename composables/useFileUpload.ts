import { ref, onUnmounted, readonly } from 'vue'
import { useToast } from '@/composables/useToast'

export function useFileUpload() {
  const file = ref<File | null>(null)
  const fileUrl = ref<string | null>(null)
  const isExtractingFile = ref(false)
  const isDataExtracted = ref(false)
  
  const { toast } = useToast()

  const setFile = (selectedFile: File | null) => {
    // Clean up previous file URL
    if (fileUrl.value) {
      URL.revokeObjectURL(fileUrl.value)
    }

    file.value = selectedFile
    fileUrl.value = selectedFile ? URL.createObjectURL(selectedFile) : null
    
    // Reset extraction state when new file is set
    isDataExtracted.value = false
  }

  const clearFile = () => {
    setFile(null)
  }

  const setExtractionState = (extracting: boolean, extracted: boolean = false) => {
    isExtractingFile.value = extracting
    if (extracted) {
      isDataExtracted.value = true
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (fileUrl.value) {
      URL.revokeObjectURL(fileUrl.value)
    }
  })

  return {
    file: readonly(file),
    fileUrl: readonly(fileUrl),
    isExtractingFile: readonly(isExtractingFile),
    isDataExtracted: readonly(isDataExtracted),
    setFile,
    clearFile,
    setExtractionState
  }
}
