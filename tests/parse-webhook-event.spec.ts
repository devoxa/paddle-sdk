import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'

function parse(body: any) {
  const paddleSdk = new PaddleSdk({
    publicKey: FIXTURES.publicKey,
    vendorId: FIXTURES.vendorId,
    vendorAuthCode: FIXTURES.vendorAuthCode,
    metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
  })
  return paddleSdk.parseWebhookEvent(body)
}

describe('webhooks -> parse webhook event', () => {
  it('parses a webhook correctly', () => {
    expect(parse(FIXTURES.subscriptionCreatedWebhook)).toMatchSnapshot()
  })
})
