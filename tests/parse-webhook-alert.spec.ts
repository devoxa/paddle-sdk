import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'

function parse(body: any) {
  const paddleSdk = new PaddleSdk({
    publicKey: FIXTURES.publicKey,
    vendorId: FIXTURES.vendorId,
    vendorAuthCode: FIXTURES.vendorAuthCode,
    passthroughEncryptionKey: FIXTURES.passthroughEncryptionKey,
  })
  return paddleSdk.parseWebhookAlert(body)
}

describe('webhooks -> parse webhook alert', () => {
  it('parses a webhook correctly', () => {
    expect(parse(FIXTURES.subscriptionCreatedWebhook)).toMatchSnapshot()
  })
})
