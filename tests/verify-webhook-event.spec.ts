import { PaddleSdk } from '../src/index'
import { encryptMetadata, stringifyMetadata } from '../src/metadata'
import * as FIXTURES from './fixtures'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verify(body: any, publicKey?: string) {
  const paddleSdk = new PaddleSdk({
    publicKey: publicKey || FIXTURES.publicKey,
    vendorId: FIXTURES.vendorId,
    vendorAuthCode: FIXTURES.vendorAuthCode,
    metadataCodec: encryptMetadata(stringifyMetadata(), FIXTURES.metadataEncryptionKey),
  })

  return paddleSdk.verifyWebhookEvent(body)
}

describe('verify webhook event', () => {
  test('verifies valid signature', () => {
    expect(verify(FIXTURES.subscriptionCreatedEvent)).toEqual(true)
  })

  test('verifies valid signature for pre-parsed body', () => {
    const eventBodyParsed = {
      ...FIXTURES.subscriptionCreatedEvent,
      linked_subscriptions: [8, 9, 4],
      subscription_plan_id: 7,
    }

    expect(verify(eventBodyParsed)).toEqual(true)
  })

  test('rejects for wrong body type', () => {
    expect(verify(null)).toEqual(false)
    expect(verify('FooBarBaz')).toEqual(false)
    expect(verify(42)).toEqual(false)
    expect(verify({})).toEqual(false)
    expect(verify({ foo: 'bar' })).toEqual(false)
    expect(verify([])).toEqual(false)
    expect(verify(['Foo'])).toEqual(false)
  })

  test('rejects for empty body', () => {
    expect(verify({})).toEqual(false)
  })

  test('rejects for body with irrelevant properties', () => {
    expect(verify({ foo: 'bar' })).toEqual(false)
  })

  test('rejects for body with extra properties', () => {
    expect(verify({ ...FIXTURES.subscriptionCreatedEvent, foo: 'bar' })).toEqual(false)
  })

  test('rejects for invalid signature type', () => {
    expect(
      verify({
        ...FIXTURES.subscriptionCreatedEvent,
        p_signature: { foo: 'bar' },
      })
    ).toEqual(false)
  })

  test('rejects for invalid signature', () => {
    expect(verify({ ...FIXTURES.subscriptionCreatedEvent, p_signature: 'FooBar' })).toEqual(false)
  })

  test('rejects for malformed public key', () => {
    function replaceCharacterAt(string: string, index: number, replace: string) {
      return string.substring(0, index) + replace + string.substring(index + 1)
    }

    const malformedPublicKey = replaceCharacterAt(FIXTURES.publicKey, 165, 'A')
    expect(verify(FIXTURES.subscriptionCreatedEvent, malformedPublicKey)).toEqual(false)
  })
})
