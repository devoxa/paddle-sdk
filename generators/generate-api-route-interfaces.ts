import fetch from 'node-fetch'
import fs from 'fs'

const DOCUMENTATION_URLS = [
  'https://developer.paddle.com/api-reference/product-api/pay-links/createpaylink',
  'https://developer.paddle.com/api-reference/subscription-api/users/listusers',
  'https://developer.paddle.com/api-reference/subscription-api/users/updateuser',
  'https://developer.paddle.com/api-reference/subscription-api/users/canceluser',
  'https://developer.paddle.com/api-reference/subscription-api/modifiers/createmodifier',
]

interface RouteInfo<T> {
  allProps: {
    page: {
      data: {
        blocks: Array<{ type: string; data: T; header?: { title: string } }>
      }
    }
  }
}

type RouteInfoRequestBlock = {
  children: [
    {
      blocks: [
        {
          data: JsonSchema
        }
      ]
    }
  ]
}

type RouteInfoResponseBlock = {
  children: [
    {
      blocks: [
        {
          data: {
            children: Array<{
              title: string
              blocks: [
                {
                  data: {
                    oneOf: Array<{
                      properties: {
                        success: {
                          default: boolean
                        }
                        response:
                          | JsonSchema
                          | {
                              type: 'array'
                              items: JsonSchema
                            }
                      }
                    }>
                  }
                }
              ]
            }>
          }
        }
      ]
    }
  ]
}

type RouteInfoTestRequestBlock = {
  method: string
  url: string
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
  let interfaces = []

  for (let url of DOCUMENTATION_URLS) {
    interfaces.push(await buildApiRouteInterfaces(url))
    console.log(`Built interface from ${url}`)
  }

  const code = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

${interfaces.map((x) => x.sourceCode).join('\n\n')}`

  fs.writeFileSync(__dirname + '/../src/__generated__/api-route-interfaces.ts', code, 'utf-8')
  console.log('Written into /src/__generated__/api-route-interfaces.ts')
}

async function buildApiRouteInterfaces(url: string) {
  const routeInfo = await getRouteInfo(url)

  const requestEndpoint = getRequestEndpoint(routeInfo)
  const interfaceName = getInterfaceNameFromRequestEndpoint(requestEndpoint)

  const requestJsonSchema = getRequestJsonSchema(routeInfo)
  const responseJsonSchema = getResponseJsonSchema(routeInfo)

  const requestProperties = Object.entries(requestJsonSchema.properties)
    .filter(([propertyName]) => !['vendor_id', 'vendor_auth_code'].includes(propertyName))
    .map(([propertyName, propertySchema]) => {
      const type = inferTypeFromPropertySchema(propertySchema)

      const nullable = requestJsonSchema.required?.includes(propertyName) ? '' : '?'
      const comment = propertySchema.description ? `/** ${propertySchema.description} */\n  ` : ''
      return `  ${comment}${propertyName}${nullable}: ${type}`
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

        const pattern = propertySchema.pattern ? `\n@pattern ${propertySchema.pattern}` : ''
        const comment = propertySchema.description
          ? `/** ${propertySchema.description}${pattern} */\n  `
          : ''
        return `  ${comment}${propertyName}: ${type}`
      }
    )

    responseType = `${responseIsArray ? 'Array<' : ''}{
${responseProperties.join('\n')}
}${responseIsArray ? '>' : ''}`
  }

  const sourceCode = `export const PADDLE_${toSnakeCase(interfaceName)
    .toUpperCase()
    .replace(/^(POST|GET)_/, '')} = {
  method: '${requestEndpoint.method.toUpperCase()}' as const,
  url: '${requestEndpoint.url}' as const,
}

export type RawPaddle${interfaceName}Request = {
${requestProperties.join('\n')}
}

export type RawPaddle${interfaceName}Response = ${responseType}`

  return { sourceCode }
}

async function getRouteInfo(url: string) {
  const response = await fetch(url)
  const text = await response.text()

  const line = text.split('\n').find((x) => x.trim().startsWith('window.__routeInfo ='))

  if (!line) {
    throw new Error('Could not find routeInfo line')
  }

  const jsonString = line.replace(/^.*window\.__routeInfo = /, '').replace(/;<.*$/, '')
  return JSON.parse(jsonString)
}

function getRequestEndpoint(routeInfo: RouteInfo<RouteInfoTestRequestBlock>) {
  const testRequestBlock = routeInfo.allProps.page.data.blocks.find((x) => x.type === 'http')

  if (!testRequestBlock) {
    throw new Error('Could not find text block for page')
  }

  return { method: testRequestBlock.data.method, url: testRequestBlock.data.url }
}

function getRequestJsonSchema(routeInfo: RouteInfo<RouteInfoRequestBlock>) {
  const accordionBlock = routeInfo.allProps.page.data.blocks.find((x) => x.type === 'accordion')

  if (!accordionBlock) {
    throw new Error('Could not find accordion block for page')
  }

  return accordionBlock.data.children[0].blocks[0].data
}

function getResponseJsonSchema(routeInfo: RouteInfo<RouteInfoResponseBlock>) {
  const tabsBlock = routeInfo.allProps.page.data.blocks.find((x) => x.type === 'tabs')

  if (!tabsBlock) {
    throw new Error('Could not find tabs block for page')
  }

  const schemaBlock = tabsBlock.data.children[0].blocks[0].data.children.find(
    (x) => x.title === 'Schema'
  )

  if (!schemaBlock) {
    throw new Error('Could not find schema block for page')
  }

  const successResponseSchema = schemaBlock.blocks[0].data.oneOf.find(
    (x) => x.properties.success.default !== false
  )

  if (!successResponseSchema) {
    throw new Error('Could not find success response block for page')
  }

  return successResponseSchema.properties.response
}

function getInterfaceNameFromRequestEndpoint(endpoint: { method: string; url: string }): string {
  const path = endpoint.url.replace(/^.*\/\d.\d\//, '').replace(/\//g, '_')
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
    return propertySchema.enum.map((x) => `"${x}"`).join(' | ')
  }

  if (propertySchema.type === 'integer' || propertySchema.type === 'number') {
    return 'number'
  }

  if (propertySchema.type === 'string') {
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
