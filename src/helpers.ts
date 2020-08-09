import { serialize as phpSerialize } from 'php-serialize'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import FormData from 'form-data'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export function stableSerialize(object: { [key: string]: any }): string {
  // 1) Sort the object alphabetically by it's keys
  object = sortByKey(object)

  // 2) Encode arrays in their string form: `[1, 2, 3]` -> `'1, 2, 3'`
  // 3) Encode any non-strings as their JSON stringified version: `3` -> `'3'`
  for (const property in object) {
    if (object.hasOwnProperty(property) && typeof object[property] !== 'string') {
      if (Array.isArray(object[property])) {
        object[property] = object[property].join(', ')
      } else {
        object[property] = JSON.stringify(object[property])
      }
    }
  }

  // 4) Serialize in the way that PHP would
  return phpSerialize(object)
}

function sortByKey(object: { [key: string]: any }) {
  const keys = Object.keys(object).sort()

  const sortedObject: { [key: string]: any } = {}
  for (const i in keys) {
    sortedObject[keys[i]] = object[keys[i]]
  }

  return sortedObject
}

export function parseUtcDate(dateString: string, type: 'DATE' | 'DATE_TIME' | 'EXPIRY_DATE'): Date {
  switch (type) {
    case 'DATE':
      return dayjs.utc(dateString, 'YYYY-MM-DD').toDate()
    case 'DATE_TIME':
      return dayjs.utc(dateString, 'YYYY-MM-DD HH:mm:ss').toDate()
    case 'EXPIRY_DATE':
      return dayjs.utc(dateString, 'MM/YYYY').toDate()
  }
}

export function objectToFormData(object: { [key: string]: any }): FormData {
  const formData = new FormData()

  Object.entries(object).map(([key, value]) => {
    formData.append(key, value.toString())
  })

  return formData
}
