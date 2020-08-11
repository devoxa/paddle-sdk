import nodeFetch from 'node-fetch'
import FormData from 'form-data'

export async function fetch(
  url: string,
  options: { method: string; body: { [key: string]: any } }
): Promise<any> {
  const response = await nodeFetch(url, {
    method: options.method,
    body: objectToFormData(options.body),
  })

  const json = await response.json()

  return json
}

function objectToFormData(object: { [key: string]: any }): FormData {
  const formData = new FormData()

  Object.entries(object).map(([key, value]) => {
    formData.append(key, value.toString())
  })

  return formData
}