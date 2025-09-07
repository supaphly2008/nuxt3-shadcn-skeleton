import type { ExtractPdfResponse } from '~/types/contract'

export interface FileUploadForm {
  file: File
}

export const extractPdfData = async ({ file }: FileUploadForm) => {
  const formData = new FormData()
  formData.append('pdf', file)

  const { data, error } = await useFetch<ExtractPdfResponse>('/api/extract-file', {
    method: 'POST',
    body: formData
  })

  return { data, error }
}
