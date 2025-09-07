<template>
  <Dialog v-model:open="open" @update:open="handleClose">
    <DialogContent class="max-w-screen h-full rounded-none md:h-[90%] md:w-[800px]">
      <div class="relative flex h-full w-full flex-col overflow-scroll pt-4">
        <form class="flex flex-col gap-8" @submit="handleSubmit">
          <!-- Buyer Information Section -->
          <section class="space-y-4">
            <h3 class="border-b pb-2 text-lg font-semibold">Buyer Information</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField v-slot="{ componentField }" name="buyerName">
                <FormItem>
                  <FormLabel>Buyer Name</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
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
            </div>

            <FormField v-slot="{ componentField }" name="buyerAddress">
              <FormItem>
                <FormLabel>Buyer Address</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </section>

          <!-- Seller Information Section -->
          <section class="space-y-4">
            <h3 class="border-b pb-2 text-lg font-semibold">Seller Information</h3>

            <FormField v-slot="{ componentField }" name="sellerName">
              <FormItem>
                <FormLabel>Seller Name</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="sellerAddress">
              <FormItem>
                <FormLabel>Seller Address</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </section>

          <!-- Contract Details Section -->
          <section class="space-y-4">
            <h3 class="border-b pb-2 text-lg font-semibold">Contract Details</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField v-slot="{ componentField }" name="contractNumber">
                <FormItem>
                  <FormLabel>Contract No.</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="contractDate">
                <FormItem>
                  <FormLabel>Contract Date</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </section>

          <!-- Product Information Section -->
          <section class="space-y-4">
            <h3 class="border-b pb-2 text-lg font-semibold">Product Information</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </div>
          </section>

          <!-- Shipping Information Section -->
          <section class="space-y-4">
            <h3 class="border-b pb-2 text-lg font-semibold">Shipping Information</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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

              <FormField v-slot="{ componentField }" name="incoterms">
                <FormItem>
                  <FormLabel>Incoterms</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </section>

          <!-- Additional Information Section -->
          <section class="space-y-4">
            <h3 class="border-b pb-2 text-lg font-semibold">Additional Information</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField v-slot="{ componentField }" name="cropYear">
                <FormItem>
                  <FormLabel>Crop Year</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="paymentTerms">
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="shipmentPeriod">
                <FormItem>
                  <FormLabel>Shipment Period</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="commission">
                <FormItem>
                  <FormLabel>Commission</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="packaging">
                <FormItem>
                  <FormLabel>Packaging</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="EORINumber">
                <FormItem>
                  <FormLabel>EORI Number</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <FormField v-slot="{ componentField }" name="documentsRequired">
                <FormItem>
                  <FormLabel>Documents Required</FormLabel>
                  <FormControl>
                    <Textarea v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="specialNotes">
                <FormItem>
                  <FormLabel>Special Notes</FormLabel>
                  <FormControl>
                    <Textarea v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </section>

          <!-- Bank Details Section -->
          <section class="space-y-4">
            <h3 class="border-b pb-2 text-lg font-semibold">Bank Details</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField v-slot="{ componentField }" name="bankDetails.beneficiary">
                <FormItem>
                  <FormLabel>Beneficiary</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="bankDetails.accountNo">
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="bankDetails.bank">
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="bankDetails.swift">
                <FormItem>
                  <FormLabel>SWIFT Code</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </section>

          <!-- Form Actions -->
          <div class="sticky bottom-0 flex justify-end gap-4 border-t bg-background py-4">
            <Button
              type="button"
              variant="outline"
              @click="handleClose"
              class="w-[100px] cursor-pointer"
            >
              Close
            </Button>
            <Button type="submit" class="w-[100px] cursor-pointer">儲存</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { FormContext } from 'vee-validate'
import type { ContractFormData } from '~/types/contract'

interface Props {
  form: FormContext<ContractFormData>
}

interface Emits {
  submit: [values: ContractFormData]
  close: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const open = defineModel<boolean>('open', { required: true })

const handleSubmit = (event: Event) => {
  event.preventDefault()

  emit('submit', props.form.values)
}

const handleClose = () => {
  // Emit close event to parent component
  emit('close')
}
</script>
