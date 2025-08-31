import { computed, readonly, ref } from 'vue'

import { useToast } from '@/composables/useToast'
import type { ContractFormData, GenerateDocResponse } from '~/types/contract'
import { extractPdfData } from '~/utils/api/pdf'

// Enums and Types
export enum StepIndexEnum {
  UploadFile = 1,
  ExtractData = 2,
  ReviewAndSubmit = 3
}

export function useContractWorkflow() {
  const stepIndex = ref(StepIndexEnum.UploadFile)
  const isPreviewFileOpen = ref(false)
  const isFormOpen = ref(false)

  const { toast } = useToast()

  const moveToStep = (step: StepIndexEnum) => {
    stepIndex.value = step
  }

  const nextStep = () => {
    if (stepIndex.value < StepIndexEnum.ReviewAndSubmit) {
      stepIndex.value++
    }
  }

  const extractDataFromFile = async (
    file: File,
    updateFormData: (data: Partial<ContractFormData>) => void
  ) => {
    try {
      const { data, error: uploadError } = await extractPdfData({ file })

      if (uploadError.value) {
        toast.error('Failed to extract data from file')
        return false
      } else if (data.value) {
        toast.success('Data extracted successfully!')
        updateFormData(data.value)
        nextStep()
        return true
      }
      return false
    } catch (err) {
      toast.error('Failed to extract data from file')
      console.error('Extraction error:', err)
      return false
    }
  }

  const generateDocument = async () => {
    try {
      const { data } = await useFetch<GenerateDocResponse>('http://localhost:3001/generate-doc', {
        method: 'POST',
        body: {
          // TODO: Dummy data for demonstration
          invoiceNo: 'TG25014',
          date: 'MAY.14.2025',
          marks: 'N/M',
          desc: 'Your product description here...'
        }
      })

      if (data.value?.downloadUrl) {
        window.open(`http://localhost:3001${data.value.downloadUrl}`, '_blank')
        toast.success('Document generated successfully!')
        return true
      }
      return false
    } catch (err) {
      console.error('Failed to generate document:', err)
      toast.error('Failed to generate document')
      return false
    }
  }

  const handleFormSubmit = (values: ContractFormData) => {
    console.log('Form submitted:', values)
    toast.success('Contract details saved successfully!')
    isFormOpen.value = false
    // TODO: Add your form submission logic here
  }

  const openPreviewDialog = () => {
    isPreviewFileOpen.value = true
  }

  return {
    stepIndex: readonly(stepIndex),
    isPreviewFileOpen: computed({
      get: () => isPreviewFileOpen.value,
      set: (value: boolean) => (isPreviewFileOpen.value = value)
    }),
    isFormOpen: computed({
      get: () => isFormOpen.value,
      set: (value: boolean) => (isFormOpen.value = value)
    }),
    moveToStep,
    nextStep,
    extractDataFromFile,
    generateDocument,
    handleFormSubmit,
    openPreviewDialog,
    setPreviewFileOpen: (open: boolean) => (isPreviewFileOpen.value = open),
    setFormOpen: (open: boolean) => (isFormOpen.value = open)
  }
}
