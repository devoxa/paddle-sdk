import fs from 'fs'
import { fetchPageMarkdown, toJSDoc } from './helpers'

const INCLUDE_COMMENTS = true

const DOCUMENTATION_URLS = [
  'https://developer.paddle.com/api-reference/product-api/pay-links/createpaylink',
  'https://developer.paddle.com/api-reference/subscription-api/users/listusers',
  'https://developer.paddle.com/api-reference/subscription-api/users/updateuser',
  'https://developer.paddle.com/api-reference/subscription-api/users/canceluser',
  'https://developer.paddle.com/api-reference/subscription-api/modifiers/createmodifier',
]

interface NextData {
  method: string
  path: string

  request: {
    body: {
      contents: Array<{
        schema: JsonSchema
      }>
    }
  }

  responses: Array<{
    contents: Array<{
      schema: {
        oneOf: [
          {
            properties: {
              response: JsonSchema | { type: 'array'; items: JsonSchema }
            }
          }
        ]
      }
    }>
  }>
}

type JsonSchema = {
  type: string
  properties: { [key: string]: JsonSchemaProperty }
  required?: Array<string>
}

type JsonSchemaProperty = {
  type: string
  description?: string
  default?: any
  enum?: Array<string>
  pattern?: string
  items?: JsonSchemaProperty
  properties?: { [key: string]: JsonSchemaProperty }
  oneOf?: Array<JsonSchemaProperty>
}

run()

async function run() {
  let types = []

  for (let url of DOCUMENTATION_URLS) {
    types.push(await buildApiRouteTypes(url))
    console.log(`Built types from ${url}`)
  }

  let code = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

${types.map((x) => x.sourceCode).join('\n\n')}`

  fs.writeFileSync(__dirname + '/../src/__generated__/api-routes.ts', code, 'utf-8')
  console.log('Written into /src/__generated__/api-routes.ts')
}

async function buildApiRouteTypes(url: string) {
  const data = JSON.parse(await fetchPageMarkdown(url)) as NextData

  const requestEndpoint = { method: data.method, path: data.path }
  const typeName = getTypeNameFromRequestEndpoint(requestEndpoint)

  const requestJsonSchema = data.request.body.contents[0].schema
  const responseJsonSchema = data.responses[0].contents[0].schema.oneOf[0].properties.response

  const requestProperties = Object.entries(requestJsonSchema.properties)
    .filter(([propertyName]) => !['vendor_id', 'vendor_auth_code'].includes(propertyName))
    .map(([propertyName, propertySchema]) => {
      const type = inferTypeFromPropertySchema(propertySchema)

      const jsDocLines = []
      if (propertySchema.description) jsDocLines.push(...propertySchema.description.split('\n'))

      const comment = INCLUDE_COMMENTS ? toJSDoc(jsDocLines) + '\n' : ''
      const nullable = requestJsonSchema.required?.includes(propertyName) ? '' : '?'
      return `${comment}${propertyName}${nullable}: ${type}`
    })

  let responseType
  if (!responseJsonSchema) {
    responseType = 'void'
  } else {
    const responseIsArray = 'items' in responseJsonSchema
    const responsePropertiesRaw =
      'items' in responseJsonSchema
        ? responseJsonSchema.items.properties
        : responseJsonSchema.properties

    const responseProperties = Object.entries(responsePropertiesRaw).map(
      ([propertyName, propertySchema]) => {
        const type = inferTypeFromPropertySchema(propertySchema)

        const jsDocLines = []
        if (propertySchema.description) jsDocLines.push(...propertySchema.description.split('\n'))
        if (propertySchema.pattern) jsDocLines.push(`@pattern ${propertySchema.pattern}`)

        const comment = INCLUDE_COMMENTS ? toJSDoc(jsDocLines) + '\n' : ''
        return `${comment}${propertyName}: ${type}`
      }
    )

    responseType = `${responseIsArray ? 'Array<' : ''}{
${responseProperties.join('\n')}
}${responseIsArray ? '>' : ''}`
  }

  const screamingTypeName = toSnakeCase(typeName)
    .toUpperCase()
    .replace(/^(POST|GET)_/, '')
  const sourceCode = `export const PADDLE_${screamingTypeName} = {
  method: '${requestEndpoint.method.toUpperCase()}' as const,
  path: '${requestEndpoint.path}' as const,
}

export type RawPaddle${typeName}Request = {
${requestProperties.join(INCLUDE_COMMENTS ? '\n\n' : '\n')}
}

export type RawPaddle${typeName}Response = ${responseType}`

  return { sourceCode }
}

function getTypeNameFromRequestEndpoint(endpoint: { method: string; path: string }): string {
  const path = endpoint.path.replace(/^.*\/\d.\d\//, '').replace(/\//g, '_')
  return toPascalCase(`${endpoint.method}_${path}`)
}

function toPascalCase(snakeCase: string) {
  const camelCase = snakeCase.replace(/_(\w)/g, ($, $1) => $1.toUpperCase())
  return `${camelCase.charAt(0).toUpperCase()}${camelCase.substr(1)}`
}

function toSnakeCase(pascalCase: string) {
  return pascalCase.replace(/\.?([A-Z]+)/g, ($, $1) => '_' + $1.toLowerCase()).replace(/^_/, '')
}

function inferTypeFromPropertySchema(propertySchema: JsonSchemaProperty): string {
  if (propertySchema.enum) {
    let enumValues = propertySchema.enum

    if (propertySchema.type === 'string') {
      enumValues = enumValues.map((x) => `"${x}"`)
    }

    return enumValues.join(' | ')
  }

  if (propertySchema.type === 'integer' || propertySchema.type === 'number') {
    return 'number'
  }

  if (propertySchema.type === 'string') {
    // HACK: Infer if this is actually an array via the description
    if (propertySchema.description?.slice(0, 100).includes('(s) ')) {
      return 'Array<string>'
    }

    return 'string'
  }

  if (propertySchema.type === 'boolean') {
    return 'boolean'
  }

  if (propertySchema.type === 'object' && propertySchema.properties) {
    const objectProperties = Object.entries(propertySchema.properties).map(([key, property]) => {
      return `  ${key}: ${inferTypeFromPropertySchema(property)}`
    })

    return '{\n' + objectProperties.join('\n') + '\n}'
  }

  if (propertySchema.type === 'object' && propertySchema.oneOf) {
    return propertySchema.oneOf
      .map((x) => inferTypeFromPropertySchema({ ...x, type: 'object' }))
      .join(' | ')
  }

  if (propertySchema.type === 'array' && propertySchema.items) {
    return `Array<${inferTypeFromPropertySchema(propertySchema.items)}>`
  }

  throw new Error(`Unknown property schema type ${propertySchema.type}`)
}
