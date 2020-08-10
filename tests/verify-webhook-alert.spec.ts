import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'

function verify(publicKey: string, body: any) {
  const paddleSdk = new PaddleSdk({
    publicKey,
    vendorId: FIXTURES.vendorId,
    vendorAuthCode: FIXTURES.vendorAuthCode,
    passthroughEncryptionKey: FIXTURES.passthroughEncryptionKey,
  })
  return paddleSdk.verifyWebhookAlert(body)
}

describe('webhooks -> verify webhook body', () => {
  it('errors when not providing a public key', () => {
    expect(() => verify('', FIXTURES.subscriptionCreatedWebhook)).toThrowError(
      'PaddleSdk was called without a publicKey'
    )
  })

  it('verifies valid signature', () => {
    expect(verify(FIXTURES.publicKey, FIXTURES.subscriptionCreatedWebhook)).toEqual(true)
  })

  it('verifies valid signature for pre-parsed body', () => {
    const alertBodyParsed: any = FIXTURES.subscriptionCreatedWebhook
    alertBodyParsed.linked_subscriptions = [8, 9, 4]
    alertBodyParsed.subscription_plan_id = 7

    expect(verify(FIXTURES.publicKey, alertBodyParsed)).toEqual(true)
  })

  it('rejects for wrong body type', () => {
    expect(verify(FIXTURES.publicKey, null)).toEqual(false)
    expect(verify(FIXTURES.publicKey, 'FooBarBaz')).toEqual(false)
    expect(verify(FIXTURES.publicKey, 42)).toEqual(false)
    expect(verify(FIXTURES.publicKey, {})).toEqual(false)
    expect(verify(FIXTURES.publicKey, { foo: 'bar' })).toEqual(false)
    expect(verify(FIXTURES.publicKey, [])).toEqual(false)
    expect(verify(FIXTURES.publicKey, ['Foo'])).toEqual(false)
  })

  it('rejects for empty body', () => {
    expect(verify(FIXTURES.publicKey, {})).toEqual(false)
  })

  it('rejects for body with irrelevant properties', () => {
    expect(verify(FIXTURES.publicKey, { foo: 'bar' })).toEqual(false)
  })

  it('rejects for body with extra properties', () => {
    expect(verify(FIXTURES.publicKey, { ...FIXTURES.subscriptionCreatedWebhook, foo: 'bar' })).toEqual(false)
  })

  it('rejects for invalid signature type', () => {
    expect(
      verify(FIXTURES.publicKey, { ...FIXTURES.subscriptionCreatedWebhook, p_signature: { foo: 'bar' } })
    ).toEqual(false)
  })

  it('rejects for invalid signature', () => {
    expect(
      verify(FIXTURES.publicKey, { ...FIXTURES.subscriptionCreatedWebhook, p_signature: 'FooBar' })
    ).toEqual(false)
  })

  it('rejects for malformed public key', () => {
    function replaceCharacterAt(string: string, index: number, replace: string) {
      return string.substring(0, index) + replace + string.substring(index + 1)
    }

    const malformedPublicKey = replaceCharacterAt(FIXTURES.publicKey, 165, 'A')
    expect(verify(malformedPublicKey, FIXTURES.subscriptionCreatedWebhook)).toEqual(false)
  })
})
