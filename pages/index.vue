<template>
  <div class="mx-auto max-w-4xl">
    <Stepper
      orientation="vertical"
      class="flex w-full flex-col justify-start gap-10"
      v-model="stepIndex"
    >
      <StepperItem class="relative flex w-full items-start gap-6" :step="1" v-slot="{ state }">
        <StepperSeparator
          class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
        />

        <StepperTrigger as-child>
          <Button
            :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 shrink-0 rounded-full"
            :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
          >
            <Check v-if="state === 'completed'" class="size-5" />
            <Circle v-if="state === 'active'" />
            <Dot v-if="state === 'inactive'" />
          </Button>
        </StepperTrigger>

        <div class="flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <StepperTitle
              :class="[state === 'active' && 'text-primary']"
              class="text-sm font-semibold transition lg:text-base"
            >
              Upload File
            </StepperTitle>
            <StepperDescription
              :class="[state === 'active' && 'text-primary']"
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              Click to upload a PDF file containing the contract details. We will extract the data
              for you.
            </StepperDescription>
          </div>
          <!-- file upload -->
          <div class="pa-4">
            <FileUploader @fileSelected="handleFileChange" />
          </div>

          <div class="flex">
            <Button
              @click="isPreviewFileOpen = true"
              :disabled="isExtractingFile || !file"
              class="cursor-pointer disabled:cursor-not-allowed"
            >
              預覽檔案
            </Button>
          </div>
        </div>
      </StepperItem>

      <!-- extract data step -->
      <StepperItem class="relative flex w-full items-start gap-6" :step="2" v-slot="{ state }">
        <StepperSeparator
          class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
        />

        <StepperTrigger as-child>
          <Button
            :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 shrink-0 rounded-full"
            :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
          >
            <Check v-if="state === 'completed'" class="size-5" />
            <Circle v-if="state === 'active'" />
            <Dot v-if="state === 'inactive'" />
          </Button>
        </StepperTrigger>

        <div class="flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <StepperTitle
              :class="[state === 'active' && 'text-primary']"
              class="text-sm font-semibold transition lg:text-base"
            >
              Extract Data
            </StepperTitle>
            <StepperDescription
              :class="[state === 'active' && 'text-primary']"
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              Click to extract data from the uploaded file.
            </StepperDescription>
          </div>

          <!-- extract data from file -->
          <div
            :class="{
              'cursor-not-allowed opacity-30': stepIndex === StepIndexEnum.UploadFile,
              'cursor-pointer': stepIndex === StepIndexEnum.ExtractData
            }"
            class="flex h-[100px] flex-col items-center justify-center rounded-md border-2 border-gray-600 bg-secondary p-6 text-center transition-colors hover:bg-secondary/80"
            @click="extractData"
          >
            <div class="text-muted-foreground">
              <p class="flex items-center gap-2 text-lg font-medium">
                <span :class="isExtractingFile ? 'animate-spin' : ''">⌛️</span>
                {{ isExtractingFile ? 'Extracting data...' : 'Click to extract data' }}
              </p>
              <p
                v-if="file"
                class="overflow-hidden text-ellipsis text-sm font-semibold text-gray-400"
              >
                {{ file.name }}
              </p>
            </div>
          </div>

          <div class="flex">
            <Button
              @click="isFormOpen = true"
              :disabled="!isDataExtracted || !file"
              class="cursor-pointer disabled:cursor-not-allowed"
            >
              預覽表格
            </Button>
          </div>
        </div>
      </StepperItem>

      <StepperItem class="relative flex w-full items-start gap-6" :step="3" v-slot="{ state }">
        <StepperTrigger as-child>
          <Button
            :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 shrink-0 rounded-full"
            :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
          >
            <Check v-if="state === 'completed'" class="size-5" />
            <Circle v-if="state === 'active'" />
            <Dot v-if="state === 'inactive'" />
          </Button>
        </StepperTrigger>

        <div class="flex flex-col gap-1">
          <StepperTitle
            :class="[state === 'active' && 'text-primary']"
            class="text-sm font-semibold transition lg:text-base"
          >
            Submit
          </StepperTitle>
          <StepperDescription
            :class="[state === 'active' && 'text-primary']"
            class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
          >
            Submit the contract details after reviewing the extracted data.
          </StepperDescription>
        </div>
      </StepperItem>
    </Stepper>

    <Button @click="generateDoc" class="mt-6">Generate Document</Button>

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
import { onUnmounted, ref } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
import { useToast } from '@/composables/useToast'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, Circle, Dot } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import FileUploader from '~/components/FileUploader.vue'
import ContractFormDialog from '~/components/contract/ContractFormDialog.vue'
import FilePreviewDialog from '~/components/contract/FilePreviewDialog.vue'
import { extractPdfData } from '~/utils/api/pdf'

