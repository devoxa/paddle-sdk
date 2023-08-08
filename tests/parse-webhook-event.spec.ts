import { PaddleSdk } from '../src/index'
import { encryptMetadata, stringifyMetadata } from '../src/metadata'
import * as FIXTURES from './fixtures'

const paddleSdk = new PaddleSdk({
  publicKey: FIXTURES.publicKey,
  vendorId: FIXTURES.vendorId,
  vendorAuthCode: FIXTURES.vendorAuthCode,
  metadataCodec: encryptMetadata(stringifyMetadata(), FIXTURES.metadataEncryptionKey),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(paddleSdk as any).verifyWebhookEvent = () => true

describe('parse webhook event', () => {
  test('parses a "payment succeeded" event correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.paymentSucceededEvent)).toMatchSnapshot()
  })

  test('parses a "payment refunded" event correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.paymentRefundedEvent)).toMatchSnapshot()
  })

  test('parses a "subscription created" event correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.subscriptionCreatedEvent)).toMatchSnapshot()
  })

  test('parses a "subscription updated" event correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.subscriptionUpdatedEvent)).toMatchSnapshot()
  })

  test('parses a "subscription updated (paused)" event correctly', () => {
    const fixture = {
      ...FIXTURES.subscriptionUpdatedEvent,
      paused_at: '2020-01-01 12:13:14',
      paused_from: '2020-02-01 12:13:14',
      paused_reason: 'delinquent',
    }

    expect(paddleSdk.parseWebhookEvent(fixture)).toMatchSnapshot()
  })

  test('parses a "subscription cancelled" event correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.subscriptionCancelledEvent)).toMatchSnapshot()
  })

  test('parses a "subscription payment succeeded" event correctly', () => {
    expect(
      paddleSdk.parseWebhookEvent(FIXTURES.subscriptionPaymentSucceededEvent)
    ).toMatchSnapshot()
  })

  test('errors if the metadata can not be parsed', () => {
    const fixture = {
      ...FIXTURES.subscriptionCreatedEvent,
      passthrough: 'FooBar',
    }

    expect(() => paddleSdk.parseWebhookEvent(fixture)).toThrowErrorMatchingSnapshot()
  })

  test('errors if the webhook signature can not be validated', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(paddleSdk as any).verifyWebhookEvent = () => false

    expect(() =>
      paddleSdk.parseWebhookEvent(FIXTURES.subscriptionCreatedEvent)
    ).toThrowErrorMatchingSnapshot()
  })
})
