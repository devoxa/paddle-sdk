/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'

const paddleSdk = new PaddleSdk({
  publicKey: FIXTURES.publicKey,
  vendorId: FIXTURES.vendorId,
  vendorAuthCode: FIXTURES.vendorAuthCode,
  metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
})

describe('webhooks -> parse webhook event', () => {
  it('parses subscriptionCreatedWebhook webhooks correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.subscriptionCreatedWebhook)).toMatchSnapshot()
  })
  it('parses the subscriptionUpdatedWebhook correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.subscriptionUpdatedWebhook)).toMatchSnapshot()
  })
  it('parses the subscriptionUpdatedWebhook correctly (paused)', () => {
    const fixture = FIXTURES.subscriptionUpdatedWebhook
    // @ts-ignore
    fixture.paused_at = '2020-01-01 12:13:14'
    // @ts-ignore
    fixture.paused_from = '2020-02-01 12:13:14'
    // @ts-ignore
    fixture.paused_reason = 'delinquent'

    const func = paddleSdk.verifyWebhookEvent
    // @ts-ignore
    paddleSdk.verifyWebhookEvent = () => true

    expect(paddleSdk.parseWebhookEvent(fixture)).toMatchSnapshot()
    paddleSdk.verifyWebhookEvent = func
  })
  it('parses the subscriptionCancelledWebhook correctly', () => {
    expect(paddleSdk.parseWebhookEvent(FIXTURES.subscriptionCancelledWebhook)).toMatchSnapshot()
  })
  it('parses the subscriptionPaymentSucceededWebhook correctly', () => {
    expect(
      paddleSdk.parseWebhookEvent(FIXTURES.subscriptionPaymentSucceededWebhook)
    ).toMatchSnapshot()
  })

  it('fails if not validated', () => {
    const webhookEvent = FIXTURES.subscriptionCreatedWebhook
    webhookEvent.p_signature = 'Baz'

    expect(() => paddleSdk.parseWebhookEvent(webhookEvent)).toThrowErrorMatchingSnapshot()
  })

  it('fails if metadata is malformed', () => {
    expect(() =>
      paddleSdk.parseWebhookEvent(FIXTURES.malformedPassthroughWebhook)
    ).toThrowErrorMatchingSnapshot()
  })
})
