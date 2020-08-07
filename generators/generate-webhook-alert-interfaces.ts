import fetch from 'node-fetch'
import fs from 'fs'

const DOCUMENTATION_URLS = [
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-created',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-updated',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-cancelled',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-succeeded',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-failed',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-refunded',
  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-succeeded',
  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-refunded',
  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/order-processing-completed',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-created',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-closed',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-created',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-updated',
  'https://developer.paddle.com/webhook-reference/payout-alerts/transfer-created',
  'https://developer.paddle.com/webhook-reference/payout-alerts/transfer-paid',
  'https://developer.paddle.com/webhook-reference/audience-alerts/new-audience-member',
  'https://developer.paddle.com/webhook-reference/audience-alerts/update-audience-member',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-paid',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-sent',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-overdue',
]

interface RouteInfo<T> {
  allProps: {
    page: {
      data: {
        blocks: Array<{ type: string; data: T }>
      }
    }
  }
}

type JsonSchema = {
  properties: {
    alert_name: { default: string }
    [key: string]: JsonSchemaProperty
  }
}

type JsonSchemaProperty = {
  description?: string
  default?: string
  enum?: Array<string>
  pattern?: string
}

run()

async function run() {
  let interfaces = []

  for (let url of DOCUMENTATION_URLS) {
    interfaces.push(await buildWebhookAlertInterface(url))
    console.log(`Built interface from ${url}`)
  }

  const unionType = interfaces.map((x) => x.name).join(' | ')

  const code = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

/** An alert fired by Paddle through a configured webhook */
export type RawPaddleWebhookAlert = ${unionType}

${interfaces.map((x) => x.sourceCode).join('\n\n')}`

  fs.writeFileSync(__dirname + '/../src/__generated__/webhook-alert-interfaces.ts', code, 'utf-8')
  console.log('Written into /src/__generated__/webhook-alert-interfaces.ts')
}

async function buildWebhookAlertInterface(url: string) {
  const routeInfo = await getRouteInfo(url)

  const description = getDescription(routeInfo)
  const jsonSchema = getJsonSchema(routeInfo)

  const properties = Object.entries(jsonSchema.properties).map(([propertyName, propertySchema]) => {
    const type = inferTypeFromPropertySchema(propertySchema)

    const pattern = propertySchema.pattern ? `\n@pattern ${propertySchema.pattern}` : ''
    const comment = propertySchema.description
      ? `/** ${propertySchema.description}${pattern} */\n  `
      : ''
    return `  ${comment}${propertyName}: ${type}`
  })

  const name = `RawPaddle${toPascalCase(jsonSchema.properties.alert_name.default)}Alert`
  const sourceCode = `/** ${description} */
export interface ${name} {
${properties.join('\n')}
}`

  return { name, sourceCode }
}

async function getRouteInfo(url: string) {
  const response = await fetch(url)
  const text = await response.text()

  const line = text.split('\n').find((x) => x.trim().startsWith('window.__routeInfo ='))

  if (!line) {
    throw new Error('Could not find routeInfo line')
  }

  const jsonString = line.replace(/^.*window\.__routeInfo = /, '').replace(/;.*$/, '')
  return JSON.parse(jsonString)
}

function getDescription(routeInfo: RouteInfo<string>) {
  const textBlock = routeInfo.allProps.page.data.blocks.find((x) => x.type === 'text')

  if (!textBlock) {
    throw new Error('Could not find text block for page')
  }

  const headingLine = textBlock.data.split('\n').find((x) => x.startsWith('####'))

  if (!headingLine) {
    throw new Error('Could not find heading line for page')
  }

  return headingLine.replace('#### ', '')
}

function getJsonSchema(routeInfo: RouteInfo<JsonSchema>) {
  const jsonSchemaBlock = routeInfo.allProps.page.data.blocks.find((x) => x.type === 'jsonSchema')

  if (!jsonSchemaBlock) {
    throw new Error('Could not find jsonSchema block for page')
  }

  return jsonSchemaBlock.data
}

function toPascalCase(string: string) {
  const camelCase = string.replace(/_(\w)/g, ($, $1) => $1.toUpperCase())
  return `${camelCase.charAt(0).toUpperCase()}${camelCase.substr(1)}`
}

function inferTypeFromPropertySchema(propertySchema: JsonSchemaProperty) {
  if (propertySchema.default) {
    return `"${propertySchema.default}"`
  }

  if (propertySchema.enum) {
    return propertySchema.enum.map((x) => `"${x}"`).join(' | ')
  }

  return 'string'
}
