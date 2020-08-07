import { PUBLIC_KEY, WEBHOOK_BODY_SUBSCRIPTION_CREATED } from './fixtures'
import { PaddleSdk } from '../src/index'

function parse(publicKey: string, body: any) {
  const paddleSdk = new PaddleSdk({ publicKey, vendorId: 123, vendorAuthCode: 'FooBarBaz' })
  return paddleSdk.parseWebhookAlert(body)
}

describe('webhooks -> parse webhook alert', () => {
  it('parses a webhook correctly', () => {
    expect(parse(PUBLIC_KEY, WEBHOOK_BODY_SUBSCRIPTION_CREATED)).toMatchSnapshot()
  })
})
