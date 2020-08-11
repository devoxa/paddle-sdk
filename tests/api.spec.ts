import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'
import { fetch } from '../src/helpers/fetch'

jest.mock('../src/helpers/fetch', () => ({ fetch: jest.fn() }))

function mockNextApiResponse(response: any) {
  ;(fetch as jest.Mock).mockImplementationOnce(async () => ({ success: true, response }))
}

function getLastApiRequest() {
  return (fetch as jest.Mock).mock.calls[0]
}

describe('webhooks -> api methods', () => {
  const paddleSdk = new PaddleSdk({
    publicKey: FIXTURES.publicKey,
    vendorId: FIXTURES.vendorId,
    vendorAuthCode: FIXTURES.vendorAuthCode,
    metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
  })

  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it('listSubscriptions', async () => {
    mockNextApiResponse(FIXTURES.listSubscriptionsApiResponse)

    const response = await paddleSdk.listSubscriptions({
      subscriptionId: 123,
      productId: 123,
      status: 'CANCELLED',
      page: 0,
      resultsPerPage: 100,
    })

    expect(response).toMatchSnapshot()
    expect(getLastApiRequest()).toMatchSnapshot()
  })
})