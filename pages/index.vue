<template>
  <div class="mx-auto max-w-4xl space-y-8">
    <!-- Minimal Page Header -->
    <section class="space-y-4">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold">Contract Processing</h1>
        <p class="text-muted-foreground">
          Upload and process your contract documents with our intelligent data extraction system.
        </p>
      </div>
    </section>

    <!-- Minimal Workflow Section -->
    <section>
      <div class="rounded-xl border bg-card shadow-sm">
        <div class="p-6">
          <Stepper orientation="vertical" class="flex w-full flex-col gap-8" v-model="stepIndex">
            <!-- Upload File Step -->
            <ContractStepperItem
              :step="StepIndexEnum.UploadFile"
              title="Upload File"
              description="Click to upload a PDF file containing the contract details. We will extract the data for you."
            >
              <FileUploadStep
                :file="file"
                :is-extracting-file="isExtractingFile"
                @file-selected="handleFileChange"
                @preview-file="openPreviewDialog"
              />
            </ContractStepperItem>

            <!-- Extract Data Step -->
            <ContractStepperItem
              :step="StepIndexEnum.ExtractData"
              title="Extract Data"
              description="Click to extract data from the uploaded file."
            >
              <DataExtractionStep
                :file="file"
                :is-extracting-file="isExtractingFile"
                :is-data-extracted="isDataExtracted"
                :is-disabled="stepIndex === StepIndexEnum.UploadFile"
                @extract-data="extractData"
                @preview-form="openFormDialog"
              />
            </ContractStepperItem>

            <!-- Submit Step -->
            <ContractStepperItem
              :step="StepIndexEnum.ReviewAndSubmit"
              title="Submit"
              description="Submit the contract details after reviewing the extracted data."
              :show-separator="false"
            />
          </Stepper>
        </div>

        <!-- Minimal Action Button -->
        <div class="border-t px-6 py-4">
          <div class="flex justify-center">
            <Button
              @click="generateDoc"
              class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold shadow-md transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-purple-700"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Generate Document
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Dialogs -->
    <FilePreviewDialog v-model:open="isPreviewFileOpen" :file-url="fileUrl" />

    <ContractFormDialog
      v-model:open="isFormOpen"
      :form="form"
      @submit="onHandleFormSubmit"
      @preview-file="openPreviewDialog"
      @close="closeFormDialog"
    />
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Stepper } from '@/components/ui/stepper'
import { useContractForm } from '@/composables/useContractForm'
import { useContractWorkflow } from '@/composables/useContractWorkflow'
import { StepIndexEnum } from '@/composables/useContractWorkflow'
import { useFileUpload } from '@/composables/useFileUpload'
import ContractFormDialog from '~/components/contract/ContractFormDialog.vue'
import ContractStepperItem from '~/components/contract/ContractStepperItem.vue'
import DataExtractionStep from '~/components/contract/DataExtractionStep.vue'
import FilePreviewDialog from '~/components/contract/FilePreviewDialog.vue'
import FileUploadStep from '~/components/contract/FileUploadStep.vue'

// Composables
const { form, updateFormData } = useContractForm()
const formData = ref({})
const { file, fileUrl, isExtractingFile, isDataExtracted, setFile, setExtractionState } =
  useFileUpload()
const {
  stepIndex,
  isPreviewFileOpen,
  isFormOpen,
  moveToStep,
  extractDataFromFile,
  generateDocument,
  handleFormSubmit,
  closeFormDialog,
  setPreviewFileOpen,
  setFormOpen
} = useContractWorkflow()

// Event Handlers
const handleFileChange = (selectedFile: File) => {
  setFile(selectedFile)
  // Clear previous form data when starting with a new file
  formData.value = {}
  moveToStep(StepIndexEnum.ExtractData)
}

// Extract data from the file
const extractData = async () => {
  if (stepIndex.value !== StepIndexEnum.ExtractData || !file.value) {
    return
  }

  setExtractionState(true)
  // callback function to store the extracted data in formData upon success
  const success = await extractDataFromFile(file.value, data => {
    console.log('data', data)
    // Merge extracted data with existing stored data (preserve manual edits)
    formData.value = { ...formData.value, ...data }
    console.log('Extracted data:', formData.value)
    // Also update the form
    updateFormData(formData.value)
  })
  setExtractionState(false, success)
}

const openPreviewDialog = () => {
  setPreviewFileOpen(true)
}

const openFormDialog = () => {
  // Populate form with stored form data if available
  if (Object.keys(formData.value).length > 0) {
    updateFormData(formData.value)
  }
  setFormOpen(true)
  console.log('Opening form with stored data:', formData.value)
}

const generateDoc = () => {
  generateDocument()
}

// Custom form submit handler that updates stored form data
const onHandleFormSubmit = (values: any) => {
  // Update the stored form data with the submitted values
  formData.value = { ...values }
  console.log('Form submitted, updating stored data:', formData.value)

  // Call the workflow's form submit handler
  handleFormSubmit(values)
}

// Function to clear stored form data (useful for resetting)
const clearStoredData = () => {
  formData.value = {}
  form.resetForm()
}
</script>
