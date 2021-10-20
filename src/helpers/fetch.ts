import nodeFetch from 'node-fetch'
import FormData from 'form-data'

type Body = Record<string, string | number | undefined>

export async function fetch<T>(url: string, options: { method: string; body: Body }): Promise<T> {
  const response = await nodeFetch(url, {
    method: options.method,
    body: objectToFormData(options.body),
  })

  return response.json()
}

function objectToFormData(object: Body): FormData {
  const formData = new FormData()

  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'undefined') return

    formData.append(key, value.toString())
  })

  return formData
}
