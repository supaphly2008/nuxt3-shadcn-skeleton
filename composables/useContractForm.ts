import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import type { ContractFormData } from '~/types/contract'

// Form Schema
const formSchema = toTypedSchema(
  z.object({
    buyerName: z.string().optional(),
    buyerAddress: z.string().optional(),
    buyerEmail: z
      .string()
      .optional()
      .refine(val => !val || z.string().email().safeParse(val).success, {
        message: 'Invalid email format'
      }),
    sellerName: z.string().optional(),
    sellerAddress: z.string().optional(),
    product: z.string().optional(),
    quantity: z.string().optional(),
    unitPrice: z.string().optional(),
    totalAmount: z.string().nullish(),
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
    documentsRequired: z.string().nullish(),
    EORINumber: z.string().optional(),
    specialNotes: z.string().optional(),
    bankDetails: z
      .object({
        beneficiary: z.string().optional(),
        accountNo: z.string().nullish(),
        bank: z.string().optional(),
        swift: z.string().nullish()
      })
      .optional()
  })
)

export function useContractForm() {
  const form = useForm({
    validationSchema: formSchema
  })

  const { setValues, resetForm } = form

  const updateFormData = (data: Partial<ContractFormData>) => {
    setValues(data)
  }

  const resetFormData = () => {
    resetForm()
  }

  return {
    form,
    updateFormData,
    resetFormData
  }
}
