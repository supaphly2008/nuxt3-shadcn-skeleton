export interface ContractFormData {
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

export interface GenerateDocResponse {
  downloadUrl?: string
  [key: string]: any
}

export interface ExtractPdfResponse {
  success: boolean
  data: ContractFormData
  cached?: boolean
}

export interface FileUploadState {
  file: File | null
  fileUrl: string | null
  isExtractingFile: boolean
  isDataExtracted: boolean
}

export interface WorkflowState {
  stepIndex: number
  isPreviewFileOpen: boolean
  isFormOpen: boolean
}
