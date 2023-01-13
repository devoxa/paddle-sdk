import fs from 'fs'
import { fetchPageMarkdown, spliceAndReturn, toJSDoc, toPascalCase, trim } from './helpers'

const INCLUDE_COMMENTS = true

const DOCUMENTATION_BASE_URL = 'https://developer.paddle.com'

const DOCUMENTATION_URLS = [
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-created',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-updated',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-cancelled',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-succeeded',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-failed',
  'https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-refunded',

  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/order-processing-completed',
  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-refunded',
  'https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-succeeded',

  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-created',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-updated',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-created',
  'https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-closed',

  'https://developer.paddle.com/webhook-reference/payout-alerts/transfer-created',
  'https://developer.paddle.com/webhook-reference/payout-alerts/transfer-paid',

  'https://developer.paddle.com/webhook-reference/audience-alerts/new-audience-member',
  'https://developer.paddle.com/webhook-reference/audience-alerts/update-audience-member',

  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-sent',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-paid',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-overdue',
  'https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-cancelled',
]

type JsonSchema = {
  alert_name: JsonSchemaProperty & { default: string }
  [key: string]: JsonSchemaProperty
}

type JsonSchemaProperty = {
  type: string
  format?: string
  description?: string
  default?: string
  enum?: Array<string>
}

run()

async function run() {
  const types = []

  for (const url of DOCUMENTATION_URLS) {
    types.push(await buildWebhookAlertType(url))
    console.log(`Built type from ${url}`)
  }

  const unionType = types.map((x) => x.name).join(' | ')

  const code = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

/** An alert fired by Paddle through a configured webhook */
export type RawPaddleWebhookAlert = ${unionType}

${types.map((x) => x.sourceCode).join('\n\n')}`

  fs.writeFileSync(__dirname + '/../src/__generated__/webhook-alerts.ts', code, 'utf-8')
  console.log('Written into /src/__generated__/webhook-alerts.ts')
}

async function buildWebhookAlertType(url: string) {
  const markdown = await fetchPageMarkdown(url)

  const description = getDescription(markdown)
  const jsonSchema = getJsonSchema(markdown)

  const properties = Object.entries(jsonSchema).map(([propertyName, propertySchema]) => {
    const type = inferTypeFromPropertySchema(propertySchema)

    const jsDocLines = []
    if (propertySchema.description) jsDocLines.push(propertySchema.description)
    if (propertySchema.format) jsDocLines.push(`@format ${propertySchema.format}`)

    const comment = INCLUDE_COMMENTS ? toJSDoc(jsDocLines) + '\n' : ''
    return `${comment}${propertyName}: ${type}`
  })

  const name = `RawPaddle${toPascalCase(jsonSchema.alert_name.default)}Alert`
  const jsDocLines = [description, `@source ${url}`]

  const sourceCode = `${INCLUDE_COMMENTS ? toJSDoc(jsDocLines) : ''}
export type ${name} = {
${properties.join(INCLUDE_COMMENTS ? '\n\n' : '\n')}
}`

  return { name, sourceCode }
}

function getDescription(markdown: string): string {
  const match = markdown.match(/## Summary\n(.*)\n/)
  if (!match) throw new Error('Could not find summary heading for page')

  return match[1]
}

function getJsonSchema(markdown: string): JsonSchema {
  // Parse the markdown table into a usable object
  const table = markdown
    .split('\n')
    .filter((x) => x.startsWith('| '))
    .slice(1)
    .map((row) => {
      const [property, type, description] = row
        .split(/(?<!\\)\|/g)
        .slice(1)
        .map((x) => x.trim().replace(/ ?<br \/>/g, '\n'))

      return { property, type, description }
    })
    .filter((row) => !row.property.startsWith('---'))

  // Turn the table object into a valid JSON schema
  const schema = { alert_name: {} } as JsonSchema
  for (const row of table) {
    const property = row.property

    // Parse the combined type into the type and the format
    const typeMatch = row.type
      .replace(/&lt;?/, '<')
      .replace(/&gt;?/, '>')
      .match(/^([^<]*)(<(.*)>)?$/)
    if (!typeMatch) throw new Error(`Could not match \`row.type\` format for "${row.type}"`)
    const _type = typeMatch[1]
    const _format = typeMatch[3]

    // Cleanup some inconsistencies in the description
    const description = row.description
      .replace(/ Default( value)?: /, '\nDefault value: ')
      .replace(/ Allowed values: /, '\nAllowed values: ')
      .split('\n')

    // Parse the default out of the description
    let _default = undefined
    const defaultDescriptionIndex = description.findIndex((line) => {
      return (
        line.startsWith('Default: ') ||
        line.startsWith('Default value: ') ||
        (line.startsWith('`') && !line.includes('` `'))
      )
    })
    if (defaultDescriptionIndex !== -1) {
      const defaultDescriptionLine = spliceAndReturn(description, defaultDescriptionIndex)

      _default = defaultDescriptionLine.replace('Default: ', '').replace('Default value: ', '')
      _default = trim(_default, '`')
    }

    // Parse the enum out of the description
    let _enum = undefined
    const enumDescriptionIndex = description.findIndex((line) => {
      return line.startsWith('Allowed values: ') || (line.startsWith('`') && line.includes('` `'))
    })
    if (enumDescriptionIndex !== -1) {
      const enumDescriptionLine = spliceAndReturn(description, enumDescriptionIndex)

      _enum = enumDescriptionLine.replace('Allowed values: ', '')
      _enum = _enum
        .split(' ')
        .map((value) => trim(value, '`'))
        .filter(Boolean)
    }

    // Combine the processed description and fix relative URLs
    const _description = description.join(' ').replace(/\]\(\//g, `](${DOCUMENTATION_BASE_URL}/`)

    schema[property] = {
      type: _type,
      format: _format,
      description: _description,
      default: _default,
      enum: _enum,
    }
  }

  // HACK Fix bugs in the documentation
  if (schema.alert_id?.default) {
    schema.alert_name.default = schema.alert_id.default
    delete schema.alert_id.default
  }

  return schema
}

function inferTypeFromPropertySchema(propertySchema: JsonSchemaProperty) {
  if (propertySchema.default) {
    return `"${propertySchema.default}"`
  }

  if (propertySchema.enum) {
    return propertySchema.enum.map((x) => `"${x}"`).join(' | ')
  }

  if (propertySchema.type === 'integer') {
    return 'number'
  }

  if (propertySchema.type) {
    return propertySchema.type
  }

  return 'COULD_NOT_PARSE_TYPE'
}
