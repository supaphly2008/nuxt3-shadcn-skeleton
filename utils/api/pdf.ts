export interface FileUploadForm {
  file: File
}

export const extractPdfData = async ({ file }: FileUploadForm) => {
  const config = useRuntimeConfig()
  const apiUrl = `${config.public.apiBase}/extract-file`

  const formData = new FormData()
  formData.append('pdf', file)

  const { data, error } = await useFetch(apiUrl, {
    method: 'POST',
    body: formData
  })

  return { data, error }
}
