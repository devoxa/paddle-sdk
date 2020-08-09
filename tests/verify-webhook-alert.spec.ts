import { PUBLIC_KEY, WEBHOOK_BODY_SUBSCRIPTION_CREATED } from './fixtures'
import { PaddleSdk } from '../src/index'

function verify(publicKey: string, body: any) {
  const paddleSdk = new PaddleSdk({
    publicKey,
    vendorId: 123,
    vendorAuthCode: 'FooBarBaz',
    passthroughEncryptionKey: 'ZtdDl3Ex7ycFfgdbAC3uTLNk8eLVDcEd',
  })
  return paddleSdk.verifyWebhookAlert(body)
}

describe('webhooks -> verify webhook body', () => {
  it('errors when not providing a public key', () => {
    expect(() => verify('', WEBHOOK_BODY_SUBSCRIPTION_CREATED)).toThrowError(
      'PaddleSdk was called without a publicKey'
    )
  })

  it('verifies valid signature', () => {
    expect(verify(PUBLIC_KEY, WEBHOOK_BODY_SUBSCRIPTION_CREATED)).toEqual(true)
  })

  it('verifies valid signature for pre-parsed body', () => {
    const alertBodyParsed: any = WEBHOOK_BODY_SUBSCRIPTION_CREATED
    alertBodyParsed.linked_subscriptions = [8, 9, 4]
    alertBodyParsed.subscription_plan_id = 7

    expect(verify(PUBLIC_KEY, alertBodyParsed)).toEqual(true)
  })

  it('rejects for wrong body type', () => {
    expect(verify(PUBLIC_KEY, null)).toEqual(false)
    expect(verify(PUBLIC_KEY, 'FooBarBaz')).toEqual(false)
    expect(verify(PUBLIC_KEY, 42)).toEqual(false)
    expect(verify(PUBLIC_KEY, {})).toEqual(false)
    expect(verify(PUBLIC_KEY, { foo: 'bar' })).toEqual(false)
    expect(verify(PUBLIC_KEY, [])).toEqual(false)
    expect(verify(PUBLIC_KEY, ['Foo'])).toEqual(false)
  })

  it('rejects for empty body', () => {
    expect(verify(PUBLIC_KEY, {})).toEqual(false)
  })

  it('rejects for body with irrelevant properties', () => {
    expect(verify(PUBLIC_KEY, { foo: 'bar' })).toEqual(false)
  })

  it('rejects for body with extra properties', () => {
    expect(verify(PUBLIC_KEY, { ...WEBHOOK_BODY_SUBSCRIPTION_CREATED, foo: 'bar' })).toEqual(false)
  })

  it('rejects for invalid signature type', () => {
    expect(
      verify(PUBLIC_KEY, { ...WEBHOOK_BODY_SUBSCRIPTION_CREATED, p_signature: { foo: 'bar' } })
    ).toEqual(false)
  })

  it('rejects for invalid signature', () => {
    expect(
      verify(PUBLIC_KEY, { ...WEBHOOK_BODY_SUBSCRIPTION_CREATED, p_signature: 'FooBar' })
    ).toEqual(false)
  })

  it('rejects for malformed public key', () => {
    function replaceCharacterAt(string: string, index: number, replace: string) {
      return string.substring(0, index) + replace + string.substring(index + 1)
    }

    const malformedPUBLIC_KEY = replaceCharacterAt(PUBLIC_KEY, 165, 'A')
    expect(verify(malformedPUBLIC_KEY, WEBHOOK_BODY_SUBSCRIPTION_CREATED)).toEqual(false)
  })
})
