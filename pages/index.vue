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

          <div class="flex justify-end">
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
            <div class="text-gray-400">
              <p class="flex items-center gap-2 text-lg font-medium">
                <span :class="isExtractingFile ? 'animate-spin' : ''">⌛️</span>
                Click to extract data
              </p>
              <p v-if="file" class="overflow-hidden text-ellipsis text-sm font-semibold text-white">
                {{ file.name }}
              </p>
            </div>
          </div>

          <div class="flex justify-end">
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

    <Button @click="generateDoc">Generate</Button>

    <!-- preview pdf dialog -->
    <FilePreviewDialog v-model:open="isPreviewFileOpen" :fileUrl="fileUrl" />

    <!-- form dialog -->
    <Dialog v-model:open="isFormOpen">
      <DialogContent class="max-w-screen h-full rounded-none md:h-[90%] md:w-[800px]">
        <div class="relative flex h-full w-full flex-col overflow-scroll pt-4">
          <!-- form with extracted data -->
          <form class="flex flex-col gap-8" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="buyerName">
              <FormItem>
                <FormLabel>Buyer Name</FormLabel>
                <FormControl>
                  <Input class="bg-primary" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="buyerEmail">
              <FormItem>
                <FormLabel>Buyer Email</FormLabel>
                <FormControl>
                  <Input type="email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="buyerAddress">
              <FormItem>
                <FormLabel>Buyer Address</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="sellerName">
              <FormItem>
                <FormLabel>Seller Name</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="SellerAddress">
              <FormItem>
                <FormLabel>Seller Address</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="contractNumber">
              <FormItem>
                <FormLabel>Contract No.</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="product">
              <FormItem>
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="quantity">
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="unitPrice">
              <FormItem>
                <FormLabel>Unit Price</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="totalAmount">
              <FormItem>
                <FormLabel>Total Amount</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="origin">
              <FormItem>
                <FormLabel>Origin</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="destination">
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="insurance">
              <FormItem>
                <FormLabel>Insurance</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- sticky-ish footer (inside the form!) -->
            <div class="sticky bottom-0 flex justify-end gap-4 border-t bg-background py-4">
              <Button
                class="w-[100px] cursor-pointer bg-secondary text-white hover:bg-secondary/70"
                @click="isPreviewFileOpen = true"
                >預覽檔案</Button
              >
              <Button class="w-[100px] cursor-pointer text-white" type="submit">儲存</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
import { Textarea } from '@/components/ui/textarea'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, Circle, Dot } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import FileUploader from '~/components/FileUploader.vue'
import FilePreviewDialog from '~/components/contract/FilePreviewDialog.vue'
import { extractPdfData } from '~/utils/api/pdf'

enum StepIndexEnum {
  UploadFile = 1,
  ExtractData = 2,
  ReviewAndSubmit = 3
}

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

const form = useForm({
  validationSchema: formSchema
})

const { setValues } = form

const file = ref<File | null>(null)
const fileUrl = ref<string | null>(null)
const isExtractingFile = ref(false)
const message = ref('')
const error = ref('')
const isPreviewFileOpen = ref(false)
const isFormOpen = ref(false)
const isDataExtracted = ref(false)
const stepIndex = ref(StepIndexEnum.UploadFile)

const handleFileChange = (selectedFile: File) => {
  file.value = selectedFile || null
  fileUrl.value = selectedFile ? URL.createObjectURL(selectedFile) : null
  stepIndex.value = StepIndexEnum.ExtractData
}

const extractData = async () => {
  error.value = ''
  message.value = ''

  if (!file.value) {
    error.value = 'Please select a file'
    return
  }

  isExtractingFile.value = true
  const { data, error: uploadError } = await extractPdfData({ file: file.value })
  isExtractingFile.value = false

  if (uploadError.value) {
    error.value = uploadError?.value?.message || 'An unknown error occurred'
  } else {
    console.log('data success', data.value)
    if (data.value) {
      isDataExtracted.value = true
      setValues(data.value)
    }
  }
}

type GenerateDocResponse = {
  downloadUrl?: string
  [key: string]: any
}

const generateDoc = async () => {
  const { data } = await useFetch<GenerateDocResponse>('http://localhost:3001/generate-doc', {
    method: 'POST',
    body: {
      invoiceNo: 'TG25014',
      date: 'MAY.14.2025',
      marks: 'N/M',
      desc: 'Your product description here...'
    }
  })

  if (data.value?.downloadUrl) {
    window.open(`http://localhost:3001${data.value.downloadUrl}`, '_blank')
  }

  console.log('data', data.value)
}

const onSubmit = form.handleSubmit(values => {
  console.log('Form submitted!', values)
})
</script>

<style></style>
