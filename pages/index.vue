<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Page Header -->
    <section class="space-y-2">
      <h1 class="text-2xl font-semibold">Contract Processing</h1>
      <p class="text-muted-foreground">Upload and process your contract documents.</p>
    </section>

    <!-- Contract Workflow -->
    <section class="space-y-6">
      <Stepper
        orientation="vertical"
        class="flex w-full flex-col justify-start gap-10"
        v-model="stepIndex"
      >
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

      <Button @click="generateDoc" class="mt-6">Generate Document</Button>
    </section>

    <!-- Dialogs -->
    <FilePreviewDialog v-model:open="isPreviewFileOpen" :file-url="fileUrl" />

    <ContractFormDialog
      v-model:open="isFormOpen"
      :form="form"
      @submit="handleFormSubmit"
      @preview-file="openPreviewDialog"
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
const { form } = useContractForm()
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
  setPreviewFileOpen,
  setFormOpen
} = useContractWorkflow()

// Event Handlers
const handleFileChange = (selectedFile: File) => {
  setFile(selectedFile)
  moveToStep(StepIndexEnum.ExtractData)
}

const extractData = async () => {
  if (stepIndex.value !== StepIndexEnum.ExtractData || !file.value) {
    return
  }

  setExtractionState(true)
  const success = await extractDataFromFile(file.value, form.setValues)
  setExtractionState(false, success)
}

const openPreviewDialog = () => {
  setPreviewFileOpen(true)
}

const openFormDialog = () => {
  setFormOpen(true)
}

const generateDoc = () => {
  generateDocument()
}
</script>
