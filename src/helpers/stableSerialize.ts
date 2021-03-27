import { serialize as phpSerialize } from 'php-serialize'

export function stableSerialize<T>(object: Record<string, T>): string {
  // 1) Sort the object alphabetically by it's keys
  object = sortByKey(object)

  // 2) Encode arrays in their string form: `[1, 2, 3]` -> `'1, 2, 3'`
  // 3) Encode any non-strings as their JSON stringified version: `3` -> `'3'`
  const encodedObject: Record<string, string> = {}
  for (const property in object) {
    if (object.hasOwnProperty(property) && typeof object[property] !== 'string') {
      const value = object[property]

      if (Array.isArray(value)) {
        encodedObject[property] = value.join(', ')
      } else {
        encodedObject[property] = JSON.stringify(value)
      }
    }
  }

  // 4) Serialize in the way that PHP would
  return phpSerialize(object)
}

function sortByKey<T>(object: Record<string, T>) {
  const keys = Object.keys(object).sort()

  const sortedObject: Record<string, T> = {}
  for (const i in keys) {
    sortedObject[keys[i]] = object[keys[i]]
  }

  return sortedObject
}