const { toast } = useToast()

// Enums and Types
enum StepIndexEnum {
  UploadFile = 1,
  ExtractData = 2,
  ReviewAndSubmit = 3
}

interface ContractFormData {
  buyerName?: string
  buyerAddress?: string
  buyerEmail?: string
  sellerName?: string
  sellerAddress?: string
  product?: string
  quantity?: string
  unitPrice?: string
  totalAmount?: string | null
  origin?: string
  destination?: string
  insurance?: string
  incoterms?: string
  cropYear?: string
  paymentTerms?: string
  shipmentPeriod?: string
  contractNumber?: string
  contractDate?: string
  commission?: string
  packaging?: string
  documentsRequired?: string | null
  EORINumber?: string
  specialNotes?: string
  bankDetails?: {
    beneficiary?: string
    accountNo?: string | null
    bank?: string
    swift?: string | null
  }
}

interface GenerateDocResponse {
  downloadUrl?: string
  [key: string]: any
}

// Form Schema
const formSchema = toTypedSchema(
  z.object({
    buyerName: z.string().optional(),
    buyerAddress: z.string().optional(),
    buyerEmail: z.string().email().optional(),
    sellerName: z.string().optional(),
    sellerAddress: z.string().optional(),
    product: z.string().optional(),
    quantity: z.string().optional(),
    unitPrice: z.string().optional(),
    totalAmount: z.string().nullable().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
    insurance: z.string().optional(),
    incoterms: z.string().optional(),
    cropYear: z.string().optional(),
    paymentTerms: z.string().optional(),
    shipmentPeriod: z.string().optional(),
    contractNumber: z.string().optional(),
    contractDate: z.string().optional(),
    commission: z.string().optional(),
    packaging: z.string().optional(),
    documentsRequired: z.string().nullable().optional(),
    EORINumber: z.string().optional(),
    specialNotes: z.string().optional(),
    bankDetails: z
      .object({
        beneficiary: z.string().optional(),
        accountNo: z.string().nullable().optional(),
        bank: z.string().optional(),
        swift: z.string().nullable().optional()
      })
      .optional()
  })
)

// Reactive State
const file = ref<File | null>(null)
const fileUrl = ref<string | null>(null)
const isExtractingFile = ref(false)
const isDataExtracted = ref(false)
const stepIndex = ref(StepIndexEnum.UploadFile)
const isPreviewFileOpen = ref(false)
const isFormOpen = ref(false)

// Form setup
const form = useForm({
  validationSchema: formSchema
})

const { setValues } = form

// Event Handlers
const handleFileChange = (selectedFile: File) => {
  file.value = selectedFile || null
  fileUrl.value = selectedFile ? URL.createObjectURL(selectedFile) : null
  stepIndex.value = StepIndexEnum.ExtractData

  // Reset extraction state
  isDataExtracted.value = false
}

const extractData = async () => {
  if (stepIndex.value !== StepIndexEnum.ExtractData || !file.value) {
    toast.error('Please select a file first')
    return
  }

  try {
    isExtractingFile.value = true

    const { data, error: uploadError } = await extractPdfData({ file: file.value })

    if (uploadError.value) {
      toast.error('Failed to extract data from file')
    } else if (data.value) {
      toast.success('Data extracted successfully!')
      isDataExtracted.value = true
      setValues(data.value)
      stepIndex.value = StepIndexEnum.ReviewAndSubmit
    }
  } catch (err) {
    toast.error('Failed to extract data from file')
    console.error('Extraction error:', err)
  } finally {
    isExtractingFile.value = false
  }
}

const generateDoc = async () => {
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
    }
  } catch (err) {
    console.error('Failed to generate document:', err)
    toast.error('Failed to generate document')
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

// Cleanup
onUnmounted(() => {
  if (fileUrl.value) {
    URL.revokeObjectURL(fileUrl.value)
  }
})
</script>
